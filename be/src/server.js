import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import aiRoute from "./routes/ai.route.js";
import saveJobRoute from "./routes/saveJob.route.js";
import resumeRoute from "./routes/resume.route.js";
import adminRoute from "./routes/admin.route.js";
import blogRoute from "./routes/blog.route.js";
import mbtiRoute from "./routes/mbti.route.js";
import miRoute from "./routes/mi.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.URL_CLIENT,
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/ai", aiRoute);
app.use("/api/v1/save-job", saveJobRoute);
app.use("/api/v1/resume", resumeRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/mbti", mbtiRoute);
app.use("/api/v1/mi", miRoute);

// error handler
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message:
//       process.env.NODE_ENV === "production"
//         ? "Internal server error"
//         : err.message,
//   });
// });

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
