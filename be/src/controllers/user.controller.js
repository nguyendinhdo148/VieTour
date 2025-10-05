import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const register = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    // check if user is admin
    // if user is admin, no need to check password
    // if user is not admin, check password
    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({
          message: "Email hoặc mật khẩu không đúng",
          success: false,
        });
      }
    }

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const { accessToken, refreshToken } = generateTokens(user._id);

    // Lưu refresh token vào DB
    await User.findByIdAndUpdate(user._id, {
      refreshToken,
      refreshTokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 15 * 60 * 1000, // 15 phút
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  // Kiểm tra refresh token
  const user = await User.findOne({ refreshToken });

  if (!user || user.refreshTokenExpiry < Date.now()) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  // Tạo token mới
  const { accessToken, newRefreshToken } = generateTokens(user._id);

  // Cập nhật refresh token mới
  await User.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken,
    refreshTokenExpiry: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", newRefreshToken)
    .json({ success: true });
};

export const logout = async (req, res, next) => {
  try {
    // return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    //   message: "Logged out successfully.",
    //   success: true,
    // });
    await User.findByIdAndUpdate(req.id, {
      refreshToken: null,
      refreshTokenExpiry: null,
    });

    // Xóa cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/", // rất quan trọng
    }).clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    // cloudinary upload file
    let profileResume = null;
    let profileResumeOriginalName = null;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profileResume = {
          url: cloudResponse.secure_url,
          public_id: cloudResponse.public_id,
        };
        profileResumeOriginalName = req.file.originalname;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(", ");
    }

    const userId = req.id; // middleware authentication

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // update profile
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // allow update bio, skills can empty
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    // delete old resume
    if (profileResume) {
      if (user.profile?.resume?.public_id) {
        await cloudinary.uploader.destroy(user.profile.resume.public_id);
      }
      user.profile.resume = profileResume;
      user.profile.resumeOriginalName = profileResumeOriginalName;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.id; // middleware authentication

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // cloudinary upload file
    let profilePhotoUrl = null;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        profilePhotoUrl = {
          url: cloudResponse.secure_url,
          public_id: cloudResponse.public_id,
        };
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    // delete old avatar
    if (user.profile?.profilePhoto?.public_id) {
      await cloudinary.uploader.destroy(user.profile.profilePhoto.public_id);
    }

    // update profile
    if (profilePhotoUrl) {
      user.profile.profilePhoto = profilePhotoUrl;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Avatar updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Generate reset token and expiry time
    // Hash token to store in the database
    // and send the plain token in the email
    // so that user can use it to reset password
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `VieJobs Support <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "🔒 Reset Your Password - VieJobs",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
              background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
              min-height: 100vh;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              padding: 40px 20px;
              text-align: center;
              background-color: rgba(249, 249, 249, 0.95);
              border-radius: 16px;
              box-shadow:
                0 10px 25px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -2px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(0, 0, 0, 0.02);
              backdrop-filter: blur(10px);
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 30px;
              color: #1a1a1a;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            }
            .logo span {
              background: linear-gradient(45deg, #ff3366, #ff0000);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }
            .title {
              font-size: 24px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 20px 0;
            }
            .description {
              color: #4a5568;
              font-size: 16px;
              margin: 15px 0;
              line-height: 1.5;
            }
            .minutes {
              font-weight: 600;
              color: #2d3748;
            }
            .reset-button {
              background: linear-gradient(135deg, #0066ff 0%, #0052cc 100%);
              color: #000000;
              padding: 12px 28px;
              text-decoration: none;
              border-radius: 8px;
              display: inline-block;
              font-size: 16px;
              font-weight: 600;
              margin: 25px 0;
              transition: all 0.2s ease;
              box-shadow:
                0 4px 6px -1px rgba(0, 102, 255, 0.2),
                0 2px 4px -1px rgba(0, 102, 255, 0.1);
            }
            .reset-button:hover {
              opacity: 0.95;
              transform: translateY(-1px);
              box-shadow:
                0 6px 8px -1px rgba(0, 102, 255, 0.25),
                0 3px 6px -1px rgba(0, 102, 255, 0.15);
              color: #000000;
            }
            .footer {
              color: #4a5568;
              font-size: 14px;
              margin-top: 30px;
            }
            .copyright {
              color: #718096;
              font-size: 14px;
              margin-top: 40px;
            }
            .links {
              margin-top: 10px;
            }
            .links a {
              color: #0066ff;
              text-decoration: none;
              transition: color 0.2s ease;
            }
            .links a:hover {
              color: #0052cc;
              text-decoration: underline;
            }
            .separator {
              color: #cbd5e0;
              margin: 0 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">Vie<span>Jobs</span></div>
            <h1 class="title">🔑 Reset Your Password</h1>
            <p class="description">We received a request to reset your password. Click the button below to continue.</p>
            <p class="description">This link will expire in <span class="minutes">10 minutes</span>.</p>
            <a href="${resetUrl}" class="reset-button">🔗 Reset Password</a>
            <p class="footer">If you didn't request a password reset, please ignore this email or contact our support team.</p>
            <div class="copyright">
              © 2025 VieJobs. All rights reserved.<br>
              <div class="links">
                <a href="${process.env.FRONTEND_URL}">Visit our website</a>
                <span class="separator">|</span>
                <a href="${process.env.FRONTEND_URL}/contact">Contact Support</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required",
        success: false,
      });
    }

    // Hash token
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
        success: false,
      });
    }

    // Hash new password
    // update the user password
    // clear the reset token and expiry from the database
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
