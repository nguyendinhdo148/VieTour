import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    approval: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvalNote: {
      type: String,
      default: "",
    },
    tags: [{ type: String }],
    category: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Blog = mongoose.model("Blog", blogSchema);
