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
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
      const prompt = `
                      Bạn là chuyên gia tuyển dụng và cố vấn nghề nghiệp.
                      - Viết bằng tiếng Việt tự nhiên, thân thiện và chuyên nghiệp, không dùng ký hiệu "*" hay "•".
                      - Bắt đầu phản hồi bằng **lời chào ngắn gọn và tích cực** (ví dụ: “Xin chào bạn, cảm ơn bạn đã gửi CV đến để được đánh giá!”).

                      🎯 Mục tiêu:
                      Đánh giá sơ yếu lý lịch (CV) bên dưới bằng tiếng Việt và viết phản hồi ngắn gọn, chuyên nghiệp, có bố cục rõ ràng.

                      🧩 Yêu cầu trình bày:
                      - Viết bằng tiếng Việt tự nhiên, dễ hiểu, không dùng ký hiệu "*" hay "•".
                      - Dùng Markdown với cấu trúc các mục:
                        **I. Tóm tắt tổng quan**  
                        **II. Điểm mạnh**  
                        **III. Điểm yếu / Hạn chế**  
                        **IV. Đề xuất cải thiện**  
                        **V. Kết luận / Lời khuyên**
                      - Mỗi mục có 5–6 gạch đầu dòng, sử dụng dấu gạch ngang "-" cho mỗi ý (không dùng ký hiệu khác).
                      - Nội dung cần cô đọng, có chiều sâu, tránh lặp lại, trình bày cân đối và dễ đọc.
                      - Không trích nguyên văn nội dung CV, chỉ phân tích và nhận xét.
                      - Kết thúc phản hồi bằng **lời chúc động viên** (ví dụ: “Chúc bạn thành công và sớm đạt được mục tiêu nghề nghiệp mong muốn!”).

                      📄 Nội dung CV cần đánh giá:
                      ----------------------------------------
                      ${extractedText}
                      ----------------------------------------

                      Hãy xuất kết quả cuối cùng bằng Markdown, dễ hiển thị trên web, sử dụng khoảng cách dòng hợp lý, không quá thưa.
                      `;

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
    Bạn là một chuyên gia tuyển dụng (HR Manager) chuyên nghiệp. 
    Hãy viết nội dung tuyển dụng cho vị trí: "${title}" thuộc lĩnh vực: "${
      category || "Không xác định"
    }".
    
    Hãy trả về kết quả dưới dạng **JSON object** (không kèm markdown) với các trường sau:
    1. "description": Một đoạn văn mô tả công việc hấp dẫn, khoảng 6-7 câu, chuyên nghiệp.
    2. "requirements": Một mảng (array) chứa 5-7 chuỗi. Mỗi chuỗi là một yêu cầu cụ thể, **bắt buộc phải kết thúc bằng dấu chấm (.)**.
    3. "benefits": Một mảng (array) chứa 5-7 chuỗi. Mỗi chuỗi là một quyền lợi, **bắt buộc phải kết thúc bằng dấu chấm (.)**.

    Ví dụ format mong muốn:
    {
      "description": "Chúng tôi đang tìm kiếm...",
      "requirements": ["Có kinh nghiệm 2 năm.", "Thành thạo ReactJS."],
      "benefits": ["Lương tháng 13.", "Bảo hiểm đầy đủ."]
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Bạn là trợ lý AI chuyên tạo nội dung tuyển dụng dưới dạng JSON.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content;
    let data;

    try {
      data = JSON.parse(content);
    } catch (e) {
      // Fallback nếu AI không trả về JSON chuẩn (ít khi xảy ra với mode json_object)
      console.error("JSON Parse error:", e);
      return res
        .status(500)
        .json({ success: false, message: "AI output format error" });
    }

    res.json({
      success: true,
      description: data.description || "",
      requirements: data.requirements || [],
      benefits: data.benefits || [],
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
    // 1️ Gọi OpenAI để phân tích yêu cầu
    const systemPrompt = `
    Bạn là một trợ lý AI thông minh cho nền tảng tuyển dụng VieJobs.
    Nhiệm vụ của bạn là trích xuất thông tin từ câu hỏi của người dùng thành dạng JSON.
    
    Quy tắc trích xuất:
    - intent: "job_search" (nếu tìm việc), "advice" (nếu xin lời khuyên), "other" (chào hỏi/khác).
    - keywords: Mảng các từ khóa quan trọng (kỹ năng, tên công việc, ngôn ngữ). Bỏ qua các từ "tìm", "việc", "tại", "ở".
    - location: Tên thành phố/tỉnh thành chuẩn hóa (VD: "hcm", "hanoi", "danang"). Nếu không có trả về null.
    - salary: Số nguyên (đơn vị Triệu VNĐ). Nếu người dùng nhập USD, hãy quy đổi (1 USD = 25.000 VND). VD: "1000 đô" -> 25.
    - experienceLevel: Số năm kinh nghiệm (number). "Mới ra trường" = 0.
    - jobType: "Full-Time" | "Part-Time" | "Remote" | "Internship" | null.
    - category: Lĩnh vực nếu rõ ràng (IT, Marketing, Kế toán...).

    Ví dụ: "Tìm việc ReactJS lương trên 1000 đô tại Sài Gòn"
    Output:
    {
      "intent": "job_search",
      "keywords": ["ReactJS"],
      "location": "hcm",
      "salary": 25,
      "jobType": null,
      "experienceLevel": null,
      "category": "IT"
    }
    `;

    const userMessage = `Câu hỏi: "${message}"`;

    const extractRes = await openai2.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.1,
      response_format: { type: "json_object" },
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
      const jsonStr =
        extractRes.choices[0].message.content.match(/\{[\s\S]*\}/)?.[0];
      if (jsonStr) {
        parsedData = { ...parsedData, ...JSON.parse(jsonStr) };
      }
    } catch {
      console.warn("⚠️ Không parse được JSON từ AI");
    }

    // 2️ Nếu không phải tìm việc → gọi OpenAI tư vấn
    if (parsedData.intent !== "job_search") {
      return callOpenAI(message, res);
    }

    // 3️ Tạo query lỏng (chỉ lọc status, approval, keyword, location)
    const query = {
      status: "active",
      approval: "approved",
      $or: [
        ...(parsedData.keywords.length
          ? parsedData.keywords.map((kw) => ({
              $or: [
                { title: { $regex: kw, $options: "i" } },
                { description: { $regex: kw, $options: "i" } },
                { category: { $regex: kw, $options: "i" } },
              ],
            }))
          : []),
        ...(parsedData.location
          ? [{ location: { $regex: parsedData.location, $options: "i" } }]
          : []),
      ],
    };

    // 4️ Truy vấn MongoDB
    let jobs = await Job.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      { $limit: 30 },
    ]);

    // 5️ Lọc chính xác hậu truy vấn bằng normalize
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

      if (parsedData.keywords.length > 0) {
        const combined = normalize(
          `${job.title} ${job.description} ${job.category}`
        );
        ok =
          ok &&
          parsedData.keywords.some((kw) => combined.includes(normalize(kw)));
      }

      if (parsedData.salary) {
        const s = Number(job.salary);
        const si = Number(parsedData.salary);
        // Lọc chính xác: chỉ nhận job có lương nằm trong khoảng ±1 triệu (coi như đúng 15)
        ok = ok && !isNaN(s) && Math.abs(s - si) <= 1;
      }

      return ok;
    });

    // 6️ Kết quả
    if (jobs.length > 0) {
      const answer = formatJobResults(jobs, parsedData);
      return res.json({ success: true, answer });
    } else {
      const answer = generateNoResultsMessage(parsedData);
      return res.json({ success: true, answer });
    }
  } catch (error) {
    console.error("❌ chat_with_ai error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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

      return `${idx + 1}. ${job.title} tại ${company}
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
