import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    let accessToken = req.cookies.accessToken;
    /* if (!token) {
      return res.status(401).json({
        message: "You are not authenticated",
        success: false,
      });
    }
    */

    // Nếu access token hết hạn, thử dùng refresh token
    if (!accessToken) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error("No tokens provided");

      // Tự verify và tạo accessToken mới
      const user = await User.findOne({ refreshToken });
      if (!user || user.refreshTokenExpiry < Date.now()) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      accessToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "15m",
      });

      // Set lại cookie accessToken cho client nếu muốn
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
    }
    // const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // if (!decoded) {
    //   return res.status(401).json({
    //     message: "Invalid token",
    //     success: false,
    //   });
    // }
    // req.id = decoded.userId;

    // Verify access token
    const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    next(error);
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
