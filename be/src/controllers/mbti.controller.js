import Groq from "groq-sdk";
import { validateMBTI, validateAnswers } from "../utils/validators.js";

// Cấu hình Gemini API
const apiKey = process.env.GroqCloud_API_KEY;

let groq;

if (apiKey) {
  groq = new Groq({
    apiKey,
  });
} else {
  console.warn(
    "⚠️ CẢNH BÁO: Chưa cấu hình GroqCloud_API_KEY. Tính năng phân tích sẽ dùng dữ liệu dự phòng."
  );
}

const GROQ_MODEL = "llama-3.3-70b-versatile";
const analysisCache = new Map();

// --- Utility Functions ---

function withTimeout(promise, ms = 30000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout: AI phản hồi quá lâu")), ms)
    ),
  ]);
}

// Xóa các ký tự code block markdown nếu AI vô tình trả về
function cleanRawText(text) {
  if (!text) return "";
  return text
    .replace(/^```(markdown|json)?/i, "")
    .replace(/```$/, "")
    .trim();
}

async function callModelWithRetry(prompt, retries = 2) {
  if (!groq) throw new Error("Missing Groq API Key");

  let attempt = 0;
  let lastErr;

  while (attempt <= retries) {
    try {
      const completion = await withTimeout(
        groq.chat.completions.create({
          model: GROQ_MODEL,
          temperature: 0.7,
          max_tokens: 2000,
          messages: [
            {
              role: "system",
              content:
                "Bạn là chuyên gia MBTI. Hãy trả về kết quả định dạng Markdown chuẩn, không dùng code block json hay markdown bao quanh.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        })
      );

      const text = completion.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error("Empty response từ Groq");
      }

      return cleanRawText(text);
    } catch (e) {
      console.warn(`Attempt ${attempt + 1} failed: ${e.message}`);
      lastErr = e;
      attempt++;

      if (attempt > retries) break;

      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }
  }

  throw lastErr;
}

// --- Controller 1: Basic Analysis ---

export const analyzeWithGemini = async (req, res) => {
  try {
    const { gender, mbtiType } = req.body || {};

    if (!validateMBTI(mbtiType)) {
      return res.status(400).json({ error: "Invalid MBTI type" });
    }

    const cacheKey = `basic-${mbtiType}-${gender}`;
    if (analysisCache.has(cacheKey)) return res.json(analysisCache.get(cacheKey));

    const prompt = `
Phân tích chi tiết nhóm tính cách **${mbtiType}** (${
      gender === "male" ? "Nam" : "Nữ"
    }) bằng Tiếng Việt.
Định dạng bắt buộc (Markdown):
# Tổng quan
# Điểm mạnh
# Điểm cần cải thiện
# Nghề nghiệp phù hợp
(Lưu ý quan trọng: Trong phần này, CHỈ liệt kê tên 5 công việc cụ thể, mỗi nghề một dòng. TUYỆT ĐỐI KHÔNG viết mô tả hay giải thích thêm.)
# Lời khuyên phát triển

Viết ngắn gọn, súc tích, tone giọng thân thiện.`;

    let text;
    try {
      text = await callModelWithRetry(prompt, 2);
    } catch (e) {
      console.error("AI Error:", e.message);
      return res.json({
        mbtiType,
        gender,
        ...getFallbackData(mbtiType),
        source: "System Fallback (No AI)",
      });
    }

    const parsedData = formatResponse(text, mbtiType, gender);

    const analysis = {
      mbtiType,
      gender,
      ...parsedData,
      timestamp: new Date(),
      source: `Groq (${GROQ_MODEL})`,
    };

    analysisCache.set(cacheKey, analysis);
    return res.json(analysis);
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- Controller 2: Advanced Analysis ---

export const advancedMBTIAnalysis = async (req, res) => {
  try {
    const { answers, gender, mbtiType } = req.body || {};

    if (!validateMBTI(mbtiType) || !validateAnswers(answers)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const patterns = analyzeAnswerPatterns(answers);

    const prompt = `
Phân tích nâng cao MBTI cho ${mbtiType} (${gender || "N/A"}).
Pattern trả lời: ${JSON.stringify(patterns)}

Định dạng bắt buộc (Markdown):
# Tổng quan chuyên sâu
# Điểm mạnh nổi bật
# Điểm cần cải thiện
# Nghề nghiệp phù hợp
(Lưu ý quan trọng: Trong phần này, CHỈ liệt kê tên 5 công việc cụ thể, mỗi nghề một dòng. TUYỆT ĐỐI KHÔNG viết mô tả hay giải thích thêm.)
# Lời khuyên chiến lược

Tiếng Việt, thực tế, cá nhân hóa.`;

    let text;
    try {
      text = await callModelWithRetry(prompt, 2);
    } catch (e) {
      console.error("Advanced AI Error:", e.message);
      return res.json({
        type: mbtiType,
        gender,
        ...getFallbackData(mbtiType),
        answerPatterns: patterns,
        source: "System Fallback (No AI)",
      });
    }

    const parsedData = formatResponse(text, mbtiType, gender);

    const analysis = {
      ...parsedData,
      answerPatterns: patterns,
      version: "advanced-gemini-fixed",
      timestamp: new Date(),
      source: `Groq (${GROQ_MODEL})`,
    };

    return res.json(analysis);
  } catch (error) {
    console.error("Advanced Error:", error);
    return res.status(500).json({ error: "Analysis failed" });
  }
};

// --- Helpers Logic ---

function analyzeAnswerPatterns(answers = []) {
  const len = answers.length || 1;
  return {
    consistency: Math.random() * 0.3 + 0.7,
    decisiveness: answers.filter((a) => a !== -1).length / len,
    extremeResponses: answers.filter((a) => a === 0 || a === 1).length,
    neutralCount: answers.filter((a) => a === -1).length,
    preferenceTrend: calculateTrend(answers),
  };
}

function calculateTrend(answers = []) {
  const len = answers.length || 1;
  const count1 = answers.filter((a) => a === 1).length;
  const ratio = count1 / len;
  if (ratio > 0.6) return "Hướng ngoại & Linh hoạt";
  if (ratio < 0.4) return "Hướng nội & Ổn định";
  return "Cân bằng";
}

function formatResponse(text = "", type, gender) {
  const rawLines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  const sections = [];
  let currentSection = [];
  let currentTitle = "Overview";

  const keywords = {
    overview: ["tổng quan", "đặc điểm", "insight", "giới thiệu", "overview"],
    strengths: ["điểm mạnh", "thế mạnh", "ưu điểm", "strengths"],
    weaknesses: [
      "điểm yếu",
      "hạn chế",
      "cải thiện",
      "nhược điểm",
      "weaknesses",
    ],
    careers: ["nghề nghiệp", "công việc", "sự nghiệp", "careers"],
    advice: ["lời khuyên", "phát triển", "gợi ý", "advice"],
  };

  const isHeader = (line) => {
    const isMarkdownHeader = /^([#]+|\*\*|\d+\.)\s?/.test(line);
    const hasKeyword = Object.values(keywords).some((list) =>
      list.some((k) => line.toLowerCase().includes(k))
    );
    return (isMarkdownHeader || hasKeyword) && line.length < 60;
  };

  for (const line of rawLines) {
    if (isHeader(line)) {
      if (currentSection.length > 0) {
        sections.push({ title: currentTitle, content: [...currentSection] });
      }
      currentSection = [];
      currentTitle = line.replace(/[*#\d.:]/g, "").trim();
    } else {
      currentSection.push(line);
    }
  }
  if (currentSection.length > 0) {
    sections.push({ title: currentTitle, content: currentSection });
  }

  if (sections.length === 0 && text.length > 0) {
    return {
      type,
      gender,
      overview: text,
      strengths: ["Xem chi tiết trong phần tổng quan"],
      weaknesses: ["Xem chi tiết trong phần tổng quan"],
      careers: ["Xem chi tiết trong phần tổng quan"],
      advice: "Xem chi tiết trong phần tổng quan",
    };
  }

  const getContent = (keys) => {
    const found = sections.find((s) =>
      keys.some((k) => s.title.toLowerCase().includes(k))
    );
    return found ? found.content : [];
  };

  const overview = getContent(keywords.overview).join("\n");
  const strengths = getContent(keywords.strengths).filter((l) => l.length > 5);
  const weaknesses = getContent(keywords.weaknesses).filter(
    (l) => l.length > 5
  );

  const careersRaw = getContent(keywords.careers);
  const careers = careersRaw
    .map((c) => {
      let clean = c.replace(/^[-*•\d.]+\s*/, "");
      const splitRegex = /[:(]|\s[-–]\s/;
      const parts = clean.split(splitRegex);
      return parts[0].trim();
    })
    .filter(
      (c) => c.length > 3 && !c.toLowerCase().includes("nghề nghiệp phù hợp")
    );

  const advice = getContent(keywords.advice).join("\n");

  return {
    type,
    gender,
    overview: overview || `Đang cập nhật tổng quan cho ${type}...`,
    strengths: strengths.length ? strengths : ["Đang cập nhật..."],
    weaknesses: weaknesses.length ? weaknesses : ["Đang cập nhật..."],
    careers: careers.length ? careers : ["Đang cập nhật..."],
    advice: advice || "Đang cập nhật lời khuyên...",
  };
}

function getFallbackData(type) {
  return {
    overview: `Hệ thống tạm thời sử dụng dữ liệu dự phòng cho ${type}. Vui lòng kiểm tra lại kết nối Gemini hoặc API Key.`,
    strengths: ["Tư duy độc lập", "Khả năng thích ứng", "Sáng tạo"],
    weaknesses: ["Cần kiên nhẫn hơn", "Chú ý chi tiết"],
    careers: ["Đang cập nhật..."],
    advice: "Vui lòng thử lại sau giây lát.",
  };
}