import { Job } from "./job";
import { User } from "./user";

export interface Application {
  bookingDate: any;
  numberOfGuests: number;
  _id: string;
  job: Job;
  applicant: User; // ID của người nộp đơn
  status: "pending" | "accepted" | "rejected"; // Trạng thái của đơn ứng tuyển
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
