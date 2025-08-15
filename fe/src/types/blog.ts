import { User } from "./user";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  slug: string;
  image: {
    url: string;
    public_id: string;
  }; // URL to the blog image
  tags: string[];
  category: string;
  views: number;
  //   status: string; // e.g., "active", "draft", "closed".
  approval: string; // e.g, "approved", "pending", "rejected".
  approvalNote: string;
  created_by: User;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
