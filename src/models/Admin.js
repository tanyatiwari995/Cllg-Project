import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      // Indian numbers must start with +91 and 10 digits starting from 6 to 9
      match: [/^\+91[6-9][0-9]{9}$/, "Phone must be a valid Indian number starting with +91 and 10 digits"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["superadmin", "moderator"],
      default: "superadmin",
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", adminSchema);
