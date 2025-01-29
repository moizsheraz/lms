import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
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
  isVerified:{
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

  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course",  
  }],

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
    default: "Admin",
  },

});

adminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export const Admin = mongoose.models.Admin ?? mongoose.model("Admin", adminSchema);
