export const API =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/v1"
    : "https://viejobs-be.onrender.com/api/v1";
