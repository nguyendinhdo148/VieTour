import { Job } from "./job";

export interface RelatedJob {
  job: Job | string;
  jobTitle: string;
  companyName: string;
  jobSlug: string;
}

export interface Notification {
  _id: string;
  user: string;
  type: "job_recommendation" | "job_alert" | "application_update";
  title: string;
  message: string;
  relatedJobs: RelatedJob[];
  searchQuery: string;
  isRead: boolean;
  readAt?: string;
  notificationDate: string;
  lastNotificationSentAt: string;
  createdAt: string;
  updatedAt: string;
}

