import { Job } from "../models/job.model.js";
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas } from "canvas";
import Tesseract from "tesseract.js";
import Groq from "groq-sdk";

// Lấy đường dẫn tuyệt đối tới pdf.worker.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workerPath = path.join(
  __dirname,
  "../../node_modules/pdfjs-dist/legacy/build/pdf.worker.js"
);

pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

// ==============================
// GROQ CONFIG
// ==============================

// Sử dụng đúng tên biến môi trường bạn yêu cầu
const groq = new Groq({
  apiKey: process.env.GroqCloud_API_KEY, 
});

// Sử dụng model Llama 3 70B (Bản thông minh nhất của Llama 3 hiện tại)
const GROQ_MODEL = "llama-3.3-70b-versatile";

// ==============================
// GROQ HELPER
// ==============================

async function callGroq(prompt, requireJson = false) {
  const params = {
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: GROQ_MODEL,
    temperature: 0.7,
    max_tokens: 2048,
  };

  // Ép Groq trả về chuẩn JSON 100% nếu cần
  if (requireJson) {
    params.response_format = { type: "json_object" };
  }

  const chatCompletion = await groq.chat.completions.create(params);
  return chatCompletion.choices[0]?.message?.content || "";
}

// Hàm dọn dẹp JSON để AI trả về có markdown cũng không bị lỗi parse
function cleanJsonString(rawStr) {
  if (!rawStr) return "{}";
  let cleanStr = rawStr.replace(/^```(json)?|```$/gi, "").trim();
  const firstBrace = cleanStr.indexOf("{");
  const lastBrace = cleanStr.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleanStr = cleanStr.substring(firstBrace, lastBrace + 1);
  }
  return cleanStr;
}

// ==============================
// REVIEW CV (Đã cập nhật F&B)
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
        const canvas = createCanvas(viewport.width, viewport.height);
        const context = canvas.getContext("2d");

        const renderContext = {
          canvasContext: context,
          viewport,
        };

        await page.render(renderContext).promise;

        const imageBuffer = canvas.toBuffer("image/png");

        const result = await Tesseract.recognize(imageBuffer, "eng", {
          logger: () => {},
        });

        extractedText = result.data.text?.trim();
      } catch (err) {}
    }

    if (!extractedText || extractedText.length < 30) {
      return res.status(400).json({
        success: false,
        message: "Could not extract meaningful text from the resume.",
      });
    }

    // ==============================
    // GROQ REVIEW
    // ==============================

    try {
      const prompt = `
Bạn là chuyên gia nhân sự ngành F&B (Nhà hàng, Quán ăn, Đồ uống).

Yêu cầu:
- Viết bằng tiếng Việt tự nhiên, chuyên nghiệp.
- Không dùng ký hiệu "*" hoặc "•".
- Sử dụng Markdown rõ ràng.
- Mỗi ý dùng dấu "-".

Cấu trúc:
I. Tóm tắt tổng quan
II. Điểm mạnh nổi bật
III. Điểm yếu / Hạn chế cần khắc phục
IV. Đề xuất cải thiện
V. Lời khuyên định hướng nghề nghiệp

Mỗi phần:
- 5 đến 6 ý.
- Ngắn gọn, có chiều sâu.
- Không copy nguyên văn CV.

Kết thúc bằng lời động viên tích cực.

CV:
${extractedText}
`;

      const feedback = await callGroq(prompt);

      return res.json({
        success: true,
        feedback,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "Groq API error",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Resume review failed! " + (error?.message || "Unknown error"),
    });
  }
};

// ==============================
// GENERATE DESCRIPTION (Đã cập nhật F&B)
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
Bạn là chuyên gia content marketing F&B và branding.

Hãy tạo nội dung quảng cáo chuyên nghiệp dựa trên tiêu đề sau:

Tiêu đề:
"${title}"

Lĩnh vực:
"${category || "Nhà hàng / Quán ăn"}"

Yêu cầu:
- Nội dung phù hợp cho bài đăng Facebook, website booking.
- Văn phong hấp dẫn, gợi sự thèm ăn, thu hút thực khách.
- Phù hợp với thương hiệu ẩm thực, đồ ăn, nhà hàng, quán ăn, lounge.
- Có cảm xúc, hiện đại, chuyên nghiệp.
- Không dùng markdown.

Trả về DUY NHẤT JSON hợp lệ:

{
  "description": "Đoạn mô tả hương vị, không gian hấp dẫn khoảng 6-8 câu.",
  "targetCustomers": [
    "Phù hợp với nhóm bạn cần không gian trò chuyện rộng rãi.",
    "Thích hợp cho nhân viên văn phòng ăn trưa hoặc tiếp khách.",
    "Dành cho khách hàng gia đình tìm kiếm bữa ăn ấm cúng.",
    "Phù hợp cho các cặp đôi hẹn hò cuối tuần.",
    "Thích hợp cho thực khách thích chụp ảnh check-in."
  ],
  "benefits": [
    "Không gian hiện đại, thoải mái và sang trọng.",
    "Menu đa dạng món ăn và thức uống độc đáo.",
    "Dịch vụ đặt bàn tiện lợi, nhanh chóng.",
    "Phục vụ chuyên nghiệp, tận tâm.",
    "Vị trí thuận tiện dễ tìm, có bãi đỗ xe rộng rãi."
  ]
}

Quy tắc:
- targetCustomers: 5-7 ý.
- benefits: 5-7 ý.
- Mỗi chuỗi phải kết thúc bằng dấu chấm.
- Không trả thêm text ngoài JSON.
`;

    const content = await callGroq(prompt, true); // true = Bật JSON Mode
    let data;

    try {
      data = JSON.parse(cleanJsonString(content));
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
      requirements: data.targetCustomers || data.requirements || [],
      benefits: data.benefits || [],
    });
  } catch (error) {
    console.log("Groq Error:", error);

    // Bắt lỗi Rate Limit của Groq (Nếu có)
    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Quá tải API, vui lòng thử lại sau giây lát.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "AI generation failed!",
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
Bạn là AI phân tích yêu cầu tìm kiếm nhà hàng, chương trình ẩm thực.

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
  - BẮT BUỘC trả về "job_search" nếu khách muốn tìm nhà hàng, quán ăn, đặt bàn, xem menu, chương trình khuyến mãi.
  - "advice" nếu xin tư vấn chung.
  - "other" nếu chào hỏi.

- salary: đơn vị VNĐ (nếu khách nhắc đến giá tiền, budget).

User:
"${message}"
`;

    const raw = await callGroq(systemPrompt, true); // true = Bật JSON Mode

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
        ...JSON.parse(cleanJsonString(raw)),
      };
    } catch {
      console.log("Parse AI JSON failed");
    }

    // ==============================
    // NOT JOB SEARCH
    // ==============================

    if (parsedData.intent !== "job_search") {
      return callGroqAdvice(message, res);
    }

    // ==============================
    // QUERY
    // ==============================

    const query = {
      status: "active",
      approval: "approved",
    };

    const orConditions = [];

    // Nếu có keywords
    if (parsedData.keywords && parsedData.keywords.length > 0) {
      const keywordConditions = parsedData.keywords.map((kw) => ({
        $or: [
          { title: { $regex: kw, $options: "i" } },
          { description: { $regex: kw, $options: "i" } },
          { category: { $regex: kw, $options: "i" } },
        ],
      }));
      orConditions.push(...keywordConditions);
    }

    // Nếu có location
    if (parsedData.location) {
      orConditions.push({
        location: {
          $regex: parsedData.location,
          $options: "i",
        },
      });
    }

    // Gán orConditions
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

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
        .replace(/thanh pho|tp\.?|ho chi minh|hcmc/gi, "hcm")
        .trim();

    jobs = jobs.filter((job) => {
      let ok = true;

      if (parsedData.location) {
        const loc1 = normalize(job.location);
        const loc2 = normalize(parsedData.location);
        ok = ok && (loc1.includes(loc2) || loc2.includes(loc1));
      }

      if (parsedData.keywords && parsedData.keywords.length > 0) {
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
        ok = ok && !isNaN(s) && Math.abs(s - si) <= 1;
      }

      return ok;
    });

    // ==============================
    // RESPONSE
    // ==============================

    if (jobs.length > 0) {
      const answer = formatJobResults(jobs, parsedData);

      return res.json({
        success: true,
        answer,
      });
    }

    const answer = generateNoResultsMessage(parsedData);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.log("❌ chat_with_ai error:", error);

    // Bắt lỗi 429 Limit Quota của Groq
    if (error?.status === 429) {
      return res.json({
        success: true,
        answer: "😅 Hiện tại hệ thống đang có quá nhiều người truy cập. Bạn vui lòng đợi vài giây rồi hỏi lại mình nhé!"
      });
    }

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

  if (parsedData.keywords && parsedData.keywords.length > 0) {
    const keywordConditions = parsedData.keywords.map((kw) => ({
      $or: [
        { title: { $regex: kw, $options: "i" } },
        { description: { $regex: kw, $options: "i" } },
        { category: { $regex: kw, $options: "i" } },
      ],
    }));
    conditions.push(...keywordConditions);
  }

  if (parsedData.location) {
    conditions.push({
      location: { $regex: parsedData.location, $options: "i" },
    });
  }

  if (parsedData.jobType) {
    conditions.push({
      jobType: { $regex: parsedData.jobType, $options: "i" },
    });
  }

  if (parsedData.salary) {
    conditions.push({
      salary: { $gte: parsedData.salary },
    });
  }

  if (parsedData.experienceLevel !== null) {
    conditions.push({
      experienceLevel: { $lte: parsedData.experienceLevel + 1 },
    });
  }

  if (parsedData.category) {
    conditions.push({
      category: { $regex: parsedData.category, $options: "i" },
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

function formatJobResults(jobs, parsedData) {
  let header = "### 🍽️ Tìm thấy " + jobs.length + " chương trình / địa điểm đang diễn ra";
  
  if (parsedData.keywords && parsedData.keywords.length > 0) {
    header += " cho \"" + parsedData.keywords.join(", ") + "\"";
  }
  
  header += ":\n\n";

  const jobList = jobs.map((job, idx) => {
    const price = job.salary ? "💰 Mức giá: **" + job.salary + "**" : "";
    const exp = job.experienceLevel ? "🏷️ " + job.experienceLevel : "";
    const location = job.location ? "📍 " + job.location : "";
    const company = (job.company && job.company.name) ? job.company.name : "[Thương hiệu]";

    const details = [price, exp, location].filter(Boolean).join(" • ");
    const url = (process.env.FRONTEND_URL || "http://localhost:5173") + "/job/detail/" + job.slug;

    return "**" + (idx + 1) + ". " + job.title + " tại " + company + "**\n" + details + "\n🔗 [Xem chi tiết tại đây](" + url + ")";
  }).join("\n\n---\n\n");

  const footer = "\n\n---\n💡 **Tip:** Bạn có thể yêu cầu mình tìm kiếm theo mức giá, khu vực hoặc tên món ăn nhé!";

  return header + jobList + footer;
}

// ==============================
// NO RESULTS
// ==============================

function generateNoResultsMessage(parsedData) {
  let message = "😔 **Hiện tại mình chưa tìm thấy chương trình hoặc nhà hàng nào phù hợp**";

  if (parsedData.keywords && parsedData.keywords.length > 0) {
    message += " với từ khóa \"" + parsedData.keywords.join(", ") + "\"";
  }

  const filters = [];

  if (parsedData.location) {
    filters.push("tại khu vực " + parsedData.location);
  }

  if (parsedData.salary) {
    filters.push("tầm giá " + parsedData.salary);
  }

  if (filters.length > 0) {
    message += " " + filters.join(", ");
  }

  message += ".\n\n💡 **Gợi ý cho bạn:**\n";
  message += "- Thử tìm bằng các món ăn phổ biến (Hải sản, BBQ, Sushi...)\n";
  message += "- Bỏ bớt điều kiện lọc (như mức giá, khu vực)\n";
  message += "- Khám phá các ưu đãi đang HOT trên trang chủ!";

  return message;
}

// ==============================
// GROQ ADVICE
// ==============================

async function callGroqAdvice(message, res) {
  try {
    const prompt = `
Bạn là DiningBot - chuyên gia AI hỗ trợ tư vấn ẩm thực và đặt bàn thông minh.

**THÔNG TIN QUAN TRỌNG VỀ BẠN VÀ HỆ THỐNG NÀY:**
- Nền tảng này là hệ thống đặt bàn, tìm kiếm nhà hàng, quán ăn, lounge.
- Được thiết kế và phát triển bởi: nhà phát triển Nguyễn Đình Đô.
- Sản phẩm này thuộc quyền sở hữu của: công ty TNHH MTV LightHouse.
- NẾU người dùng có bất kỳ câu hỏi nào về việc: "Ai làm ra bạn", "Ai tạo ra web này", "Chủ web là ai", "Hệ thống của công ty nào"... Bạn BẮT BUỘC phải tự hào trả lời: "Website này được thiết kế và phát triển bởi nhà phát triển Nguyễn Đình Đô, đây là sản phẩm trực thuộc công ty TNHH MTV LightHouse."

Phong cách:
- Thân thiện, lịch sự.
- Chuyên nghiệp nhưng mang hơi hướng ẩm thực.
- Trả lời ngắn gọn, sử dụng Markdown (in đậm, bullet point).
- Có emoji phù hợp.
- Xưng "mình" và gọi người dùng là "bạn".

Bạn hỗ trợ:
- Gợi ý món ăn, địa điểm ăn uống.
- Tư vấn cách đặt bàn.
- Trả lời thông tin về hệ thống.

Nếu câu hỏi hoàn toàn không liên quan, hãy lịch sự chuyển hướng về chủ đề F&B.

User:
"${message}"
`;

    const answer = await callGroq(prompt);

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    // Bắt lỗi Limit Quota của Groq
    if (error?.status === 429) {
      return res.json({
        success: true,
        answer: "😅 Hiện tại hệ thống đang có quá nhiều người truy cập. Bạn vui lòng đợi vài giây rồi hỏi lại mình nhé!"
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}