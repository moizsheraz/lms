import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import multer from "multer";
import connectDb from "../../../../../backend/middleware/db";
import { Exam } from "../../../../../backend/model/exam-schema";
import { Question } from "../../../../../backend/model/question-model";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { Course } from "../../../../../backend/model/courses-model";
import { auth } from "../../../../auth";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "questionImage" ? "questionImages" : "hintImages";
    const dir = path.join("./public", folder);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false
  },
};

const createExamHandler = async (req) => {
  try {
    await runMiddleware(req, null, upload.any());

    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const teacher = await Teacher.findOne({ email: user.email });
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found", user: user.email },
        { status: 404 }
      );
    }

    const { exams } = req.body;

    if (!Array.isArray(exams) || exams.length === 0) {
      return NextResponse.json(
        { message: "Missing or invalid exam data" },
        { status: 400 }
      );
    }

    const createdExams = [];

    // Process each exam
    for (const examData of exams) {
      const { courseId, name, questions } = examData;

      if (
        !courseId ||
        !name ||
        !Array.isArray(questions) ||
        questions.length === 0
      ) {
        return NextResponse.json(
          { message: "Missing or invalid exam data" },
          { status: 400 }
        );
      }

      const course = await Course.findOne({ _id: courseId });
      if (!course) {
        return NextResponse.json(
          { message: "Course not found or access denied" },
          { status: 404 }
        );
      }

      if (!Array.isArray(course.exam)) {
        course.exam = [];
      }

      const questionIds = [];
      for (const questionData of questions) {
        const { question, ...rest } = questionData;

        const questionImage = req.files.find(
          (file) => file.fieldname === "questionImage"
        );
        const hintImage = req.files.find(
          (file) => file.fieldname === "hintImage"
        );

        const mappedQuestionData = {
          ...rest,
          questionText: question,
          questionImage: questionImage ? `/questionImages/${questionImage.filename}` : null,
          hintImage: hintImage ? `/hintImages/${hintImage.filename}` : null,
        };

        if (!mappedQuestionData.questionText) {
          return NextResponse.json(
            { message: "Question text is required" },
            { status: 400 }
          );
        }

        const newQuestion = new Question(mappedQuestionData);
        await newQuestion.save();
        questionIds.push(newQuestion._id);
      }

      const newExam = new Exam({ name, questions: questionIds });
      await newExam.save();

      course.exam.push(newExam._id);
      await course.save();

      createdExams.push(newExam);
    }

    return NextResponse.json(
      {
        message:
          "Exams and questions created successfully and linked to courses",
        exams: createdExams,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating exam or questions:", error);
    return NextResponse.json(
      {
        message: "Failed to create exam or questions",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createExamHandler);