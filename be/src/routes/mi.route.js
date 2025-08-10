import { Router } from "express";
import {
  advancedMIAnalysis,
  analyzeMIGemini,
} from "../controllers/mi.controller.js";

const router = Router();

// Phân tích cơ bản Đa trí thông minh bằng Gemini
router.post("/basic-analysis", analyzeMIGemini);

// Phân tích nâng cao Đa trí thông minh (dựa trên answer patterns và điểm số)
router.post("/advanced-analysis", advancedMIAnalysis);

// Route phụ trợ để lấy thông tin về các loại trí thông minh
router.get("/intelligence-types", (req, res) => {
  res.json({
    types: [
      {
        name: "Vận động",
        description: "Khả năng điều khiển cơ thể và thao tác vật thể",
      },
      {
        name: "Âm nhạc",
        description: "Nhạy cảm với âm thanh, nhịp điệu và giai điệu",
      },
      {
        name: "Thiên nhiên",
        description: "Nhận biết và phân loại các yếu tố tự nhiên",
      },
      {
        name: "Không gian",
        description: "Nhận thức không gian và tư duy hình ảnh",
      },
      {
        name: "Triết học",
        description: "Tư duy trừu tượng về các vấn đề hiện sinh",
      },
      {
        name: "Ngôn ngữ",
        description: "Nhạy cảm với ngôn từ và khả năng sử dụng ngôn ngữ",
      },
      {
        name: "Xã hội",
        description: "Hiểu và tương tác hiệu quả với người khác",
      },
      { name: "Nội tâm", description: "Tự nhận thức và hiểu bản thân sâu sắc" },
      {
        name: "Logic",
        description: "Tư duy logic, suy luận và phân tích vấn đề",
      },
    ],
    scoringRange: "1-5 (1: Hoàn toàn sai, 5: Hoàn toàn đúng)",
    version: "1.0.0",
  });
});

export default router;
