import { NextResponse } from "next/server";
import { Summary } from "../../../../../../backend/model/summary-model";
import { Student } from "../../../../../../backend/model/student-model";
import connectDb from "../../../../../../backend/middleware/db";
import { auth } from "@/auth";

const likeSummaryHandler = async (request) => {
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

    // Check if the student has already liked the summary
    const hasLiked = summary.likes.includes(student._id);

    if (hasLiked) {
      // If already liked, remove the like (unlike)
      summary.likes.pull(student._id);
    } else {
      // Otherwise, add the like
      summary.likes.push(student._id);
    }

    await summary.save();

    return NextResponse.json(
      {
        message: hasLiked ? "Like removed" : "Summary liked",
        summary,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking summary:", error);
    return NextResponse.json(
      { message: "Failed to like/unlike summary" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(likeSummaryHandler);
