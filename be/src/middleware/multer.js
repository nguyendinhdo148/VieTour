import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory
export const singleUpload = multer({ storage }).single("file"); // Use 'file' as the field name for the file input in the form

// For company logo, business license, featured images, and review photos
export const companyUpload = multer({ storage }).fields([
  { name: "logo", maxCount: 1 },
  { name: "businessLicense", maxCount: 1 },
  { name: "featuredImages", maxCount: 4 }, // Thêm field này để nhận tối đa 4 ảnh nổi bật
  { name: "reviewPhotos", maxCount: 5 }    // Thêm field này để nhận ảnh review từ khách hàng (nếu có)
]);