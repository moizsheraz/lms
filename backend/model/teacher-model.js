import mongoose, { Schema } from "mongoose";

// Define the teacher schema
const teacherSchema = new Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  username: {
    required: true,
    type: String,
    unique: true,
  },
  bio: {
    type: String,
    required: false,
    default: "",
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  countryCode: {
    type: String,
    required: false,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
    required: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  AdminRights: {
    type: Boolean,
    default: false,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  expertise: {
    type: [String], 
    default: [],   
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "teacher",
  },
  currentSession: { 
    type: String, 
    default: null 
  },
});

// Middleware to update `updatedAt` before saving
teacherSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Teacher model
export const Teacher =
  mongoose.models.Teacher ?? mongoose.model("Teacher", teacherSchema);
