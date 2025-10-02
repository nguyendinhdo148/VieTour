export const API =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/v1"
    : "https://vie-jobs-d56h.vercel.app/api/v1";
