import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import slugify from "slugify";

function generateJobSlug(title, companyName, companyLocation, companyId) {
  const titleSlug = slugify(title, { lower: true, strict: true });
  const nameSlug = slugify(companyName, { lower: true, strict: true });
  const locationSlug = slugify(companyLocation, { lower: true, strict: true });
  const idSuffix = companyId.slice(-6);

  return `${titleSlug}-${nameSlug}-${locationSlug}-${idSuffix}`;
}

// for recruiter
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

    // check if recruiter is authorized to create a job for this company
    if (companyDoc.userId.toString() !== recruiterId) {
      return res.status(401).json({
        message: "You are not authorized to create a job for this company.",
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

    const slug = generateJobSlug(
      title,
      companyDoc.name,
      companyDoc.location,
      companyDoc._id.toString()
    );

    // create job
    const job = await Job.create({
      title,
      description,
      slug: slug,
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

// for student
export const getAllJobs = async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
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

// for student
export const getJobBySlug = async (req, res, next) => {
  try {
    const jobBySlug = req.params.slug;
    const job = await Job.findOne({ slug: jobBySlug })
      .populate("company")
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "_id",
        },
      });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// for recruiter
export const getRecruiterJobs = async (req, res, next) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ created_by: recruiterId })
      .populate("company")
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

// for recruiter
export const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    const { title, company, ...otherJobDetails } = req.body;

    const companyDoc = await Company.findById(company);

    const slug = generateJobSlug(
      title,
      companyDoc.name,
      companyDoc.location,
      companyDoc._id.toString()
    );

    // console.log(slug);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    if (job.created_by.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to update this job.",
        success: false,
      });
    }

    const updateData = {
      title,
      slug,
      ...otherJobDetails,
    };

    // console.log("Update Data:", updateData);

    const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
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

// for recruiter
export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    if (job.created_by.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to delete this job.",
        success: false,
      });
    }

    await Job.findByIdAndDelete(jobId);
    return res.status(200).json({
      message: "Job deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const suggestions = async (req, res, next) => {
  try {
    const keyword = (req.query.keyword || "").trim();

    if (!keyword) {
      return res.status(200).json({ suggestions: [], success: true });
    }

    const regexKeyword = new RegExp(keyword, "i");

    // Truy vấn cơ bản (không truy vấn nested field trong $or trước populate)
    const jobs = await Job.find({ status: "active", approval: "approved" })
      .populate({
        path: "company",
        select: "name logo",
      })
      .select("_id title location company")
      .limit(20) // tăng giới hạn để lọc thêm sau populate
      .lean();

    // Lọc lại theo keyword sau khi đã populate
    const filtered = jobs.filter((job) => {
      return (
        regexKeyword.test(job.title) ||
        regexKeyword.test(job.location) ||
        regexKeyword.test(job.company?.name || "")
      );
    });

    const suggestions = filtered.slice(0, 10).map((job) => ({
      id: job._id.toString(),
      title: job.title,
      location: job.location,
      company: job.company
        ? {
            id: job.company._id?.toString?.() || "",
            name: job.company.name,
            logo: job.company.logo,
          }
        : null,
    }));

    return res.status(200).json({ suggestions, success: true });
  } catch (error) {
    console.error("Error in suggestions:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy gợi ý việc làm",
      error: error.message,
      success: false,
    });
  }
};
