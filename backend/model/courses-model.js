import mongoose, { Schema } from "mongoose";

const studentEnrollmentSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  availableUntil: {
    type: Date,
    required: true,
  },
  remainingDays: {
    type: Number,
    default: 0,
  },
});

const courseSchema = new Schema({
  courseImage: {
    type: String,
    default:"public/courses/default.jpg"
  },
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  subtopics: [
    {
      type: String,
    },
  ],
  subsubtopics: [
    {
      type: String,
    },
  ],
  theoreticalMaterial: [
    {
      name: {
        type: String,
       
      },
      link: {
        type: String,
      
      },
    },
  ], 
  auxiliaryMaterial: [
    {
      name: {
        type: String,
      
      },
      link: {
        type: String,
      
      },
    },
  ],
  summaries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Summary",
    },
  ], 
  isActive: {
    type: Boolean,
    default: true,
  },
  exam: [
    {  
      type: Schema.Types.ObjectId,
      ref: "Exam",
    },
  ], 
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  students: [studentEnrollmentSchema], 
  reviews: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      reviewText: {
        type: String,
      },
      reviewDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  availableFor: { type: Number, required: true,default:3}, // This 3 means 3 months :)
},{ timestamps: true });

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
