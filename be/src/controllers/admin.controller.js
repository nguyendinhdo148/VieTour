import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { Application } from "../models/application.model.js";
import { Blog } from "../models/blog.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password -__v -refreshToken -refreshTokenExpiry"
    );

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber } = req.body;
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirements,
      benefits,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
      category,
    } = req.body;

    const recruiterId = req.id; // middleware authentication

    // console.log(req.body);

    if (
      !title ||
      !description ||
      !requirements ||
      !benefits ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !company ||
      !category
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    // check if company exists
    const companyDoc = await Company.findById(company);
    if (!companyDoc) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // check if job already exists with this title for this company by recruiter
    const jobExists = await Job.findOne({ title });
    if (jobExists) {
      return res.status(400).json({
        message: "Job already exists.",
        success: false,
      });
    }

    // create job
    const job = await Job.create({
      title,
      description,
      requirements,
      benefits,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company,
      category,
      created_by: recruiterId,
    });

    return res.status(201).json({
      message: "Job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Job updated successfully.",
      job: updatedJob,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }

    return res
      .status(200)
      .json({ companies, success: true, count: companies.length });
  } catch (error) {
    next(error);
  }
};

export const createCompanyAdmin = async (req, res, next) => {
  try {
    const { name, description, website, location, taxCode } = req.body;
    const files = req.files;

    // Kiểm tra tên công ty trùng
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

    company = await Company.create({
      name,
      description,
      website,
      location,
      taxCode,
      logo,
      businessLicense,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company created successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { name, description, website, location, taxCode } = req.body;

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

    const updateData = { name, description, website, location, taxCode };

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

export const getAdminOverview = async (req, res, next) => {
  try {
    // Mốc thời gian hôm nay và hôm qua
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 1. Lấy tất cả jobs
    const jobs = await Job.find().lean();

    // 2. Thống kê số lượng jobs
    const activeJobs = jobs.filter((job) => job.status === "active").length;

    const yesterdayActiveJobs = jobs.filter((job) => {
      const createdAt = new Date(job.createdAt);
      return (
        job.status === "active" && createdAt < today && createdAt >= yesterday
      );
    }).length;

    // 3. Danh sách 8 người dùng mới nhất
    const recentUsers = await User.find({ role: { $ne: "admin" } })
      .sort({ createdAt: -1 })
      .limit(8)
      .select("fullname email createdAt profile.profilePhoto")
      .lean();

    // 4. Các job phổ biến nhất (nhiều ứng viên nhất)
    const popularJobs = jobs
      .sort(
        (a, b) => (b.applications?.length || 0) - (a.applications?.length || 0)
      )
      .slice(0, 3);

    // 5. Các thống kê tổng quan
    const totalUsers = await User.countDocuments({ role: { $ne: "admin" } });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();

    // 6. Placeholder (nếu sau này muốn thêm logic phỏng vấn)
    const upcomingInterviews = 0;
    const yesterdayUpcomingInterviews = 0;

    // 7. Trả kết quả
    return res.status(200).json({
      success: true,
      data: {
        activeJobs,
        yesterdayActiveJobs,
        upcomingInterviews,
        yesterdayUpcomingInterviews,
        recentUsers,
        popularJobs,
        totalUsers,
        totalCompanies,
        totalJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const approveJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approval, approvalNote } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy công việc",
      });
    }

    job.approval = approval;
    job.approvalNote = approvalNote || "";
    await job.save();

    res.status(200).json({
      success: true,
      message:
        approval === "approved" ? "Đã duyệt công việc" : "Đã từ chối công việc",
    });
  } catch (error) {
    next(error);
  }
};

export const approveBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { approval, approvalNote } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    blog.approval = approval;
    blog.approvalNote = approvalNote || "";
    await blog.save();

    res.status(200).json({
      success: true,
      message:
        approval === "approved" ? "Đã duyệt bài viết" : "Đã từ chối bài viết",
    });
  } catch (error) {
    next(error);
  }
};
