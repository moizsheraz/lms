import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
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
  },
  password: {
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  countryCode: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  },
  otpExpiresAt: {
    type: Date,
    required: false,
  },
  purchasedCourses: {
    type: [Schema.Types.ObjectId],
    ref: "Course",
    default: [],
  },
  role: {
    type: String,
    default: "student",
  },
  currentSession: { type: String, default: null }
});

export const Student =
  mongoose.models.Student ?? mongoose.model("Student", studentSchema);
