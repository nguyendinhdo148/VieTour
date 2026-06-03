import { Job } from "../models/job.model.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";
import Tesseract from "tesseract.js";
import axios from "axios";

// Lấy đường dẫn tuyệt đối tới pdf.worker.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerPath = path.join(
  __dirname,
  "../../node_modules/pdfjs-dist/legacy/build/pdf.worker.js"
);

pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

// ==============================
// GEMINI CONFIG
// ==============================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";

const gemini = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// GEMINI HELPER
// ==============================

async function callGemini(prompt, config = {}) {
  const response = await gemini.post(
    `/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: config.temperature || 0.7,
        maxOutputTokens: config.maxOutputTokens || 2048,
        responseMimeType:
          config.responseMimeType || "text/plain",
      },
    }
  );

  return (
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
  );
}

// ==============================
// REVIEW CV
// ==============================

export const resumeReview = async (req, res, next) => {
  try {
    const resume = req.file;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded!",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB limit!",
      });
    }

    // ==============================
    // EXTRACT PDF TEXT
    // ==============================

    let extractedText = "";

    try {
      const pdf = await pdfjsLib.getDocument({
        data: resume.buffer,
      }).promise;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => item.str)
          .join(" ");

        extractedText += pageText + "\n";
      }

      extractedText = extractedText.trim();
    } catch (err) {}

    // ==============================
    // OCR FALLBACK
    // ==============================

    if (!extractedText || extractedText.length < 30) {
      try {
        const pdf = await pdfjsLib.getDocument({
          data: resume.buffer,
        }).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = createCanvas(
          viewport.width,
          viewport.height
        );

        const context = canvas.getContext("2d");

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;

        const imageBuffer = canvas.toBuffer("image/png");

        const result = await Tesseract.recognize(
          imageBuffer,
          "eng",
          {
            logger: () => {},
          }
        );

        extractedText = result.data.text?.trim();
      } catch (err) {}
    }

    if (!extractedText || extractedText.length < 30) {
      return res.status(400).json({
        success: false,
        message:
          "Could not extract meaningful text from the resume.",
      });
    }

    // ==============================
    // GEMINI REVIEW
    // ==============================

    try {
      const prompt = `
Bạn là chuyên gia tuyển dụng và cố vấn nghề nghiệp.

Yêu cầu:
- Viết bằng tiếng Việt tự nhiên, chuyên nghiệp.
- Không dùng ký hiệu "*" hoặc "•".
- Sử dụng Markdown rõ ràng.
- Mỗi ý dùng dấu "-".

Cấu trúc:
I. Tóm tắt tổng quan
II. Điểm mạnh
III. Điểm yếu / Hạn chế
IV. Đề xuất cải thiện
V. Kết luận / Lời khuyên

Mỗi phần:
- 5 đến 6 ý.
- Ngắn gọn, có chiều sâu.
- Không copy nguyên văn CV.

Kết thúc bằng lời động viên tích cực.

CV:
${extractedText}
`;

      const feedback = await callGemini(prompt, {
        temperature: 0.7,
        maxOutputTokens: 2048,
      });

      return res.json({
        success: true,
        feedback,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message:
          err?.response?.data?.error?.message ||
          err.message ||
          "Gemini API error",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Resume review failed! " +
        (error?.message || "Unknown error"),
    });
  }
};

// ==============================
// GENERATE DESCRIPTION
// ==============================

export const generate_description = async (req, res, next) => {
  const { title, category } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Missing title!",
    });
  }

  try {
    const prompt = `
Bạn là chuyên gia content marketing và branding.

Hãy tạo nội dung quảng cáo chuyên nghiệp dựa trên tiêu đề sau:

Tiêu đề:
"${title}"

Lĩnh vực:
"${category || "Không xác định"}"

Yêu cầu:
- Nội dung phù hợp cho bài đăng Facebook, website, landing page.
- Văn phong hấp dẫn, thu hút khách hàng.
- Phù hợp với thương hiệu cà phê, đồ ăn, nhà hàng, quán ăn, thương hiệu F&B.
- Có cảm xúc, hiện đại, chuyên nghiệp.
- Không dùng markdown.

Trả về DUY NHẤT JSON hợp lệ:

{
  "description": "Đoạn mô tả thương hiệu hấp dẫn khoảng 6-8 câu.",
  "targetCustomers": [
    "Phù hợp với sinh viên cần không gian học tập yên tĩnh.",
    "Thích hợp cho nhân viên văn phòng gặp gỡ đối tác hoặc làm việc.",
    "Dành cho khách hàng yêu thích cà phê đậm vị và nguyên chất.",
    "Phù hợp với nhóm bạn muốn trò chuyện trong không gian rộng rãi.",
    "Thích hợp cho khách hàng thích chụp ảnh và trải nghiệm không gian đẹp.",
    "Dành cho người cần nơi thư giãn sau giờ làm việc."
  ],
  "benefits": [
    "Không gian hiện đại, thoải mái và có máy lạnh.",
    "Menu đa dạng từ cà phê, trà đến đồ ăn nhẹ.",
    "Wifi tốc độ cao phục vụ học tập và làm việc.",
    "Phục vụ nhanh chóng, thân thiện và chuyên nghiệp.",
    "Vị trí thuận tiện, dễ tìm và có chỗ giữ xe.",
    "Nguyên liệu chất lượng mang lại hương vị đặc trưng."
  ]
}

Quy tắc:
- requirements: 5-7 ý.
- benefits: 5-7 ý.
- Mỗi chuỗi phải kết thúc bằng dấu chấm.
- Không trả thêm text ngoài JSON.
`;

    const content = await callGemini(prompt, {
      temperature: 0.8,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
    });

    let data;

    try {
      data = JSON.parse(content);
    } catch (err) {
      console.log("JSON Parse Error:", err);

      return res.status(500).json({
        success: false,
        message: "AI output format error",
      });
    }

    return res.json({
  success: true,
  description: data.description || "",
  requirements:
    data.targetCustomers ||
    data.requirements ||
    [],
  benefits: data.benefits || [],
});
  } catch (error) {
    console.log("Gemini Error:", error?.response?.data || error);

    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.error?.message ||
        error.message ||
        "AI generation failed!",
    });
  }
};

// ==============================
// CHAT WITH AI
// ==============================

export const chat_with_ai = async (req, res, next) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Missing message!",
    });
  }

  try {
    // ==============================
    // EXTRACT USER INTENT
    // ==============================

    const systemPrompt = `
Bạn là AI phân tích yêu cầu tìm việc.

Hãy trả về JSON hợp lệ.

{
  "intent": "job_search | advice | other",
  "keywords": [],
  "location": null,
  "salary": null,
  "jobType": null,
  "experienceLevel": null,
  "category": null
}

Quy tắc:
- intent:
  - "job_search" nếu tìm việc.
  - "advice" nếu xin tư vấn.
  - "other" nếu chào hỏi.

- salary:
  - đơn vị   VNĐ.
  - 1000 USD = 25.

- "mới ra trường" = 0 năm.

User:
"${message}"
`;

    const raw = await callGemini(systemPrompt, {
      temperature: 0.1,
      responseMimeType: "application/json",
    });

    let parsedData = {
      intent: "other",
      keywords: [],
      location: null,
      salary: null,
      jobType: null,
      experienceLevel: null,
      category: null,
    };

    try {
      parsedData = {
        ...parsedData,
        ...JSON.parse(raw),
      };
    } catch {
      console.log("Parse AI JSON failed");
    }

    // ==============================
    // NOT JOB SEARCH
    // ==============================

    if (parsedData.intent !== "job_search") {
      return callGeminiAdvice(message, res);
    }

    // ==============================
    // QUERY
    // ==============================

    const query = {
      status: "active",
      approval: "approved",
      $or: [
        ...(parsedData.keywords.length
          ? parsedData.keywords.map((kw) => ({
              $or: [
                {
                  title: {
                    $regex: kw,
                    $options: "i",
                  },
                },
                {
                  description: {
                    $regex: kw,
                    $options: "i",
                  },
                },
                {
                  category: {
                    $regex: kw,
                    $options: "i",
                  },
                },
              ],
            }))
          : []),

        ...(parsedData.location
          ? [
              {
                location: {
                  $regex: parsedData.location,
                  $options: "i",
                },
              },
            ]
          : []),
      ],
    };

    // ==============================
    // GET JOBS
    // ==============================

    let jobs = await Job.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $limit: 30,
      },
    ]);

    // ==============================
    // NORMALIZE
    // ==============================

    const normalize = (s) =>
      (s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(
          /thanh pho|tp\.?|ho chi minh|hcmc/gi,
          "hcm"
        )
        .trim();

    jobs = jobs.filter((job) => {
      let ok = true;

      if (parsedData.location) {
        const loc1 = normalize(job.location);

        const loc2 = normalize(parsedData.location);

        ok =
          ok &&
          (loc1.includes(loc2) || loc2.includes(loc1));
      }

      if (parsedData.keywords.length > 0) {
        const combined = normalize(
          `${job.title} ${job.description} ${job.category}`
        );

        ok =
          ok &&
          parsedData.keywords.some((kw) =>
            combined.includes(normalize(kw))
          );
      }

      if (parsedData.salary) {
        const s = Number(job.salary);

        const si = Number(parsedData.salary);

        ok =
          ok &&
          !isNaN(s) &&
          Math.abs(s - si) <= 1;
      }

      return ok;
    });

    // ==============================
    // RESPONSE
    // ==============================

    if (jobs.length > 0) {
      const answer = formatJobResults(
        jobs,
        parsedData
      );

      return res.json({
        success: true,
        answer,
      });
    }

    const answer =
      generateNoResultsMessage(parsedData);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.log(
      "❌ chat_with_ai error:",
      error?.response?.data || error
    );

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==============================
// BUILD SEARCH QUERY
// ==============================

function buildSearchQuery(parsedData) {
  const baseQuery = {
    status: "active",
    approval: "approved",
  };

  const conditions = [];

  if (parsedData.keywords.length > 0) {
    const keywordConditions =
      parsedData.keywords.map((kw) => ({
        $or: [
          {
            title: {
              $regex: kw,
              $options: "i",
            },
          },
          {
            description: {
              $regex: kw,
              $options: "i",
            },
          },
          {
            category: {
              $regex: kw,
              $options: "i",
            },
          },
        ],
      }));

    conditions.push(...keywordConditions);
  }

  if (parsedData.location) {
    conditions.push({
      location: {
        $regex: parsedData.location,
        $options: "i",
      },
    });
  }

  if (parsedData.jobType) {
    conditions.push({
      jobType: {
        $regex: parsedData.jobType,
        $options: "i",
      },
    });
  }

  if (parsedData.salary) {
    conditions.push({
      salary: {
        $gte: parsedData.salary,
      },
    });
  }

  if (
    parsedData.experienceLevel !== null
  ) {
    conditions.push({
      experienceLevel: {
        $lte:
          parsedData.experienceLevel + 1,
      },
    });
  }

  if (parsedData.category) {
    conditions.push({
      category: {
        $regex: parsedData.category,
        $options: "i",
      },
    });
  }

  if (conditions.length > 0) {
    baseQuery.$and = conditions;
  }

  return baseQuery;
}

// ==============================
// FORMAT JOBS
// ==============================

function formatJobResults(
  jobs,
  parsedData
) {
  const header = `🔍 Tìm thấy ${jobs.length} việc làm phù hợp${
    parsedData.keywords.length > 0
      ? ` cho "${parsedData.keywords.join(", ")}"`
      : ""
  }:\n\n`;

  const jobList = jobs
    .map((job, idx) => {
      const salary = job.salary
        ? `💰 ${job.salary}`
        : "";

      const experience =
        job.experienceLevel
          ? `📊 ${job.experienceLevel} năm KN`
          : "";

      const location = job.location
        ? `📍 ${job.location}`
        : "";

      const company =
        job.company?.name || "[Công ty]";

      const details = [
        salary,
        experience,
        location,
      ]
        .filter(Boolean)
        .join(" • ");

      return `${idx + 1}. ${job.title} tại ${company}
${details}
🔗 ${
        process.env.FRONTEND_URL ||
        "http://localhost:5173"
      }/job/detail/${job.slug}`;
    })
    .join("\n\n");

  return (
    header +
    jobList +
    "\n\n💡 Tip: Bạn có thể lọc thêm theo địa điểm, Chi phí khoảng / khách hoặc kinh nghiệm!"
  );
}

// ==============================
// NO RESULTS
// ==============================

function generateNoResultsMessage(
  parsedData
) {
  let message =
    "😔 Hiện tại chưa tìm thấy việc làm phù hợp";

  if (parsedData.keywords.length > 0) {
    message += ` với từ khóa "${parsedData.keywords.join(
      ", "
    )}"`;
  }

  const filters = [];

  if (parsedData.location) {
    filters.push(`tại ${parsedData.location}`);
  }

  if (parsedData.salary) {
    filters.push(
      `lương từ ${parsedData.salary}  `
    );
  }

  if (
    parsedData.experienceLevel !== null
  ) {
    filters.push(
      `${parsedData.experienceLevel} năm kinh nghiệm`
    );
  }

  if (filters.length > 0) {
    message += ` ${filters.join(", ")}`;
  }

  message += ".\n\n💡 Gợi ý:\n";
  message +=
    "- Thử từ khóa khác hoặc tổng quát hơn\n";
  message += "- Bỏ bớt điều kiện lọc\n";
  message +=
    "- Tìm theo ngành nghề: việc làm IT, marketing\n";
  message +=
    "- Tìm theo địa điểm: Hà Nội, remote";

  return message;
}

// ==============================
// GEMINI ADVICE
// ==============================

async function callGeminiAdvice(
  message,
  res
) {
  try {
    const prompt = `
Bạn là JobBot - trợ lý AI tuyển dụng chuyên nghiệp của VieJobs.

Phong cách:
- Thân thiện.
- Chuyên nghiệp.
- Trả lời ngắn gọn.
- Có emoji phù hợp.
- Ưu tiên tiếng Việt.

Bạn hỗ trợ:
- CV.
- Phỏng vấn.
- Định hướng nghề nghiệp.
- Kỹ năng nghề nghiệp.
- Tìm việc.

Nếu câu hỏi không liên quan việc làm, hãy lịch sự chuyển hướng.

User:
"${message}"
`;

    const answer = await callGemini(prompt, {
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.response?.data?.error?.message ||
        error.message,
    });
  }
}