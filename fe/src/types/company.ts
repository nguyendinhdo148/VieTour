import { User } from "./user";

export interface Company {
  _id: string;
  name: string;
  slug: string;
  description?: string; // Optional description
  website?: string; // Optional website URL
  location?: string; // Optional location
  address?: string; // Optional address
  logo?: string; // Optional logo URL
  businessLicense?: string; // Optional business license URL
  taxCode?: string; // Optional tax code
  noe?: string; // number of employees
  yoe?: string; // years of experience
  field?: string; // field of work
  email?: string; // Email của công ty/người đại diện
  phoneNumber?: string; // Số điện thoại liên hệ
  approval?: string; // "pending" | "approved" | "rejected"
  approvalNote?: string; // Ghi chú từ admin
  userId: User; // ID của người dùng tạo công ty
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
