import mongoose, { Schema } from "mongoose";

const summarySchema = new Schema({
  summaryTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "Student",
    default: [],
  },
});

export const Summary =
  mongoose.models.Summary ?? mongoose.model("Summary", summarySchema);
