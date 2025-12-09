import cron from "node-cron";
import { User } from "../models/user.model.js";
import { createJobRecommendationNotification } from "../controllers/notification.controller.js";

// Chạy mỗi giờ để kiểm tra và tạo thông báo cho người dùng
export const startNotificationScheduler = () => {
  // Chạy mỗi giờ vào phút thứ 0
  cron.schedule("0 * * * *", async () => {
    try {
      // Lấy tất cả user có role là student
      const students = await User.find({ role: "student" });

      for (const student of students) {
        try {
          // Tạo thông báo mới
          await createJobRecommendationNotification(student._id);
        } catch (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
};
