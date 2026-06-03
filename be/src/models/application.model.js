import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: { 
      // Vẫn giữ tên 'job' làm reference, nhưng hiểu đây là 'Chương trình/Dịch vụ'
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: false, // <-- CHUYỂN THÀNH FALSE (Không bắt buộc)
    },
    company: {
      // THÊM TRƯỜNG MỚI: Để lưu địa điểm nếu khách đặt thẳng vào công ty
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: false, // <-- Không bắt buộc vì có thể họ chỉ đặt Job
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    bookingDate: {
      type: Date,
      required: true, // Bắt buộc phải có ngày đến
      description: "Ngày khách hàng sẽ đến/đặt bàn",
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: [1, "Số lượng khách tối thiểu là 1"],
      default: 1,
      description: "Số lượng khách tham gia",
    }
  },
  { timestamps: true }
);

// Thêm một validation nhỏ (Tùy chọn): Đảm bảo phải có ít nhất 1 trong 2 trường (job hoặc company)
applicationSchema.pre('validate', function(next) {
  if (!this.job && !this.company) {
    next(new Error('Phải cung cấp ID Chương trình (Job) hoặc ID Doanh nghiệp (Company).'));
  } else {
    next();
  }
});

export const Application = mongoose.model("Application", applicationSchema);