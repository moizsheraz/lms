import mongoose, { Schema } from "mongoose";

const wrongQuestionSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  studentAnswer: {
    type: String,
    required: true,
  },
  attemptedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Wrong =
  mongoose.models.WrongQuestion ?? mongoose.model("WrongQuestion", wrongQuestionSchema);
