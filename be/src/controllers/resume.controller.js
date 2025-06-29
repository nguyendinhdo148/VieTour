import { Resume } from "../models/resume.model.js";
import fs from "fs";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import { suggestJobsForResume } from "../services/suggestionService.js";

export const createResume = async (req, res, next) => {
  try {
    const { title } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        facebook: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          name: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.id,
      title,
      ...defaultResumeData,
    });

    res.status(201).json({
      newResume,
      message: "Resume created successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ userId: req.id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    next(error);
  }
};

export const getResumeById = async (req, res, next) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId, userId: req.id });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    next(error);
  }
};

export const updateResume = async (req, res, next) => {
  try {
    // console.log(req.body)
    const resumeId = req.params.id;

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId: req.id }, // kiểm tra quyền sở hữu
      { ...req.body, userId: req.id }, // đảm bảo không mất userId
      { new: true }
    );

    if (!updatedResume) {
      return res
        .status(404)
        .json({ message: "Resume not found or you are not authorized" });
    }

    await suggestJobsForResume(updatedResume);

    res.status(200).json(updatedResume);
  } catch (error) {
    next(error);
  }
};

export const uploadResumeImages = async (req, res, next) => {
  try {
    // console.log("uploadResumeImages controller HIT");
    // upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
    //   req,
    //   res,
    //   next,
    //   async (err) => {
    //     if (err) {
    //       return res
    //         .status(400)
    //         .json({ message: "File upload failed", error: err.message });
    //     }

    const resumeId = req.params.id;
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or you are not authorized" });
    }

    const files = req.files;

    // Upload logo nếu có
    let thumbnail = null;
    if (files?.thumbnail?.length) {
      const fileUri = getDataUri(files.thumbnail[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      thumbnail = uploadRes.secure_url;
    }

    // Upload business license nếu có
    let profileImage = null;
    if (files?.profileImage?.length) {
      const fileUri = getDataUri(files.profileImage[0]);
      const uploadRes = await cloudinary.uploader.upload(fileUri.content);
      profileImage = uploadRes.secure_url;
    }

    if (thumbnail) {
      resume.thumbnailLink = thumbnail;
    }

    if (profileImage) {
      resume.profileInfo.profilePreviewUrl = profileImage;
    }

    // const uploadsFolder = path.join(__dirname, "..", "uploads");
    // const baseUrl = `${req.protocol}://${req.get("host")}`;

    // const newThumbnail = req.files.thumbnail?.[0];
    // const newProfileImage = req.files.profileImage?.[0];

    // if (newThumbnail) {
    //   if (resume.thumbnailLink) {
    //     const oldThumbnail = path.join(
    //       uploadsFolder,
    //       path.basename(resume.thumbnailLink)
    //     );
    //     if (fs.existsSync(oldThumbnail)) {
    //       fs.unlinkSync(oldThumbnail);
    //     }
    //   }
    //   resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    // }

    // if (newProfileImage) {
    //   if (resume.profileInfo?.profilePreviewUrl) {
    //     const oldProfile = path.join(
    //       uploadsFolder,
    //       path.basename(resume.profileInfo.profilePreviewUrl)
    //     );
    //     if (fs.existsSync(oldProfile)) {
    //       fs.unlinkSync(oldProfile);
    //     }
    //   }
    //   resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    // }

    const updatedResume = await resume.save();

    // console.log("resume: ", updatedResume);

    res.status(200).json({
      message: "File uploaded successfully",
      thumbnailLink: updatedResume.thumbnailLink,
      profilePreviewUrl: updatedResume.profileInfo.profilePreviewUrl,
      success: true,
    });
    // }
    // );
  } catch (error) {
    next(error);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or you are not authorized" });
    }

    const uploadsFolder = path.join(__dirname, "..", "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (resume.thumbnailLink) {
      const oldThumbnailPath = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }

    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfilePreviewPath = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfilePreviewPath)) {
        fs.unlinkSync(oldProfilePreviewPath);
      }
    }

    const deleted = await Resume.findOneAndDelete({
      _id: resumeId,
      userId: req.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res
      .status(200)
      .json({ message: "Resume deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};
