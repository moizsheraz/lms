import mongoose, { Schema } from "mongoose";

// Define the Newsletter schema
const newsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate emails
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email validation
    },
  },
  { timestamps: true }
);

export const Newsletter =
  mongoose.models.Newsletter ?? mongoose.model("Newsletter", newsletterSchema);
