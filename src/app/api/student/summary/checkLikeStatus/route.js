import { NextResponse } from "next/server";
import { Student } from "../../../../../../backend/model/student-model";
import connectDb from "../../../../../../backend/middleware/db";
import { Summary } from "../../../../../../backend/model/summary-model";
import { auth } from "@/auth";

const checkLikeStatusHandler = async (request) => {
  const { summaryId } = await request.json();

  if (!summaryId) {
    return NextResponse.json(
      { message: "Summary ID is required" },
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

    // Find the summary by its ID
    const summary = await Summary.findById(summaryId);

    if (!summary) {
      return NextResponse.json(
        { message: "Summary not found" },
        { status: 404 }
      );
    }

    // Check if the student has liked the summary
    const hasLiked = summary.likes.includes(student._id);

    return NextResponse.json(
      {
        message: hasLiked ? "Summary liked by student" : "Summary not liked by student",
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

export const POST = connectDb(checkLikeStatusHandler);
