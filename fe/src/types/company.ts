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
  userId: User; // ID của người dùng tạo công ty
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
