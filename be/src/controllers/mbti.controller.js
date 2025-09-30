import { GoogleGenerativeAI } from "@google/generative-ai";
import { validateMBTI, validateAnswers } from "../utils/validators.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_MBTI);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    maxOutputTokens: 2000,
    temperature: 0.7,
  },
});

const analysisCache = new Map();

// Utility functions for timeout and retry
function withTimeout(promise, ms = 20000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Gemini timeout")), ms)
    ),
  ]);
}

async function callModelWithRetry(prompt, retries = 2) {
  let attempt = 0;
  let lastErr;
  
  while (attempt <= retries) {
    try {
      const result = await withTimeout(model.generateContent(prompt));
      const text = result?.response?.text?.();
      
      if (!text || typeof text !== "string" || !text.trim()) {
        throw new Error("Empty response from model");
      }
      
      return text;
    } catch (e) {
      lastErr = e;
      attempt++;
      
      if (attempt > retries) break;
      
      // Exponential backoff
      const backoff = 500 * attempt;
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  
  throw lastErr || new Error("Unknown model error");
}

// Basic MBTI Analysis
export const analyzeWithGemini = async (req, res) => {
  try {
    const { gender, mbtiType } = req.body || {};

    // Validate input
    if (!validateMBTI(mbtiType)) {
      return res.status(400).json({ 
        error: "Invalid MBTI type", 
        received: mbtiType 
      });
    }

    // Check cache
    const cacheKey = `${mbtiType}-${gender}`;
    if (analysisCache.has(cacheKey)) {
      return res.json(analysisCache.get(cacheKey));
    }

    const prompt = `
Act as an MBTI expert. Provide detailed analysis in Vietnamese (Markdown format) about:
**${mbtiType} Personality Type**
- Key characteristics
- Strengths & weaknesses
- Career recommendations
- Relationship advice
- Growth suggestions
- Famous examples

Use friendly tone, practical examples, and keep it under 1500 characters.`;

    let text;
    try {
      text = await callModelWithRetry(prompt, 2);
    } catch (e) {
      console.error("Gemini (basic) call failed:", e?.message);
      
      // Fallback response when model fails
      const fallback = `Tổng quan ${mbtiType}: Hiện tại hệ thống đang bận, dưới đây là phân tích cơ bản:

**Đặc điểm chính:**
- Tập trung vào điểm mạnh cốt lõi và phong cách giao tiếp riêng
- Phát triển kỹ năng dựa trên thiên hướng tự nhiên

**Điểm mạnh & Điểm cần cải thiện:**
- Nhận diện và tận dụng ưu điểm
- Làm việc với những thách thức để phát triển cân bằng

**Nghề nghiệp:**
- Chọn môi trường làm việc phù hợp với giá trị cá nhân
- Tìm kiếm vai trò tận dụng được điểm mạnh

**Quan hệ:**
- Giao tiếp thẳng thắn và lắng nghe chủ động
- Hiểu và tôn trọng khác biệt

**Phát triển bản thân:**
- Đặt mục tiêu nhỏ, có thể đo lường được
- Thường xuyên đánh giá và điều chỉnh

Nguồn: Hệ thống dự phòng`;

      const analysis = {
        mbtiType,
        gender,
        analysis: fallback,
        timestamp: new Date(),
        source: "Fallback System",
      };
      
      analysisCache.set(cacheKey, analysis);
      return res.status(502).json({
        warning: "Model temporarily unavailable, returned fallback analysis",
        ...analysis,
      });
    }

    const analysis = {
      mbtiType,
      gender,
      analysis: String(text).replace(/\*\*/g, ""),
      timestamp: new Date(),
      source: "Gemini AI",
    };

    analysisCache.set(cacheKey, analysis);
    return res.json(analysis);

  } catch (error) {
    console.error("Gemini Error (basic):", error?.message, error);
    return res.status(500).json({ 
      error: "Analysis failed", 
      detail: error?.message || "Unknown error",
      suggestion: "Please try again later"
    });
  }
};

// Advanced MBTI Analysis
export const advancedMBTIAnalysis = async (req, res) => {
  try {
    const { answers, gender, mbtiType } = req.body || {};

    // Validate inputs
    if (!validateMBTI(mbtiType)) {
      return res.status(400).json({ error: "Invalid MBTI type" });
    }

    if (!validateAnswers(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    const patterns = analyzeAnswerPatterns(answers);

    const prompt = `
MBTI Advanced Analysis Request:
Type: ${mbtiType}
Gender: ${gender}
Answer Patterns: ${JSON.stringify(patterns)}

Provide detailed analysis in Vietnamese covering:
1. Personality insights (200 words)
2. Top 3 strengths
3. Areas for improvement
4. Career matches (list 5 suitable jobs, each job on a new line)
5. Customized advice

Format: Markdown with bullet points`;

    let text;
    try {
      text = await callModelWithRetry(prompt, 2);
    } catch (e) {
      console.error("Gemini (advanced) call failed:", e?.message);
      
      // Return fallback structured response
      const analysis = {
        ...formatResponse("", mbtiType, gender),
        answerPatterns: patterns,
        version: "advanced-1.1",
        timestamp: new Date(),
        source: "Fallback System",
      };
      
      return res.status(502).json({
        warning: "Model temporarily unavailable, returned fallback analysis",
        ...analysis,
      });
    }

    const analysis = {
      ...formatResponse(text, mbtiType, gender),
      answerPatterns: patterns,
      version: "advanced-1.1", 
      timestamp: new Date(),
      source: "Gemini AI",
    };

    return res.json(analysis);

  } catch (error) {
    console.error("Advanced Gemini Error:", error?.message, error);
    return res.status(500).json({ 
      error: "Advanced analysis failed", 
      detail: error?.message || "Unknown error"
    });
  }
};

// Helper functions (hardened against edge cases)
function analyzeAnswerPatterns(answers = []) {
  const len = answers.length || 1; // Prevent division by zero
  
  return {
    consistency: calculateConsistency(answers),
    decisiveness: answers.filter((a) => a !== -1).length / len,
    extremeResponses: answers.filter((a) => a === 0 || a === 1).length,
    neutralCount: answers.filter((a) => a === -1).length,
    preferenceTrend: calculateTrend(answers),
  };
}

function formatResponse(text = "", type, gender) {
  const rawLines = String(text).split("\n").map((line) => line.trim());
  const sections = [];
  let currentSection = [];
  let currentTitle = "";

  // Parse sections with flexible regex
  for (const line of rawLines) {
    const isSectionHeader = 
      /^(\*\*)?\d+\./.test(line) || // **1. or 1.
      /^#{1,6}\s/.test(line); // Markdown headings
      
    if (isSectionHeader) {
      if (currentSection.length > 0) {
        sections.push({ title: currentTitle, content: [...currentSection] });
      }
      currentSection = [];
      currentTitle = line.replace(/\*\*/g, "");
    } else {
      currentSection.push(line);
    }
  }
  
  if (currentSection.length > 0) {
    sections.push({ title: currentTitle, content: currentSection });
  }

  const normalize = (str = "") =>
    str
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();

  const getContentByKeyword = (keywords) => {
    const sec = sections.find((s) =>
      keywords.some((k) => normalize(s.title).includes(normalize(k)))
    );
    return sec?.content ?? [];
  };

  const overview = getContentByKeyword([
    "tổng quan", "insight", "tính cách"
  ]).join("\n");
  
  const strengths = getContentByKeyword(["điểm mạnh", "strength"]);
  
  const weaknesses = getContentByKeyword([
    "cải thiện", "điểm yếu", "weakness"
  ]).filter((line) => {
    const low = (line || "").toLowerCase();
    return line && !low.includes("giới tính") && !low.startsWith("gender");
  });

  const careersRaw = getContentByKeyword([
    "nghề nghiệp", "career", "đề xuất nghề nghiệp", 
    "việc làm", "công việc phù hợp", "ngành nên theo đuổi", 
    "career matches"
  ]);

  const careers = (careersRaw.join("\n").split(/\n|,/) || [])
    .map((line) => (line || "").replace(/^[-*•\d.]+\s*/, "").trim())
    .filter((line) => line.length > 0);

  const advice = getContentByKeyword(["lời khuyên", "advice"]).join("\n");

  return {
    type,
    gender,
    overview: overview || `Phân tích cơ bản cho ${type}`,
    strengths: strengths.length > 0 ? strengths : ["Phân tích đang được cập nhật"],
    weaknesses: weaknesses.length > 0 ? weaknesses : ["Phân tích đang được cập nhật"],
    careers: careers.length > 0 ? careers : ["Đang cập nhật gợi ý nghề nghiệp"],
    advice: advice || "Lời khuyên đang được cập nhật"
  };
}

function calculateConsistency(answers = []) {
  // TODO: Implement proper consistency calculation
  // For now, return safe random value
  return Math.random() * 0.5 + 0.5; // Between 0.5-1.0
}

function calculateTrend(answers = []) {
  const len = answers.length || 1;
  const count1 = answers.filter((a) => a === 1).length;
  const ratio = count1 / len;
  
  if (ratio > 0.7) return "Xu hướng hướng ngoại, yêu thích sự mới mẻ";
  if (ratio < 0.3) return "Xu hướng hướng nội, thiên về ổn định";
  return "Sự cân bằng giữa hướng nội và hướng ngoại";
}
