import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Exam } from "../../../../../../backend/model/exam-schema";
import { Question } from "../../../../../../backend/model/question-model";

const fetchExamQuestionsHandler = async (request) => {
  const { examId } = await request.json();

  if (!examId) {
    return NextResponse.json(
      { message: "Exam ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the exam questions by exam ID
    const exam = await Exam.findById(examId).populate("questions"); // Populate questions
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ questions: exam.questions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching exam questions:", error);
    return NextResponse.json(
      { message: "Failed to fetch exam questions" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(fetchExamQuestionsHandler);
