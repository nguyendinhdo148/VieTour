import { User } from "./user";

export interface Company {
  featuredImages?: string[];

  _id: string;
  name: string;
  slug: string;
  description?: string;
  website?: string;
  location?: string;
  address?: string;
  logo?: string;
  businessLicense?: string;
  taxCode?: string;
  noe?: string;
  yoe?: string;
  field?: string;
  email?: string;
  phoneNumber?: string;
  approval?: string;
  approvalNote?: string;
  userId: User;
  createdAt: string;
  updatedAt: string;

  geolocation?: {
    type: "Point";
    coordinates: number[];
  };

  distance?: number;
}