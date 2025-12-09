import { Notification } from "../models/notification.model.js";
import { SearchHistory } from "../models/searchHistory.model.js";
import { Job } from "../models/job.model.js";

// Lấy tất cả thông báo của user
export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.id;
    const { limit = 20, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notifications = await Notification.find({ user: userId })
      .sort({ notificationDate: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate({
        path: "relatedJobs.job",
        select: "title slug location salary company",
        populate: {
          path: "company",
          select: "name logo",
        },
      });

    const total = await Notification.countDocuments({ user: userId });
    const unreadCount = await Notification.countDocuments({
      user: userId,
      isRead: false,
    });

    return res.status(200).json({
      notifications,
      total,
      unreadCount,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Đánh dấu thông báo là đã đọc
export const markAsRead = async (req, res, next) => {
  try {
    const userId = req.id;
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: userId },
      {
        isRead: true,
        readAt: new Date(),
      },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Đánh dấu tất cả thông báo là đã đọc
export const markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.id;

    await Notification.updateMany(
      { user: userId, isRead: false },
      {
        isRead: true,
        readAt: new Date(),
      }
    );

    return res.status(200).json({
      message: "All notifications marked as read",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa thông báo
export const deleteNotification = async (req, res, next) => {
  try {
    const userId = req.id;
    const { notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
      user: userId,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Notification deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Tạo thông báo job recommendation dựa trên lịch sử tìm kiếm
export const createJobRecommendationNotification = async (userId) => {
  try {
    // Lấy các query tìm kiếm gần đây nhất (trong 7 ngày)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const searchHistories = await SearchHistory.find({
      user: userId,
      lastSearchedAt: { $gte: sevenDaysAgo },
    })
      .sort({ lastSearchedAt: -1, searchCount: -1 }) // Ưu tiên query mới nhất trước
      .limit(5);

    if (searchHistories.length === 0) {
      return null;
    }

    // Kiểm tra xem đã có thông báo trong 24h qua chưa
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    // Lặp qua các query theo thứ tự mới nhất, tìm query đầu tiên chưa có thông báo trong 24h
    for (const searchHistory of searchHistories) {
      const currentQuery = searchHistory.query;

      // Kiểm tra xem đã có thông báo cho query này trong 24h qua chưa
      const existingNotification = await Notification.findOne({
        user: userId,
        searchQuery: currentQuery,
        lastNotificationSentAt: { $gte: oneDayAgo },
      });

      // Nếu đã có thông báo cho query này, bỏ qua và thử query tiếp theo
      if (existingNotification) {
        continue;
      }

      // Tìm các job liên quan
      const regexQuery = new RegExp(currentQuery, "i");
      const jobs = await Job.find({
        status: "active",
        approval: "approved",
        $or: [
          { title: { $regex: regexQuery } },
          { description: { $regex: regexQuery } },
          { category: { $regex: regexQuery } },
          { location: { $regex: regexQuery } },
        ],
      })
        .populate("company", "name logo")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

      // Nếu không tìm thấy job, thử query tiếp theo
      if (jobs.length === 0) {
        continue;
      }

      // Tạo thông báo mới cho query này
      const relatedJobs = jobs.map((job) => ({
        job: job._id,
        jobTitle: job.title,
        companyName: job.company?.name || "Công ty chưa xác định",
        jobSlug: job.slug,
      }));

      const notification = await Notification.create({
        user: userId,
        type: "job_recommendation",
        title: `Có ${jobs.length} công việc mới phù hợp với tìm kiếm của bạn`,
        message: `Dựa trên từ khóa "${currentQuery}" mà bạn đã tìm kiếm, chúng tôi tìm thấy ${jobs.length} công việc mới có thể phù hợp với bạn.`,
        relatedJobs,
        searchQuery: currentQuery,
        notificationDate: new Date(),
        lastNotificationSentAt: new Date(),
      });

      return notification;
    }

    // Nếu tất cả các query đều đã có thông báo trong 24h qua, return null
    return null;
  } catch (error) {
    console.error("Error creating job recommendation notification:", error);
    return null;
  }
};
