import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    website: {
      type: String,
    },

    location: {
      type: String,
    },

    address: {
      type: String,
    },

    logo: {
      type: String,
    },

    noe: {
      type: String,
    },

    yoe: {
      type: String,
    },

    field: {
      type: String,
    },

    businessLicense: {
      type: String,
    },

    taxCode: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    approval: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    approvalNote: {
      type: String,
      default: "",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ============================================
    // THÊM: HÌNH ẢNH NỔI BẬT (3-4 TẤM)
    // ============================================
    featuredImages: [
      {
        type: String,
      }
    ],

    // ============================================
    // THÊM: HỆ THỐNG ĐÁNH GIÁ (SAO & BÌNH LUẬN)
    // ============================================
    rating: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        fullname: { type: String },
        avatar: { type: String },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        photos: [{ type: String }], // Hình ảnh thực tế khách hàng chụp
        createdAt: { type: Date, default: Date.now }
      }
    ],

    // ============================================
    // GEOLOCATION
    // ============================================
    geolocation: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },

      coordinates: {
        type: [Number], // [lng, lat]
        required: false,

        validate: {
          validator: function (value) {
            // cho phép undefined/null
            if (!value) return true;

            return (
              Array.isArray(value) &&
              value.length === 2 &&
              value.every(
                (n) =>
                  typeof n === "number" &&
                  !Number.isNaN(n)
              )
            );
          },

          message:
            "Coordinates must be [lng, lat]",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// ============================================
// 2DSPHERE INDEX
// ============================================
companySchema.index({
  geolocation: "2dsphere",
});

export const Company = mongoose.model(
  "Company",
  companySchema
);