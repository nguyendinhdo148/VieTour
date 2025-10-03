import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let accessToken = req.cookies?.accessToken;

    // Nếu không có accessToken thì thử refresh token
    if (!accessToken) {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "No tokens provided",
        });
      }

      // Kiểm tra refreshToken trong DB
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Refresh token not found",
        });
      }

      if (user.refreshTokenExpiry < Date.now()) {
        return res.status(401).json({
          success: false,
          message: "Refresh token expired",
        });
      }

      // Cấp accessToken mới
      accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });

      // Lưu vào cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 15 * 60 * 1000,
      });
    }

    // Verify accessToken
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Access token expired" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Authentication failed" });
  }
};

export const isRecruiter = async (req, res, next) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "You are not authenticated",
        success: false,
      });
    }

    const user = await User.findById(req.id);
    if (user.role !== "recruiter") {
      return res.status(401).json({
        message: "You are not a recruiter",
        success: false,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (!req.id) {
      return res.status(401).json({
        message: "You are not authenticated",
        success: false,
      });
    }

    const user = await User.findById(req.id);
    if (user.role !== "admin") {
      return res.status(401).json({
        message: "You are not a admin",
        success: false,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
