import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import slugify from "slugify";

function generateCompanySlug(name, location, taxCode) {
  const nameSlug = slugify(name, { lower: true, strict: true });
  const locationSlug = slugify(location, { lower: true, strict: true });
  const taxCodeSuffix = taxCode.slice(-6);

  return `${nameSlug}-${locationSlug}-${taxCodeSuffix}`;
}

// for recruiter
export const createCompany = async (req, res, next) => {
  try {
    const {
      name,
      description,
      website,
      location,
      address,
      taxCode,
      noe,
      yoe,
      field,
    } = req.body;
    const files = req.files;

    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized. Please login again.",
        success: false,
      });
    }

    // Validate các trường bắt buộc
    if (!name || !taxCode || !location || !address) {
      return res.status(400).json({
        message:
          "Vui lòng điền đầy đủ thông tin: Tên công ty, Mã số thuế, Địa điểm, và Địa chỉ.",
        success: false,
      });
    }

    // Lấy thông tin user để lấy email và phoneNumber
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // max 1 company per recruiter
    let userCompanies = await Company.find({ userId });
    if (userCompanies.length >= 1) {
      return res.status(400).json({
        message: "You can create up to 1 companies.",
        success: false,
      });
    }

    // Kiểm tra taxCode trùng
    let company = await Company.findOne({ taxCode });
    if (company) {
      return res.status(400).json({
        message: "Duplicate business license.",
        success: false,
      });
    }

    // Upload logo nếu có
    let logo = null;
    if (files?.logo?.length) {
      const fileUri = getDataUri(files.logo[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      logo = uploadRes.secure_url;
    }

    // Upload business license nếu có
    let businessLicense = null;
    if (files?.businessLicense?.length) {
      const fileUri = getDataUri(files.businessLicense[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      businessLicense = uploadRes.secure_url;
    }

    const slug = generateCompanySlug(name, location, taxCode);

    company = await Company.create({
      name,
      slug: slug,
      description,
      website,
      location,
      address,
      taxCode,
      logo,
      businessLicense,
      noe, // number of employees
      yoe, // years of experience
      field, // field of work
      email: user.email, // Lấy email từ user
      phoneNumber: user.phoneNumber?.toString() || "", // Lấy phoneNumber từ user
      approval: "pending", // Mặc định là pending, cần admin duyệt
      userId: req.id,
    });

    return res.status(201).json({
      message:
        "Công ty đã được tạo thành công. Vui lòng chờ admin duyệt để có thể đăng tin tuyển dụng.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    next(error);
  }
};

// for recruiter
export const getCompanies = async (req, res, next) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    next(error);
  }
};

// for user
export const getCompanyById = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    next(error);
  }
};

// for user - get company details
export const getCompanyDetails = async (req, res, next) => {
  try {
    const companySlug = req.params.slug;
    const company = await Company.findOne({ slug: companySlug });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    next(error);
  }
};

// for user - get jobs by company
export const getJobByCompany = async (req, res, next) => {
  try {
    const companySlug = req.params.slug;

    const company = await Company.findOne({ slug: companySlug });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    const jobs = await Job.find({
      company: company._id,
      status: "active",
      approval: "approved",
    }).populate("company", "name logo location");

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    next(error);
  }
};

// for recruiter
export const updateCompany = async (req, res, next) => {
  try {
    const {
      name,
      description,
      website,
      location,
      address,
      taxCode,
      noe,
      yoe,
      field,
    } = req.body;

    const files = req.files; // req.files là một object chứa các file được upload

    // kiểm tra taxCode có bị trùng không
    const checkTaxCode = await Company.findOne({
      taxCode,
      _id: { $ne: req.params.id }, // loại trừ công ty hiện tại
    });
    if (checkTaxCode) {
      return res.status(400).json({
        message: "Duplicate business license.",
        success: false,
      });
    }

    // Upload logo nếu có
    let logo = null;
    if (files?.logo?.length) {
      const fileUri = getDataUri(files.logo[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      logo = uploadRes.secure_url;
    }

    // Upload business license nếu có
    let businessLicense = null;
    if (files?.businessLicense?.length) {
      const fileUri = getDataUri(files.businessLicense[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      businessLicense = uploadRes.secure_url;
    }

    const slug = generateCompanySlug(name, location, taxCode);

    const updateData = {
      name,
      slug: slug,
      description,
      website,
      location,
      address,
      taxCode,
      noe, // number of employees
      yoe, // years of experience
      field, // field of work
    };

    if (logo) {
      updateData.logo = logo;
    }

    if (businessLicense) {
      updateData.businessLicense = businessLicense;
    }

    // Kiểm tra xem công ty có tồn tại
    const existCompany = await Company.findById(req.params.id);
    if (!existCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    if (existCompany.userId.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to update this company.",
        success: false,
      });
    }

    await Company.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Company information updated.", success: true });
  } catch (error) {
    next(error);
  }
};

// for recruiter
export const deleteCompany = async (req, res, next) => {
  // Find all jobs under this company
  const companyId = req.params.id;

  try {
    const existCompany = await Company.findById(companyId);
    if (!existCompany) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    if (existCompany.userId.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to delete this company.",
        success: false,
      });
    }

    // Find all jobs of this company
    const jobs = await Job.find({ company: companyId });
    const jobIds = jobs.map((job) => job._id);

    // Delete applications related to those jobs
    if (jobIds.length > 0) {
      await Application.deleteMany({ job: { $in: jobIds } });
      await Job.deleteMany({ _id: { $in: jobIds } });
    }

    // Delete the company
    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company, related jobs, and applications deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Delete company error:", error);
    return next(error);
  }
};
