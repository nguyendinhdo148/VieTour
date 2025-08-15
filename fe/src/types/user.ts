export interface User {
  _id: string;
  fullname: string;
  email: string;
  role: string;
  phoneNumber: number;
  profile: {
    bio?: string;
    skills?: string[];
    resume?: {
      url: string;
      public_id: string;
    };
    resumeOriginalName?: string;
    company?: string;
    profilePhoto: {
      url: string;
      public_id: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
