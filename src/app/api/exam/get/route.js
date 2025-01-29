import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Exam } from "../../../../../backend/model/exam-schema";
import { Question } from "../../../../../backend/model/question-model";

const getExamWithQuestionsHandler = async (request) => {
  const { examId } = await request.json();

  if (!examId) {
    return NextResponse.json(
      { message: "Exam ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the exam by ID and populate its questions
    const exam = await Exam.findById(examId).populate("questions");

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Exam fetched successfully",
        exam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching exam with questions:", error);
    return NextResponse.json(
      { message: "Failed to fetch exam" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getExamWithQuestionsHandler);
