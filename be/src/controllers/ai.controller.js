import { OpenAI } from "openai";
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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai2 = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_2,
});

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

    // 1. Ưu tiên trích xuất text từ PDF (dạng text)
    let extractedText = "";
    try {
      const pdf = await pdfjsLib.getDocument({ data: resume.buffer }).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        extractedText += pageText + "\n";
      }
      extractedText = extractedText.trim();
    } catch (err) {
      // Không log lỗi ra terminal
    }

    // Nếu text quá ngắn, fallback sang OCR (scan image)
    if (!extractedText || extractedText.length < 30) {
      try {
        const pdf = await pdfjsLib.getDocument({ data: resume.buffer }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        const imageBuffer = canvas.toBuffer("image/png");
        const result = await Tesseract.recognize(imageBuffer, "eng", {
          logger: () => {}, // Không log ra terminal
        });
        extractedText = result.data.text?.trim();
      } catch (err) {
        // Không log lỗi ra terminal
      }
    }

    if (!extractedText || extractedText.length < 30) {
      return res.status(400).json({
        success: false,
        message: "Could not extract meaningful text from the resume.",
      });
    }

    // 2. Gửi text lên Gemini API (Google Generative Language API)
    try {
      const geminiApiKey = process.env.GEMINI_API_KEY_REVIEW_CV;
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
      const prompt = `Xem lại sơ yếu lý lịch sau đây và đưa ra phản hồi mang tính xây dựng về
                    điểm mạnh, điểm yếu và các lĩnh vực cần cải thiện.
                    Nội dung sơ yếu lý lịch:\n\n${extractedText}.`;

      const geminiRes = await axios.post(geminiApiUrl, {
        contents: [{ parts: [{ text: prompt }] }],
      });
      const feedback =
        geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Không nhận được phản hồi từ AI";

      return res.json({
        success: true,
        feedback,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message:
          "Gemini API error: " +
          (err?.response?.data?.error?.message ||
            err.message ||
            "Unknown error"),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Resume review failed! " + (error?.message || "Unknown error"),
    });
    next(error);
  }
};

export const generate_description = async (req, res, next) => {
  const { title, category } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, message: "Missing job title!" });
  }

  try {
    const prompt = `
    Bạn là một chuyên gia tuyển dụng. Hãy viết mô tả công việc ngắn gọn, súc tích cho vị trí sau:
    - Tiêu đề: ${title}
    - Lĩnh vực: ${category || "Không xác định"}
    
    Yêu cầu:
    - Viết 6-7 câu.
    - Mỗi câu kết thúc bằng dấu chấm.
    - Nội dung rõ ràng, chuyên nghiệp.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Bạn là một chuyên gia viết mô tả công việc.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const description = response.choices[0].message.content.trim();

    res.json({
      success: true,
      description,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ success: false, message: "AI generation failed!" });
    next(error);
  }
};

export const chat_with_ai = async (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing message!" });
  }

  try {
    // 1. Cải thiện prompt để phân tích intent và keywords chính xác hơn
    const extractPrompt = `
    Bạn là trợ lý AI phân tích ý định tìm việc làm. Hãy phân tích câu hỏi sau và trả về JSON với các trường:
    - intent: "job_search" nếu người dùng muốn tìm việc, "other" nếu không
    - keywords: mảng từ khóa chính xác về vị trí, kỹ năng, địa điểm, ngành nghề
    - location: địa điểm cụ thể nếu có
    - jobType: loại hình công việc (full-time, part-time, remote, internship, thực tập, bán thời gian, toàn thời gian, từ xa) nếu có
    - salary: mức lương tối thiểu nếu có (số nguyên, đơn vị triệu)
    - experienceLevel: số năm kinh nghiệm nếu có
    - category: ngành nghề/lĩnh vực nếu có
    
    Ví dụ:
    - "Tìm việc developer PHP ở Hà Nội" → {"intent": "job_search", "keywords": ["developer", "PHP"], "location": "Hà Nội", "category": "IT"}
    - "Việc làm marketing lương trên 15 triệu" → {"intent": "job_search", "keywords": ["marketing"], "salary": 15}
    - "Tìm intern NodeJS 0-1 năm kinh nghiệm" → {"intent": "job_search", "keywords": ["intern", "NodeJS"], "experienceLevel": 1, "jobType": "internship"}
    
    Chỉ trả về JSON, không giải thích thêm.
    Câu hỏi: "${message}"
    `;

    const extractRes = await openai2.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Bạn là trợ lý AI phân tích ý định tìm việc và trích xuất từ khóa chính xác.",
        },
        { role: "user", content: extractPrompt },
      ],
      temperature: 0.1, // Giảm temperature để có kết quả ổn định hơn
      max_tokens: 400,
    });

    let parsedData = {
      intent: "other",
      keywords: [],
      location: null,
      jobType: null,
      salary: null,
      experienceLevel: null,
      category: null,
    };

    try {
      const jsonStr =
        extractRes.choices[0].message.content.match(/\{[\s\S]*\}/)?.[0];
      if (jsonStr) {
        const parsed = JSON.parse(jsonStr);
        parsedData = { ...parsedData, ...parsed };

        // Lọc keywords hợp lệ
        parsedData.keywords =
          parsedData.keywords?.filter(
            (k) =>
              typeof k === "string" &&
              k.length > 1 &&
              ![
                "việc",
                "làm",
                "tìm",
                "kiếm",
                "công",
                "ty",
                "ở",
                "tại",
                "với",
              ].includes(k.toLowerCase())
          ) || [];
      }
    } catch (e) {
      console.error("JSON parse error:", e);
    }

    // 2. Nếu là tìm việc, xây dựng query thông minh hơn
    if (parsedData.intent === "job_search") {
      const searchQuery = buildSearchQuery(parsedData);

      // Tìm kiếm với scoring để sắp xếp kết quả tốt hơn
      let jobs = await Job.aggregate([
        { $match: searchQuery },
        {
          $lookup: {
            from: "companies",
            localField: "company",
            foreignField: "_id",
            as: "company",
          },
        },
        { $unwind: "$company" },
        {
          $addFields: {
            // Tính điểm relevance dựa trên match
            relevanceScore: {
              $add: [
                // Bonus điểm cho title match
                {
                  $cond: [
                    {
                      $regexMatch: {
                        input: "$title",
                        regex: parsedData.keywords.join("|"),
                        options: "i",
                      },
                    },
                    10,
                    0,
                  ],
                },
                // Bonus điểm cho location match
                {
                  $cond: [
                    parsedData.location
                      ? {
                          $regexMatch: {
                            input: "$location",
                            regex: parsedData.location,
                            options: "i",
                          },
                        }
                      : false,
                    5,
                    0,
                  ],
                },
                // Bonus điểm cho category match
                {
                  $cond: [
                    parsedData.category
                      ? {
                          $regexMatch: {
                            input: "$category",
                            regex: parsedData.category,
                            options: "i",
                          },
                        }
                      : false,
                    5,
                    0,
                  ],
                },
                // Bonus điểm cho salary match
                {
                  $cond: [
                    parsedData.salary
                      ? { $gte: ["$salary", parsedData.salary] }
                      : false,
                    3,
                    0,
                  ],
                },
                // Bonus điểm cho experience match
                {
                  $cond: [
                    parsedData.experienceLevel !== null
                      ? {
                          $lte: [
                            "$experienceLevel",
                            parsedData.experienceLevel + 1,
                          ],
                        }
                      : false,
                    3,
                    0,
                  ],
                },
              ],
            },
          },
        },
        { $sort: { relevanceScore: -1, createdAt: -1 } },
        { $limit: 8 },
      ]);

      // Fallback search nếu không có kết quả
      if (jobs.length === 0) {
        jobs = await Job.find({
          $or: [
            ...parsedData.keywords.map((kw) => ({
              title: { $regex: kw, $options: "i" },
            })),
            ...parsedData.keywords.map((kw) => ({
              description: { $regex: kw, $options: "i" },
            })),
            ...parsedData.keywords.map((kw) => ({
              category: { $regex: kw, $options: "i" },
            })),
            ...(parsedData.location
              ? [{ location: { $regex: parsedData.location, $options: "i" } }]
              : []),
          ],
          status: "active",
          approval: "approved",
        })
          .populate("company")
          .sort({ createdAt: -1 })
          .limit(5);
      }

      if (jobs.length > 0) {
        // Format kết quả tốt hơn
        const answer = formatJobResults(jobs, parsedData);
        return res.json({ success: true, answer });
      } else {
        return res.json({
          success: true,
          answer: generateNoResultsMessage(parsedData),
        });
      }
    }

    // 3. Nếu không phải tìm việc, gọi OpenAI trả lời tư vấn
    return callOpenAI(message, res);
  } catch (error) {
    console.error("OpenAI Chat Error:", error);
    res.status(500).json({ success: false, message: "AI chat failed!" });
    next(error);
  }
};

// Hàm xây dựng query tìm kiếm thông minh
function buildSearchQuery(parsedData) {
  const baseQuery = {
    status: "active",
    approval: "approved",
  };

  const conditions = [];

  // Keywords search - tìm trong các trường quan trọng
  if (parsedData.keywords.length > 0) {
    const keywordConditions = parsedData.keywords.map((kw) => ({
      $or: [
        { title: { $regex: kw, $options: "i" } },
        { description: { $regex: kw, $options: "i" } },
        { category: { $regex: kw, $options: "i" } },
      ],
    }));
    conditions.push(...keywordConditions);
  }

  // Location filter
  if (parsedData.location) {
    conditions.push({
      location: { $regex: parsedData.location, $options: "i" },
    });
  }

  // Job type filter
  if (parsedData.jobType) {
    conditions.push({ jobType: { $regex: parsedData.jobType, $options: "i" } }); // Loại công việc (full-time, part-time, remote, internship)
  }

  // Salary filter
  if (parsedData.salary) {
    conditions.push({ salary: { $gte: parsedData.salary } }); // Lương tối thiểu
  }

  // Experience level filter
  if (parsedData.experienceLevel !== null) {
    conditions.push({
      experienceLevel: { $lte: parsedData.experienceLevel + 1 },
    });
  }

  // Category filter
  if (parsedData.category) {
    conditions.push({
      category: { $regex: parsedData.category, $options: "i" },
    });
  }

  // Kết hợp conditions
  if (conditions.length > 0) {
    if (parsedData.keywords.length > 0) {
      // Ưu tiên AND cho keywords, OR cho các filter khác
      baseQuery.$and = [
        {
          $or: parsedData.keywords.map((kw) => ({
            $or: [
              { title: { $regex: kw, $options: "i" } },
              { description: { $regex: kw, $options: "i" } },
              { category: { $regex: kw, $options: "i" } },
            ],
          })),
        },
        ...conditions.slice(parsedData.keywords.length),
      ];
    } else {
      baseQuery.$and = conditions;
    }
  }

  return baseQuery;
}

// Hàm format kết quả tìm kiếm
function formatJobResults(jobs, parsedData) {
  const header = `🔍 Tìm thấy ${jobs.length} việc làm phù hợp${
    parsedData.keywords.length > 0
      ? ` cho "${parsedData.keywords.join(", ")}"`
      : ""
  }:\n\n`;

  const jobList = jobs
    .map((job, idx) => {
      const salary = job.salary ? `💰 ${job.salary} triệu` : "";
      const experience = job.experienceLevel
        ? `📊 ${job.experienceLevel} năm KN`
        : "";
      const location = job.location ? `📍 ${job.location}` : "";
      const company = job.company?.name || "[Công ty]";

      const details = [salary, experience, location]
        .filter(Boolean)
        .join(" • ");

      return `${idx + 1}. **${job.title}** tại ${company}
   ${details}
   🔗 Xem chi tiết: ${
     process.env.FRONTEND_URL || "http://localhost:5173"
   }/job/detail/${job.slug}`;
    })
    .join("\n\n");

  return (
    header +
    jobList +
    "\n\n💡 Tip: Bạn có thể lọc thêm theo địa điểm, mức lương, hoặc kinh nghiệm!"
  );
}

// Hàm tạo thông báo khi không tìm thấy kết quả
function generateNoResultsMessage(parsedData) {
  let message = "😔 Hiện tại chưa tìm thấy việc làm phù hợp";

  if (parsedData.keywords.length > 0) {
    message += ` với từ khóa "${parsedData.keywords.join(", ")}"`;
  }

  const filters = [];
  if (parsedData.location) filters.push(`tại ${parsedData.location}`);
  if (parsedData.salary) filters.push(`lương từ ${parsedData.salary} triệu`);
  if (parsedData.experienceLevel !== null)
    filters.push(`${parsedData.experienceLevel} năm kinh nghiệm`);

  if (filters.length > 0) {
    message += ` ${filters.join(", ")}`;
  }

  message += ".\n\n💡 Gợi ý:\n";
  message += "• Thử từ khóa khác hoặc tổng quát hơn\n";
  message += "• Bỏ bớt điều kiện lọc\n";
  message += "• Tìm theo ngành nghề: 'việc làm IT', 'việc làm marketing'\n";
  message += "• Tìm theo địa điểm: 'việc làm Hà Nội', 'việc làm remote'";

  return message;
}

// Hàm gọi OpenAI trả lời tư vấn - cải thiện prompt
async function callOpenAI(message, res) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `Bạn là JobBot - trợ lý AI chuyên nghiệp hỗ trợ tìm kiếm việc làm và tư vấn nghề nghiệp.
        
        Chuyên môn của bạn:
        • Tư vấn định hướng nghề nghiệp
        • Hướng dẫn viết CV, thư xin việc
        • Chuẩn bị phỏng vấn
        • Phân tích thị trường việc làm
        • Kỹ năng phát triển sự nghiệp

        Bạn cũng có thể giới thiệu sơ lược về công ty VieJobs như sau:
        "VieJobs là nền tảng tuyển dụng và hỗ trợ nghề nghiệp hàng đầu tại Việt Nam, kết nối hiệu quả giữa người tìm việc 
        và nhà tuyển dụng uy tín. Chúng tôi cam kết mang đến trải nghiệm tìm việc nhanh chóng, thuận tiện và thiết thực, 
        góp phần nâng cao chất lượng nguồn nhân lực Việt Nam."

        "VieJobs được đồng sáng lập bởi hai bạn trẻ tài năng và đầy nhiệt huyết: Lý Gia Long và Nguyễn Đình Đô, những sinh viên 
        năng động với tầm nhìn đổi mới trong lĩnh vực tuyển dụng và phát triển nghề nghiệp. Họ đã chung tay xây dựng nền tảng này 
        với mục tiêu tạo ra môi trường kết nối việc làm hiệu quả, thân thiện và bền vững cho cộng đồng lao động Việt Nam." 
        
        Phong cách trả lời:
        • Thân thiện, chuyên nghiệp
        • Ngắn gọn, súc tích (2-3 đoạn)
        • Đưa ra lời khuyên thực tế
        • Sử dụng emoji phù hợp
        • Ưu tiên tiếng Việt
        
        Nếu câu hỏi không liên quan đến việc làm, hãy lịch sự chuyển hướng về chủ đề tuyển dụng.`,
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  const answer = response.choices[0].message.content.trim();
  return res.json({ success: true, answer });
}
