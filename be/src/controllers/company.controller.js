import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import axios from "axios";
import slugify from "slugify";

function generateCompanySlug(name, location, taxCode) {
  const nameSlug = slugify(name, {
    lower: true,
    strict: true,
  });

  const locationSlug = slugify(location, {
    lower: true,
    strict: true,
  });

  const taxCodeSuffix = taxCode.slice(-6);

  return `${nameSlug}-${locationSlug}-${taxCodeSuffix}`;
}

// ======================================================
// CREATE COMPANY
// ======================================================

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

      // TOẠ ĐỘ TỪ MAP PICKER
      lat,
      lng,
    } = req.body;

    const files = req.files;
    const userId = req.id;

    // ==========================================
    // VALIDATE
    // ==========================================

    if (!name || !location || !address || !taxCode) {
      return res.status(400).json({
        success: false,
        message:
          "Thiếu thông tin bắt buộc",
      });
    }

    // ==========================================
    // CHECK TAX CODE
    // ==========================================

    const existingCompany =
      await Company.findOne({
        taxCode,
      });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Mã số thuế đã tồn tại",
      });
    }

    // ==========================================
    // USER
    // ==========================================

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ==========================================
    // UPLOAD LOGO
    // ==========================================

    let logoUrl = null;

    if (
      files &&
      files.logo &&
      files.logo[0]
    ) {
      try {
        const fileUri = getDataUri(
          files.logo[0]
        );

        const cloudResponse =
          await cloudinary.uploader.upload(
            fileUri.content
          );

        logoUrl = cloudResponse.secure_url;
      } catch (error) {
        console.error(
          "Logo upload error:",
          error
        );

        return res.status(500).json({
          success: false,
          message:
            "Lỗi upload logo",
        });
      }
    }

    // ==========================================
    // UPLOAD LICENSE
    // ==========================================

    let licenseUrl = null;

    if (
      files &&
      files.businessLicense &&
      files.businessLicense[0]
    ) {
      try {
        const fileUri = getDataUri(
          files.businessLicense[0]
        );

        const cloudResponse =
          await cloudinary.uploader.upload(
            fileUri.content
          );

        licenseUrl =
          cloudResponse.secure_url;
      } catch (error) {
        console.error(
          "License upload error:",
          error
        );

        return res.status(500).json({
          success: false,
          message:
            "Lỗi upload giấy phép kinh doanh",
        });
      }
    }

    // ==========================================
    // UPLOAD FEATURED IMAGES
    // ==========================================

    let featuredImagesUrls = [];

    if (files && files.featuredImages && files.featuredImages.length > 0) {
      for (const file of files.featuredImages) {
        try {
          const fileUri = getDataUri(file);
          const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
          featuredImagesUrls.push(cloudResponse.secure_url);
        } catch (error) {
          console.error("Featured image upload error:", error);
        }
      }
    }

    // ==========================================
    // GEOLOCATION
    // CHỈ LẤY TỪ MAP PICKER
    // ==========================================

    let geolocation = null;

    if (
      lat !== undefined &&
      lng !== undefined &&
      !isNaN(Number(lat)) &&
      !isNaN(Number(lng))
    ) {
      geolocation = {
        type: "Point",

        // MongoDB GeoJSON:
        // [longitude, latitude]
        coordinates: [
          Number(lng),
          Number(lat),
        ],
      };
    }

    console.log(
      "GEOLOCATION:",
      geolocation
    );

    // ==========================================
    // CREATE COMPANY
    // ==========================================

    const company =
      await Company.create({
        name,

        slug: generateCompanySlug(
          name,
          location,
          taxCode
        ),

        description,
        website,
        location,
        address,

        taxCode,

        logo: logoUrl,

        businessLicense:
          licenseUrl,

        featuredImages: featuredImagesUrls,

        noe,
        yoe,
        field,

        email: user.email,

        userId,

        geolocation,

        approval: "pending",
      });

    return res.status(201).json({
      success: true,
      message:
        "Tạo công ty thành công",
      company,
    });
  } catch (error) {
    console.error(
      "CREATE COMPANY ERROR:",
      error
    );

    next(error);
  }
};

// ======================================================
// GET COMPANIES
// ======================================================

export const getCompanies = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.id;

    const companies =
      await Company.find({
        userId,
      });

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET COMPANY BY ID
// ======================================================

export const getCompanyById = async (
  req,
  res,
  next
) => {
  try {
    const company =
      await Company.findById(
        req.params.id
      );

    if (!company) {
      return res.status(404).json({
        success: false,
        message:
          "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET COMPANY DETAILS
// ======================================================

export const getCompanyDetails = async (req, res, next) => {
  try {
    // Tìm và tự động cộng 1 vào trường views
    const company = await Company.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true } 
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    next(error);
  }
};

// ======================================================
// GET JOBS BY COMPANY
// ======================================================

export const getJobByCompany =
  async (req, res, next) => {
    try {
      const company =
        await Company.findOne({
          slug: req.params.slug,
        });

      if (!company) {
        return res.status(404).json({
          success: false,
          message:
            "Company not found",
        });
      }

      const jobs = await Job.find({
        company: company._id,
        status: "active",
        approval: "approved",
      }).populate(
        "company",
        "name logo location"
      );

      return res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// UPDATE COMPANY
// ======================================================

export const updateCompany =
  async (req, res, next) => {
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
        lat,
        lng,
      } = req.body;

      const files = req.files;

      const company =
        await Company.findById(
          req.params.id
        );

      if (!company) {
        return res.status(404).json({
          success: false,
          message:
            "Không tìm thấy công ty",
        });
      }

      let geolocation =
        company.geolocation;

      // Chỉ update khi có map picker mới
      if (
        lat !== undefined &&
        lng !== undefined &&
        !isNaN(Number(lat)) &&
        !isNaN(Number(lng))
      ) {
        geolocation = {
          type: "Point",
          coordinates: [
            Number(lng),
            Number(lat),
          ],
        };
      }

      // Xử lý upload ảnh nổi bật mới nếu có
      let featuredImagesUrls = company.featuredImages;
      if (files && files.featuredImages && files.featuredImages.length > 0) {
        featuredImagesUrls = []; // Xóa ảnh cũ hoặc bạn có thể gộp tùy logic
        for (const file of files.featuredImages) {
          try {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            featuredImagesUrls.push(cloudResponse.secure_url);
          } catch (error) {
            console.error("Featured image upload error:", error);
          }
        }
      }

      const updateData = {
        name,
        description,
        website,
        location,
        address,
        taxCode,
        noe,
        yoe,
        field,
        geolocation,
        featuredImages: featuredImagesUrls
      };

      const updatedCompany =
        await Company.findByIdAndUpdate(
          req.params.id,
          {
            $set: updateData,
          },
          {
            new: true,
          }
        );

      return res.status(200).json({
        success: true,
        message:
          "Cập nhật thành công",
        company: updatedCompany,
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// DELETE COMPANY
// ======================================================

export const deleteCompany =
  async (req, res, next) => {
    try {
      const companyId =
        req.params.id;

      const existCompany =
        await Company.findById(
          companyId
        );

      if (!existCompany) {
        return res.status(404).json({
          success: false,
          message:
            "Company not found",
        });
      }

      if (
        existCompany.userId.toString() !==
        req.id
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Không có quyền",
        });
      }

      const jobs = await Job.find({
        company: companyId,
      });

      const jobIds = jobs.map(
        (job) => job._id
      );

      if (jobIds.length > 0) {
        await Application.deleteMany({
          job: {
            $in: jobIds,
          },
        });

        await Job.deleteMany({
          _id: {
            $in: jobIds,
          },
        });
      }

      await Company.findByIdAndDelete(
        companyId
      );

      return res.status(200).json({
        success: true,
        message:
          "Xóa công ty thành công",
      });
    } catch (error) {
      next(error);
    }
  };

// ======================================================
// NEARBY COMPANIES
// ======================================================

export const getNearbyCompanies =
  async (req, res, next) => {
    try {
      const lat = parseFloat(
        req.query.lat
      );

      const lng = parseFloat(
        req.query.lng
      );

      const radius =
        parseInt(req.query.radius) ||
        5000;

      if (
        isNaN(lat) ||
        isNaN(lng)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Thiếu lat/lng",
        });
      }

      const companies =
        await Company.aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [lng, lat],
              },

              key: "geolocation",

              distanceField:
                "distance",

              maxDistance: radius,

              spherical: true,

              query: {
                approval:
                  "approved",

                "geolocation.type":
                  "Point",

                "geolocation.coordinates":
                  {
                    $exists: true,
                    $size: 2,
                  },
              },
            },
          },

          {
            $sort: {
              distance: 1,
            },
          },
        ]);

      return res.status(200).json({
        success: true,
        count: companies.length,
        companies,
      });
    } catch (error) {
      console.error(
        "NEARBY ERROR:",
        error
      );

      next(error);
    }
  };

export const addCompanyReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const companyId = req.params.id;
    const userId = req.id;
    const files = req.files;

    if (!rating || !comment) return res.status(400).json({ success: false, message: "Nhập sao và bình luận" });

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Không tìm thấy công ty" });

    const user = await User.findById(userId);

    let reviewPhotosUrls = [];
    if (files?.reviewPhotos?.length > 0) {
      for (const file of files.reviewPhotos) {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        reviewPhotosUrls.push(cloudResponse.secure_url);
      }
    }

    const review = {
      user: userId, 
      fullname: user.fullname, 
      avatar: user.profile?.profilePhoto?.url || "",
      rating: Number(rating), 
      comment, 
      photos: reviewPhotosUrls, 
      createdAt: new Date()
    };

    company.reviews.push(review);
    company.numReviews = company.reviews.length;
    company.rating = company.reviews.reduce((acc, item) => item.rating + acc, 0) / company.numReviews;
    await company.save();

    return res.status(201).json({ success: true, message: "Gửi đánh giá thành công", review });
  } catch (error) { next(error); }
};

// ======================================================
// UPDATE REVIEW
// ======================================================
export const updateCompanyReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: companyId, reviewId } = req.params;
    const userId = req.id;
    const files = req.files;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Không tìm thấy công ty" });

    const review = company.reviews.id(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Không tìm thấy đánh giá" });
    if (review.user.toString() !== userId) return res.status(401).json({ success: false, message: "Không có quyền sửa đánh giá này" });

    review.rating = Number(rating) || review.rating;
    review.comment = comment || review.comment;

    // Nếu có upload ảnh mới thì ghi đè ảnh cũ
    if (files?.reviewPhotos?.length > 0) {
      let newPhotos = [];
      for (const file of files.reviewPhotos) {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        newPhotos.push(cloudResponse.secure_url);
      }
      review.photos = newPhotos; 
    }

    // Cập nhật lại sao trung bình
    company.rating = company.reviews.reduce((acc, item) => item.rating + acc, 0) / company.numReviews;
    await company.save();

    return res.status(200).json({ success: true, message: "Cập nhật đánh giá thành công" });
  } catch (error) { next(error); }
};

// ======================================================
// DELETE REVIEW
// ======================================================
export const deleteCompanyReview = async (req, res, next) => {
  try {
    const { id: companyId, reviewId } = req.params;
    const userId = req.id;

    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ success: false, message: "Không tìm thấy công ty" });

    const review = company.reviews.id(reviewId);
    if (!review) return res.status(404).json({ success: false, message: "Không tìm thấy đánh giá" });
    if (review.user.toString() !== userId) return res.status(401).json({ success: false, message: "Không có quyền xóa đánh giá này" });

    company.reviews.pull(reviewId);
    company.numReviews = company.reviews.length;
    company.rating = company.numReviews > 0 ? company.reviews.reduce((acc, item) => item.rating + acc, 0) / company.numReviews : 0;
    await company.save();

    return res.status(200).json({ success: true, message: "Đã xóa đánh giá" });
  } catch (error) { next(error); }
};