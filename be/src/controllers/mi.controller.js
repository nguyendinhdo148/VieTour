import { GoogleGenerativeAI } from "@google/generative-ai";
import { validateMIScores, validateAnswers } from "../utils/validators.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_MI);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 2000,
    temperature: 0.9,
  },
});

const analysisCache = new Map();

function withTimeout(promise, ms = 20000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Gemini timeout")), ms)
    ),
  ]);
}

// Danh sách 9 loại trí thông minh
const intelligenceTypes = [
  "Vận động",
  "Âm nhạc",
  "Thiên nhiên",
  "Không gian",
  "Triết học",
  "Ngôn ngữ",
  "Xã hội",
  "Nội tâm",
  "Logic",
];

// Mapping câu hỏi -> loại trí thông minh (ví dụ, bạn chỉnh lại theo bộ câu hỏi thực tế)
const miQuestionMapping = [
  "Vận động",
  "Âm nhạc",
  "Thiên nhiên",
  "Không gian",
  "Triết học",
  "Ngôn ngữ",
  "Xã hội",
  "Nội tâm",
  "Logic",
  // lặp lại nếu có nhiều câu hỏi hơn
];

function calculateMIScores(answers) {
  const scores = {};
  intelligenceTypes.forEach((type) => (scores[type] = 0));

  // Tính tổng điểm cho mỗi loại trí thông minh
  answers.forEach((ans, idx) => {
    const type = miQuestionMapping[idx];
    if (type && ans >= 0) scores[type] += ans;
  });

  // Chuẩn hóa về thang 0-100
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));

  // Xử lý trường hợp đặc biệt khi tất cả điểm bằng nhau
  if (maxScore === minScore) {
    // Nếu tất cả bằng 0, gán giá trị mặc định
    if (maxScore === 0) {
      intelligenceTypes.forEach((type) => (scores[type] = 50));
    } else {
      // Nếu tất cả có cùng điểm > 0, chuẩn hóa về 80 để phân biệt
      intelligenceTypes.forEach((type) => (scores[type] = 80));
    }
  } else {
    // Chuẩn hóa bình thường
    for (const type in scores) {
      scores[type] = Math.round(
        ((scores[type] - minScore) / (maxScore - minScore)) * 100
      );
    }
  }

  return scores;
}
function getDominantType(scores) {
  return Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

export const analyzeMIGemini = async (req, res) => {
  try {
    let { answers, gender, miScores, dominantIntelligence } = req.body;

    // Validate input
    if (
      (!miScores || Object.keys(miScores).length === 0) &&
      (!answers || !Array.isArray(answers))
    ) {
      return res
        .status(400)
        .json({ error: "Missing required data: answers or miScores" });
    }

    // Tính điểm nếu chưa có
    if (!miScores && answers) {
      miScores = calculateMIScores(answers);
    }

    // Xác định loại trí thông minh nổi trội
    if (!dominantIntelligence && miScores) {
      dominantIntelligence = getDominantType(miScores);
    }

    // Validate scores
    if (!validateMIScores(miScores)) {
      miScores = Object.fromEntries(
        intelligenceTypes.map((type) => [type, 50])
      );
      dominantIntelligence = intelligenceTypes[0];
    }

    const cacheKey = `${dominantIntelligence}-${gender}`;
    if (analysisCache.has(cacheKey)) {
      return res.json(analysisCache.get(cacheKey));
    }

    const prompt = `Act as a Multiple Intelligences expert. Provide detailed analysis in Vietnamese (Markdown format) about:
                    **${dominantIntelligence} Intelligence Type** covering:
                    1. **Profile**: Key characteristics (100 words)
                    2. **Strengths**: Top 4 strengths
                    3. **Improvements**: Areas to develop 
                    4. **Careers**: 5 suitable jobs
                    5. **Advice**: Development suggestions

                    Format each section with **bold headers**. Keep it practical and under 2000 characters.`;

    const result = await withTimeout(model.generateContent(prompt));
    const text = result.response.text();

    const analysis = {
      ...formatMIResponse(text, miScores, dominantIntelligence, gender),
      timestamp: new Date(),
      source: "Gemini AI",
    };

    analysisCache.set(cacheKey, analysis);
    res.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Analysis failed",
      fallback: generateFallbackAnalysis(req.body), // Hàm dự phòng
    });
  }
};

// Hàm dự phòng khi analysis fail
function generateFallbackAnalysis({ answers, gender }) {
  const miScores = answers
    ? calculateMIScores(answers)
    : Object.fromEntries(
        intelligenceTypes.map((t) => [t, Math.floor(Math.random() * 50) + 50])
      );

  const dominantIntelligence = getDominantType(miScores);
  const dominantInfo =
    intelligenceTypes.find((t) => t.name === dominantIntelligence) ||
    intelligenceTypes[0];

  return {
    dominantIntelligence,
    allIntelligences: miScores,
    gender,
    profile: `Bạn có xu hướng nổi trội về ${dominantIntelligence}. ${dominantInfo.description}`,
    strengths: [
      `Khả năng ${dominantIntelligence.toLowerCase()} vượt trội`,
      "Tư duy phân tích tốt",
      "Khả năng học hỏi nhanh",
    ],
    improvements: [
      "Phát triển kỹ năng giao tiếp",
      "Rèn luyện tư duy sáng tạo",
      "Nâng cao khả năng làm việc nhóm",
    ],
    careers: dominantInfo.careers.split(", "),
    advice: `Tập trung vào các hoạt động phát triển ${dominantIntelligence.toLowerCase()}. 
      Tham gia các khóa học chuyên sâu và tìm kiếm cơ hội thực hành.`,
    isFallback: true,
  };
}

export const advancedMIAnalysis = async (req, res) => {
  try {
    let { answers, gender, miScores, dominantIntelligence } = req.body;

    if ((!miScores || Object.keys(miScores).length === 0) && answers) {
      miScores = calculateMIScores(answers);
    }

    if (!dominantIntelligence && miScores) {
      dominantIntelligence = getDominantType(miScores);
    }

    if (!validateMIScores(miScores)) {
      return res.status(400).json({ error: "Invalid MI scores" });
    }

    if (!validateAnswers(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    const patterns = analyzeMIAnswerPatterns(answers, miScores);

    const prompt = `Multiple Intelligences Advanced Analysis Request:
                    Dominant Intelligence: ${dominantIntelligence}
                    Gender: ${gender}
                    All Scores: ${JSON.stringify(miScores)}
                    Answer Patterns: ${JSON.stringify(patterns)}

                    Provide detailed analysis in Vietnamese covering:
                    1. Intelligence profile (200 words)
                    2. Top 4 strengths based on scores
                    3. Underdeveloped intelligences to improve
                    4. Career matches (list 5 suitable jobs, each job on a new line)
                    5. Customized learning and development advice

                    Format: Markdown with bullet points
                    Prioritize practical recommendations`;

    const result = await withTimeout(model.generateContent(prompt));
    const text = result.response.text();

    const analysis = {
      ...formatMIResponse(text, miScores, dominantIntelligence, gender),
      answerPatterns: patterns,
      version: "mi-advanced-1.0",
      timestamp: new Date(),
    };

    res.json(analysis);
  } catch (error) {
    console.error("Advanced MI Analysis Error:", error);
    res.status(500).json({
      error: "Advanced analysis failed",
      details: error.message,
    });
  }
};

function analyzeMIAnswerPatterns(answers, miScores) {
  const scoreValues = Object.values(miScores);
  const maxScore = Math.max(...scoreValues);
  const minScore = Math.min(...scoreValues);

  return {
    scoreRange: `${minScore}-${maxScore}`,
    dominantDifference: maxScore - minScore,
    consistency: calculateConsistency(answers),
    extremeResponses: answers.filter((a) => a === 0 || a === 4).length,
    learningStyle: determineLearningStyle(miScores),
  };
}

function determineLearningStyle(scores) {
  const {
    "Vận động": bodily,
    "Âm nhạc": musical,
    "Không gian": spatial,
  } = scores;

  if (bodily > musical && bodily > spatial) return "Học qua vận động";
  if (musical > bodily && musical > spatial) return "Học qua âm nhạc";
  if (spatial > bodily && spatial > musical) return "Học qua hình ảnh";
  return "Học đa phương thức";
}

function formatMIResponse(text, scores, dominantType, gender) {
  const rawLines = text.split("\n").map((line) => line.trim());
  const sections = [];
  let currentSection = [];
  let currentTitle = "";

  // Phân tích cấu trúc response
  rawLines.forEach((line) => {
    const isSectionHeader = /^\*\*\d+\.|\*\*[A-Za-zÀ-ỹ ]+\*\*/.test(line);
    if (isSectionHeader) {
      if (currentSection.length > 0) {
        sections.push({ title: currentTitle, content: [...currentSection] });
        currentSection = [];
      }
      currentTitle = line.replace(/\*\*/g, "").trim();
    } else if (line) {
      currentSection.push(line);
    }
  });

  if (currentSection.length > 0) {
    sections.push({ title: currentTitle, content: currentSection });
  }

  // Hàm phụ trợ tìm nội dung theo keyword
  const getContentByKeyword = (keywords) => {
    const section = sections.find((s) =>
      keywords.some((k) => s.title.toLowerCase().includes(k.toLowerCase()))
    );
    return section ? section.content.filter((l) => l) : [];
  };

  // Trích xuất các phần thông tin
  const profile =
    getContentByKeyword([
      "profile",
      "thông tin",
      "tổng quan",
      "đặc điểm",
      "giới thiệu",
    ]).join("\n") || `Bạn có khả năng nổi trội về ${dominantType}.`;

  let strengths = getContentByKeyword([
    "điểm mạnh",
    "strength",
    "mạnh nhất",
    "ưu điểm",
    "thế mạnh",
  ]);
  if (strengths.length === 0) {
    strengths = [
      `Tư duy ${dominantType.toLowerCase()} vượt trội`,
      `Khả năng phân tích logic tốt`,
      `Giải quyết vấn đề hiệu quả`,
    ];
  }

  let improvements = getContentByKeyword([
    "cải thiện",
    "yếu",
    "weakness",
    "improve",
    "khuyết điểm",
    "hạn chế",
  ]);
  if (improvements.length === 0) {
    // Tự động gợi ý cải thiện dựa trên 3 loại điểm thấp nhất
    const sorted = Object.entries(scores)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 4);

    improvements = sorted.map(
      ([type]) =>
        `Phát triển trí thông minh ${type.toLowerCase()} thông qua các hoạt động liên quan`
    );
  }

  const careersRaw = getContentByKeyword([
    "nghề nghiệp",
    "career",
    "việc làm",
    "công việc",
    "ngành nghề",
  ]);
  const careers =
    careersRaw.length > 0
      ? careersRaw
          .join("\n")
          .split(/\n|,|;/)
          .map((c) => c.replace(/^[-*•\d.]+\s*/, "").trim())
          .filter((c) => c.length > 0)
      : [
          "Nhà phân tích hệ thống",
          "Lập trình viên",
          "Nhà khoa học dữ liệu",
          "Kỹ sư phần mềm",
          "Nhà nghiên cứu",
        ];

  const advice =
    getContentByKeyword([
      "lời khuyên",
      "advice",
      "gợi ý",
      "phát triển",
      "recommendation",
    ]).join("\n") ||
    `Hãy tập trung phát triển kỹ năng ${dominantType.toLowerCase()} thông qua thực hành và học tập chuyên sâu.`;

  return {
    dominantIntelligence: dominantType,
    allIntelligences: scores,
    gender,
    profile,
    strengths,
    improvements,
    careers,
    advice,
    sections, // Giữ lại toàn bộ sections gốc để debug
  };
}

function calculateConsistency(answers) {
  const answered = answers.filter((a) => a !== -1);
  if (answered.length === 0) return 0;

  const avgScore = answered.reduce((sum, a) => sum + a, 0) / answered.length;
  const variance =
    answered.reduce((sum, a) => sum + Math.pow(a - avgScore, 2), 0) /
    answered.length;

  return 1 - Math.min(variance / 4, 1);
}
