import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    logo: {
      type: String, // URL to company logo
    },
    noe: {
      type: String, // number of employees
    },
    yoe: {
      type: String, // years of experience
    },
    field: {
      type: String, // field of work
    },
    businessLicense: {
      type: String, // URL ảnh scan giấy phép kinh doanh
    },
    taxCode: {
      type: String, // Mã số thuế
      unique: true, // Mã số thuế là duy nhất
    },
    email: {
      type: String, // Email của công ty/người đại diện
    },
    phoneNumber: {
      type: String, // Số điện thoại liên hệ
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export const Company = mongoose.model("Company", companySchema);
