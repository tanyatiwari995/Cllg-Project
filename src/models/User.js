import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\+91[1-9][0-9]{9}$/, "Phone must be a valid Indian number starting with +91"], // Valid Indian number starting with +91
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return v === `user${this.phone.replace("+", "")}`; // Username must be 'user' + phone without '+'
        },
        message: 'Username must be "user" followed by the full phone number without the + prefix',
      },
    },
    full_name: {
      type: String,
      required: [true, "Full name is required"],
    },
    password: {
      type: String,
      minlength: 8,
      required: [
        function () {
          return this.role === "vendor";
        },
        "Password is required for vendors",
      ],
    },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "user",
      required: true,
    },
    vendorRequest: {
      status: {
        type: String,
        enum: ["canApply", "pending", "approved"],
        default: "canApply",
      },
      submittedAt: { type: Date },
      phone_whatsapp: { type: String, match: [/^\+91[1-9][0-9]{9}$/, "Valid Indian number"] }, // Indian number with +91
      whatsapp_number: { type: String, match: [/^\+91[1-9][0-9]{9}$/, "Valid Indian number"] }, // Indian number with +91
      category: {
        type: String,
        enum: [
          "Wedding Venues",
          "Photographers",
          "Bridal Makeup",
          "Henna Artists",
          "Bridal Wear",
          "Car Rental",
          "Wedding Cards",
          "Wedding Invitations",
        ],
      },
      brand_icon: { type: String },
      brand_name: { type: String },
      full_name: { type: String },
      email: { type: String, match: [/^\S+@\S+\.\S+$/, "Valid email"] },
      instagram_link: { type: String },
      facebook_link: { type: String },
      booking_email: { type: String, match: [/^\S+@\S+\.\S+$/, "Valid email"] },
      office_address: { type: String },
      website_link: { type: String },
      map_link: { type: String },
      terms_accepted: { type: Boolean, enum: [true] },
      rejectionCount: { type: Number, default: 0 }, // Track rejections for rate-limiting
      lastRejectionTime: { type: Date }, // For cooldown after multiple rejections
    },
    vendorDetails: {
      phone_whatsapp: { type: String, match: [/^\+91[1-9][0-9]{9}$/, "Valid Indian number"] }, // Indian number with +91
      whatsapp_number: { type: String, match: [/^\+91[1-9][0-9]{9}$/, "Valid Indian number"] }, // Indian number with +91
      category: {
        type: String,
        enum: [
          "Wedding Venues",
          "Photographers",
          "Bridal Makeup",
          "Henna Artists",
          "Bridal Wear",
          "Car Rental",
          "Wedding Cards",
          "Wedding Invitations",
        ],
      },
      brand_icon: { type: String },
      brand_name: { type: String },
      full_name: { type: String },
      email: { type: String, match: [/^\S+@\S+\.\S+$/, "Valid email"] },
      instagram_link: { type: String },
      facebook_link: { type: String },
      booking_email: { type: String, match: [/^\S+@\S+\.\S+$/, "Valid email"] },
      office_address: { type: String },
      website_link: { type: String },
      map_link: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
