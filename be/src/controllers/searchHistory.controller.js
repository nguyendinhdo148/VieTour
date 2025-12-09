import { SearchHistory } from "../models/searchHistory.model.js";

// Lưu lịch sử tìm kiếm
export const saveSearchHistory = async (req, res, next) => {
  try {
    const userId = req.id;
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Query is required",
        success: false,
      });
    }

    const trimmedQuery = query.trim();

    // Tìm hoặc tạo lịch sử tìm kiếm
    const searchHistory = await SearchHistory.findOneAndUpdate(
      { user: userId, query: trimmedQuery },
      {
        $inc: { searchCount: 1 },
        $set: { lastSearchedAt: new Date() },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      message: "Search history saved successfully",
      searchHistory,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Lấy lịch sử tìm kiếm của user
export const getSearchHistory = async (req, res, next) => {
  try {
    const userId = req.id;

    const searchHistories = await SearchHistory.find({ user: userId })
      .sort({ lastSearchedAt: -1 })
      .limit(10);

    return res.status(200).json({
      searchHistories,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa lịch sử tìm kiếm
export const deleteSearchHistory = async (req, res, next) => {
  try {
    const userId = req.id;
    const { historyId } = req.params;

    const deletedHistory = await SearchHistory.findOneAndDelete({
      _id: historyId,
      user: userId,
    });

    if (!deletedHistory) {
      return res.status(404).json({
        message: "Search history not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Search history deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
