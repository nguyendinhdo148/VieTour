import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { sendMail } from "../services/emailService.js";
import { buildEmailTemplate, buildNewBookingToRecruiterTemplate } from "../services/template.js";
import { User } from "../models/user.model.js";
// for student/customer
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
      })
      .populate({
        path: "company",
        select: "name logo description location", 
      });

    if (!applications || applications.length === 0) {
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

// ==========================================
// ĐÃ SỬA: Lấy tất cả khách hàng (Cả đặt Job + Đặt trực tiếp Company)
// ==========================================
export const getApplicantsForRecruiter = async (req, res, next) => {
  try {
    const userId = req.id;

    // 1. Lấy khách đặt qua Job
    const jobs = await Job.find({ created_by: userId })
      .select("id title")
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
          select: "id fullname email phoneNumber profile.skills profile.bio profile.profilePhoto",
        },
      })
      .populate({
        path: "company",
        select: "id name",
      });

    // 2. Lấy khách đặt trực tiếp vào Company của user này
    const companies = await Company.find({ userId: userId }).select("_id name");
    const companyIds = companies.map(c => c._id);
    
    const companyApplications = await Application.find({
      company: { $in: companyIds }
    }).populate({
      path: "applicant",
      select: "id fullname email phoneNumber profile.skills profile.bio profile.profilePhoto",
    }).populate({
      path: "company",
      select: "id name"
    });

    let applications = [];

    // Nạp data từ Job
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

    // Nạp data từ đặt trực tiếp Company
    companyApplications.forEach((app) => {
      applications.push({
        ...app.toObject(),
      });
    });

    // Sắp xếp trạng thái ưu tiên
    const statusPriority = { pending: 1, accepted: 2, rejected: 3 };

    applications.sort((a, b) => {
      const statusA = statusPriority[a.status] || 99;
      const statusB = statusPriority[b.status] || 99;
      if (statusA !== statusB) return statusA - statusB;
      return new Date(b.createdAt) - new Date(a.createdAt); // Xếp mới nhất lên đầu
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

    // Populate thêm thông tin userId (chủ doanh nghiệp) từ company
    const application = await Application.findOne({ _id: applicationId })
      .populate("applicant")
      .populate({
        path: "company",
        populate: {
          path: "userId",
          select: "email"
        }
      }) 
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

    // Lấy thông tin user (quản lý) đang thực hiện thao tác duyệt
    const recruiter = await User.findById(req.id);

    let emailRecruiter = null;
    let jobTitle = "Đặt bàn tự do";
    let companyName = "";
    let companyLogo = "";
    let jobDetailUrl = "";

    if (application.job) {
      const job = await Job.findById(application.job);
      if (job.created_by.toString() !== req.id) {
        return res.status(401).json({
          message: "You are not authorized to update this application.",
          success: false,
        });
      }
      jobTitle = application.job.title;
      companyName = application.job.company?.name;
      companyLogo = application.job.company?.logo;
      emailRecruiter = application.job.created_by?.email || recruiter?.email;
      jobDetailUrl = `${process.env.URL_CLIENT}/job/detail/${job.slug}`;
    } else if (application.company) {
      companyName = application.company.name;
      companyLogo = application.company.logo;
      jobDetailUrl = `${process.env.URL_CLIENT}/company/${application.company._id}`;
      
      // FIX LỖI EMAIL NULL: Lấy email của công ty, hoặc email chủ công ty, hoặc email người đang duyệt
      emailRecruiter = application.company.email || application.company.userId?.email || recruiter?.email || "cskh@viejobs.com";
    }

    application.status = status.toLowerCase();
    await application.save();

    const applicantEmail = application.applicant?.email;
    const applicantName = application.applicant?.fullname;
    const bookingDate = application.bookingDate
      ? new Date(application.bookingDate).toLocaleDateString("vi-VN")
      : null;

    const { subject, html } = buildEmailTemplate({
      type: status.toLowerCase(),
      applicantName,
      jobTitle,
      companyName,
      companyLogo,
      emailRecruiter,
      jobDetailUrl,
      bookingDate,
    });

    if (subject && html) {
      await sendMail({
        to: applicantEmail,
        subject,
        html,
        replyTo: emailRecruiter,
      });
    }

    return res.status(200).json({
      message: "Application status updated.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ĐÃ SỬA: Gộp thống kê (Cả Job + Company)
// ==========================================
export const getOverview = async (req, res, next) => {
  try {
    const userId = req.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // 1. Lấy applications từ Jobs
    const jobs = await Job.find({ created_by: userId });
    const jobApplicationIds = jobs.flatMap((job) => job.applications);

    // 2. Lấy applications đặt trực tiếp vào Company của user này
    const companies = await Company.find({ userId: userId }).select("_id");
    const companyIds = companies.map(c => c._id);
    const companyApplications = await Application.find({ company: { $in: companyIds } }).select("_id");
    const directApplicationIds = companyApplications.map(app => app._id);

    // 3. Gộp 2 loại ID lại để query một lần
    const allApplicationIds = [...jobApplicationIds, ...directApplicationIds];

    const applications = await Application.find({
      _id: { $in: allApplicationIds },
    })
      .populate({
        path: "applicant",
        select: "fullname email profile.profilePhoto",
      })
      .populate({
        path: "job",
        select: "title location jobType salary experienceLevel applications company",
      })
      .populate({
        path: "company",
        select: "name"
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
        upcomingInterviews: 0, 
        yesterdayUpcomingInterviews: 0, 
        recentApplications,
        popularJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    const { bookingDate, numberOfGuests } = req.body;

    if (!jobId || !bookingDate || !numberOfGuests || numberOfGuests < 1) {
      return res.status(400).json({
        message: "Dữ liệu đặt bàn không hợp lệ.",
        success: false,
      });
    }

    const date = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(date.getTime()) || date < today) {
      return res.status(400).json({
        message: "Ngày đặt bàn không hợp lệ hoặc nằm trong quá khứ.",
        success: false,
      });
    }

    const existApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existApplication) {
      return res.status(400).json({ message: "Bạn đã đăng ký/đặt bàn cho chương trình này rồi.", success: false });
    }

    const job = await Job.findById(jobId).populate('created_by', 'fullname email').populate('company', 'name');
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy chương trình.", success: false });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      bookingDate: bookingDate,
      numberOfGuests: numberOfGuests,
    });

    job.applications.push(newApplication._id);
    await job.save();

    // ============================================
    // GỬI EMAIL CHO DOANH NGHIỆP THÔNG BÁO CÓ KHÁCH
    // ============================================
    try {
      const applicantUser = await User.findById(userId);
      const bookingDateStr = new Date(bookingDate).toLocaleString("vi-VN", {
        hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric"
      });

      const { subject, html } = buildNewBookingToRecruiterTemplate({
        recruiterName: job.created_by?.fullname,
        applicantName: applicantUser.fullname,
        applicantEmail: applicantUser.email,
        applicantPhone: applicantUser.phoneNumber,
        bookingDate: bookingDateStr,
        numberOfGuests: numberOfGuests,
        jobTitle: job.title,
        companyName: job.company?.name,
        dashboardUrl: `${process.env.URL_CLIENT}/recruiter/candidates` // Sửa đường dẫn nếu cần
      });

      if (job.created_by?.email) {
        await sendMail({ to: job.created_by.email, subject, html });
      }
    } catch (mailErr) {
      console.log("Lỗi gửi email cho doanh nghiệp (Job):", mailErr);
      // Không throw error để khách vẫn đặt bàn thành công dù lỗi mail
    }

    return res.status(201).json({
      message: "Đặt bàn thành công.",
      success: true,
      data: {
        applicationId: newApplication._id,
        bookingDate: newApplication.bookingDate,
        numberOfGuests: newApplication.numberOfGuests,
      },
    });
  } catch (error) {
    next(error);
  }
};

// for student/customer - Đặt trực tiếp Công ty (Venue)
export const applyCompany = async (req, res, next) => {
  try {
    const userId = req.id;
    const companyId = req.params.id;
    const { bookingDate, numberOfGuests } = req.body;

    if (!companyId || !bookingDate || !numberOfGuests || numberOfGuests < 1) {
      return res.status(400).json({
        message: "Dữ liệu đặt bàn không hợp lệ.",
        success: false,
      });
    }

    const date = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    if (isNaN(date.getTime()) || date < today) {
      return res.status(400).json({
        message: "Ngày đặt bàn không hợp lệ hoặc nằm trong quá khứ.",
        success: false,
      });
    }

    const existApplication = await Application.findOne({ company: companyId, applicant: userId, bookingDate: bookingDate });
    if (existApplication) {
      return res.status(400).json({ message: "Bạn đã đặt bàn tại địa điểm này vào ngày được chọn rồi.", success: false });
    }

    // Populate userId để lấy thông tin Chủ doanh nghiệp (Email, tên)
    const company = await Company.findById(companyId).populate('userId', 'fullname email');
    if (!company) {
      return res.status(404).json({ message: "Không tìm thấy địa điểm/công ty.", success: false });
    }

    const newApplication = await Application.create({
      company: companyId, 
      applicant: userId,
      bookingDate: bookingDate,
      numberOfGuests: numberOfGuests,
    });

    // ============================================
    // GỬI EMAIL CHO DOANH NGHIỆP THÔNG BÁO CÓ KHÁCH
    // ============================================
    try {
      const applicantUser = await User.findById(userId);
      const bookingDateStr = new Date(bookingDate).toLocaleString("vi-VN", {
        hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric"
      });

      const { subject, html } = buildNewBookingToRecruiterTemplate({
        recruiterName: company.userId?.fullname,
        applicantName: applicantUser.fullname,
        applicantEmail: applicantUser.email,
        applicantPhone: applicantUser.phoneNumber,
        bookingDate: bookingDateStr,
        numberOfGuests: numberOfGuests,
        jobTitle: "Đặt bàn tự do (Không qua chương trình)",
        companyName: company.name,
        dashboardUrl: `${process.env.URL_CLIENT}/recruiter/candidates`
      });

      if (company.userId?.email) {
        await sendMail({ to: company.userId.email, subject, html });
      }
    } catch (mailErr) {
      console.log("Lỗi gửi email cho doanh nghiệp (Company):", mailErr);
    }

    return res.status(201).json({
      message: "Đặt bàn tại địa điểm thành công.",
      success: true,
      data: {
        applicationId: newApplication._id,
        bookingDate: newApplication.bookingDate,
        numberOfGuests: newApplication.numberOfGuests,
      },
    });
  } catch (error) {
    next(error);
  }
};