// In your API routes (e.g., /pages/api/exams/delete.js)

import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Exam } from "../../../../../../backend/model/exam-schema";

const deleteExamHandler = async (request) => {
  const { examId } = await request.json();

  if (!examId) {
    return NextResponse.json(
      { message: "Exam ID is required" },
      { status: 400 }
    );
  }

  try {
    // Delete the exam by ID
    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      return NextResponse.json(
        { message: "Exam not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Exam deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting exam:", error);
    return NextResponse.json(
      { message: "Failed to delete exam" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(deleteExamHandler);
