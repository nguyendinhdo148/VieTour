import mongoose from "mongoose";

const searchHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    searchCount: {
      type: Number,
      default: 1,
    },
    lastSearchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh theo user và query
searchHistorySchema.index({ user: 1, query: 1 }, { unique: true });
searchHistorySchema.index({ user: 1, lastSearchedAt: -1 });

export const SearchHistory = mongoose.model(
  "SearchHistory",
  searchHistorySchema
);

