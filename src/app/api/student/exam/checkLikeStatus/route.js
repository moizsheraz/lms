import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Exam } from "../../../../../../backend/model/exam-schema";
import { auth } from "@/auth";
import { Student } from "../../../../../../backend/model/student-model";

const checkExamLikeStatusHandler = async (request) => {
  const { examId } = await request.json();

  if (!examId) {
    return NextResponse.json(
      { message: "Exam ID is required" },
      { status: 400 }
    );
  }

  try {
    // Authenticate the user
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Find the student by their email
    const student = await Student.findOne({ email: user.email }).lean();

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Find the exam by its ID
    const exam = await Exam.findById(examId);

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    // Check if the student has liked the exam
    const hasLiked = exam.likes.includes(student._id);

    return NextResponse.json(
      {
        message: hasLiked
          ? "Exam liked by student"
          : "Exam not liked by student",
        hasLiked,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking like status:", error);
    return NextResponse.json(
      { message: "Failed to check like status" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(checkExamLikeStatusHandler);
