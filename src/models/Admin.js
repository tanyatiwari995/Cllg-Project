import mongoose from "mongoose"

const adminSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [/^\+91[0-4][0-9]{8}$/, "Phone must be a valid Indian number starting with +91"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["superadmin", "moderator"],
      required: [true, "Role is required"],
      default: "superadmin",
    },
  },
  { timestamps: true },
)

export const Admin = mongoose.model("Admin", adminSchema)