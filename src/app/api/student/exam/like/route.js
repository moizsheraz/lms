import { NextResponse } from "next/server";
import { Exam } from "../../../../../../backend/model/exam-schema";
import connectDb from "../../../../../../backend/middleware/db";
import { auth } from "@/auth";
import { Student } from "../../../../../../backend/model/student-model";

const likeExamHandler = async (request) => {
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

    // Check if the student has already liked the exam
    const hasLiked = exam.likes.includes(student._id);

    if (hasLiked) {
      // Remove the like
      exam.likes.pull(student._id);
    } else {
      // Add the like
      exam.likes.push(student._id);
    }

    await exam.save();

    return NextResponse.json(
      {
        message: hasLiked ? "Like removed" : "Exam liked",
        exam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking exam:", error);
    return NextResponse.json(
      { message: "Failed to like/unlike exam" },
      { status: 500 }
    );
  }
};


export const POST = connectDb(likeExamHandler);
