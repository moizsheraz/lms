import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
  questionImage: {
    type: String,
    default: "default.jpg",
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  hint: {
    type: Schema.Types.Mixed,
    required: false,
  },
  hintImage: {
    type: String,
    default: "default.jpg",  // You can set a default image or leave it empty
  },
  correctIndex: {
    type: Number,
    required: true,
  },
});

export const Question =
  mongoose.models.Question ?? mongoose.model("Question", questionSchema);
