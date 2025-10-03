import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { sendMail } from "../services/emailService.js";
import { buildEmailTemplate } from "../services/template.js";

// for student
export const applyJob = async (req, res, next) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }
    // check if the user has already applied for the job
    const existApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existApplication) {
      return res.status(400).json({
        message: "You have applied for this job.",
        success: false,
      });
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// for student
export const getAppliedJobs = async (req, res, next) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        select: "-_id -created_by -createdAt -updatedAt -__v -applications",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          select: "-_id -userId -createdAt -updatedAt -__v",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications) {
      return res.status(404).json({
        message: "Applications not found.",
        success: false,
      });
    }

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// for recruiter
export const getApplicants = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        select: "-_id -password -role -createdAt -updatedAt -__v",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // check if the user is authorized to view this job
    if (job.created_by.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to view this job.",
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

export const getApplicantsForRecruiter = async (req, res, next) => {
  try {
    const userId = req.id;
    const jobs = await Job.find({ created_by: userId })
      .select("id title")
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select:
            "id fullname email phoneNumber profile.skills profile.bio profile.profilePhoto profile.resume profile.resumeOriginalName",
        },
      })
      .populate({
        path: "company",
        select: "id name",
      });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    const applications = [];
    jobs.forEach((job) => {
      job.applications.forEach((app) => {
        applications.push({
          ...app.toObject(),
          job: {
            _id: job._id,
            title: job.title,
            company: job.company,
          },
        });
      });
    });

    const statusPriority = { pending: 1, accepted: 2, rejected: 3 };

    applications.sort((a, b) => {
      const statusA = statusPriority[a.status] || 99;
      const statusB = statusPriority[b.status] || 99;
      if (statusA !== statusB) return statusA - statusB;
      // Nếu cùng status thì mới so sánh createdAt (ưu tiên các ứng viên đã nộp trước)
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// for recruiter
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    if (!applicationId || !status) {
      return res.status(400).json({
        message: "Application id and status are required.",
        success: false,
      });
    }

    const application = await Application.findOne({ _id: applicationId })
      .populate("applicant")
      .populate({
        path: "job",
        populate: [
          {
            path: "company",
            select: "name logo",
          },
          {
            path: "created_by",
            select: "email",
          },
        ],
      });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    const job = await Job.findById(application.job);

    // check if the user is authorized to update this application
    if (job.created_by.toString() !== req.id) {
      return res.status(401).json({
        message: "You are not authorized to update this application.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    // Gửi email thông báo
    const applicantEmail = application.applicant?.email;
    const applicantName = application.applicant?.fullname;
    const jobTitle = application.job?.title;
    const companyName = application.job?.company?.name;
    const companyLogo = application.job?.company?.logo;
    const emailRecruiter = application.job?.created_by?.email;

    const jobDetailUrl = `${process.env.URL_CLIENT}/job/detail/${job.slug}`;

    const { subject, html } = buildEmailTemplate({
      type: status.toLowerCase(), // "accepted" hoặc "rejected"
      applicantName,
      jobTitle,
      companyName,
      companyLogo,
      emailRecruiter,
      jobDetailUrl,
    });

    if (subject && html) {
      await sendMail({
        to: applicantEmail,
        subject,
        html,
        replyTo: emailRecruiter,
      });
    }

    // delete application after 1 minute
    // if (status.toLowerCase() === "rejected") {
    //   setTimeout(async () => {
    //     try {
    //       await Application.findByIdAndDelete(applicationId);
    //       console.log(`Application ${applicationId} deleted after 1 minute.`);
    //     } catch (err) {
    //       console.error(`Failed to delete application ${applicationId}:`, err);
    //     }
    //   }, 1 * 60 * 1000);
    // }

    return res.status(200).json({
      message: "Application status updated.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getOverview = async (req, res, next) => {
  try {
    const userId = req.id;

    // Set mốc thời gian hôm nay và hôm qua
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 1. Lấy tất cả jobs của recruiter
    const jobs = await Job.find({ created_by: userId });

    // 2. Lấy tất cả application IDs từ các jobs
    const applicationIds = jobs.flatMap((job) => job.applications);

    // 3. Lấy tất cả applications từ applicationIds
    const applications = await Application.find({
      _id: { $in: applicationIds },
    })
      .populate({
        path: "applicant",
        select: "fullname email profile.profilePhoto",
      })
      .populate({
        path: "job",
        select:
          "title location jobType salary experienceLevel applications company",
      })
      .lean();

    // 4. Tính toán thống kê
    const todayApplications = applications.filter(
      (app) => new Date(app.createdAt).getTime() >= today.getTime()
    ).length;

    const yesterdayApplications = applications.filter((app) => {
      const createdAt = new Date(app.createdAt);
      return createdAt >= yesterday && createdAt < today;
    }).length;

    const activeJobs = jobs.filter((job) => job.status === "active").length;

    // Nếu có status job hôm qua thì lọc theo createdAt, nếu không thì lấy job tạo trước today
    const yesterdayActiveJobs = jobs.filter((job) => {
      const createdAt = new Date(job.createdAt);
      return job.status === "active" && createdAt < today;
    }).length;

    const pendingApplications = applications.filter(
      (app) => app.status === "pending"
    ).length;

    const yesterdayPendingApplications = applications.filter(
      (app) =>
        app.status === "pending" &&
        new Date(app.createdAt) < today &&
        new Date(app.createdAt) >= yesterday
    ).length;

    // 5. Gần đây nhất
    const recentApplications = applications
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 8);

    // 6. Tin nổi bật
    const popularJobs = jobs
      .sort((a, b) => b.applications.length - a.applications.length)
      .slice(0, 3);

    return res.status(200).json({
      success: true,
      data: {
        todayApplications,
        yesterdayApplications,
        activeJobs,
        yesterdayActiveJobs,
        pendingApplications,
        yesterdayPendingApplications,
        upcomingInterviews: 0, // bạn có thể cập nhật sau
        yesterdayUpcomingInterviews: 0, // để frontend dễ tính toán
        recentApplications,
        popularJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};
