import mongoose, { Schema } from "mongoose";

const examSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  attempts: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
      answers: [
        {
          questionId: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
      dateTaken: {
        type: Date,
        default: Date.now,
      },
      startTime: {
        type: Date,
        // required: true,
        default: Date.now,
      },
      timeTaken: {
        type: Number,
        required: true,
      },
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

export const Exam = mongoose.models.Exam ?? mongoose.model("Exam", examSchema);
