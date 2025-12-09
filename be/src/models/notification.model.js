import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["job_recommendation", "job_alert", "application_update"],
      default: "job_recommendation",
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedJobs: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        jobTitle: String,
        companyName: String,
        jobSlug: String,
      },
    ],
    searchQuery: {
      type: String,
      default: "",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    notificationDate: {
      type: Date,
      default: Date.now,
    },
    lastNotificationSentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index để tìm kiếm nhanh
notificationSchema.index({ user: 1, isRead: 1, notificationDate: -1 });
notificationSchema.index({ user: 1, lastNotificationSentAt: 1 });

export const Notification = mongoose.model("Notification", notificationSchema);

