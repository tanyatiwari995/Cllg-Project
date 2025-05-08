// auth.js
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"
import { Admin } from "../models/Admin.js"
import { User } from "../models/User.js" // use named import if exported as such
import { BlockedUsers } from "../models/BlockedUsers.js" // make sure this is a named export too

export const generateToken = async (id, type, expiresIn = "1h") => {
  let role

  if (type === "admin") {
    const admin = await Admin.findById(id)
    if (!admin) throw new Error("Admin not found")
    role = admin.role
  } else if (type === "user" || type === "vendor") {
    const user = await User.findById(id)
    if (!user) throw new Error("User not found")
    role = user.role
  } else {
    throw new Error("Invalid type for token generation")
  }

  return jwt.sign({ id, role }, JWT_SECRET, { expiresIn })
}

export const generateResetToken = (otpId, expiresIn = "10m") => {
  return jwt.sign({ otpId }, JWT_SECRET, { expiresIn })
}

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded?.id || !decoded?.role) {
      return res.status(401).json({ message: "Invalid token payload" })
    }

    // Check if user is blocked
    if (["user", "vendor"].includes(decoded.role)) {
      const blockedUser = await BlockedUsers.findOne({ userId: decoded.id })
      if (blockedUser) {
        return res.status(403).json({ message: "Your account has been blocked" })
      }
    }

    // Load user/admin from DB
    let entity
    if (["superadmin", "moderator"].includes(decoded.role)) {
      entity = await Admin.findById(decoded.id)
      if (!entity) return res.status(404).json({ message: "Admin not found" })
    } else {
      entity = await User.findById(decoded.id)
      if (!entity) return res.status(404).json({ message: "User not found" })
    }

    req.user = { id: decoded.id, role: decoded.role }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export const verifyResetToken = (req, res, next) => {
  const token = req.cookies?.resetToken

  if (!token) {
    return res.status(401).json({ message: "No reset token provided" })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded?.otpId) {
      return res.status(401).json({ message: "Invalid reset token payload" })
    }

    req.otpId = decoded.otpId
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

// Role checks
export const adminCheck = (req, res, next) => {
  if (!req.user || !["superadmin", "moderator"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: Admins only" })
  }
  next()
}

export const vendorCheck = (req, res, next) => {
  if (!req.user || req.user.role !== "vendor") {
    return res.status(403).json({ message: "Access denied: Vendors only" })
  }
  next()
}

export const userCheck = (req, res, next) => {
  if (!req.user || !["user", "vendor"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: Users only" })
  }
  next()
}
