import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import { auth } from "../../../../../../auth";
import { Student } from "../../../../../../../backend/model/student-model";
import { Course } from "../../../../../../../backend/model/courses-model";

const getCourseSummaryHandler = async (request, { params }) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const student = await Student.findOne({ email: user.email }).lean();
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId)
      .populate({
        path: "summaries",
        select: "likes",
      })
      .lean()
      .exec();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const completedSummariesCount = course.summaries.filter((summary) =>
      summary.likes.some((like) => like.toString() === student._id.toString())
    ).length;

    const totalSummariesCount = course.summaries.length;

    return NextResponse.json(
      {
        message: "Course summary count retrieved successfully",
        completedSummariesCount,
        totalSummariesCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve course summary count", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getCourseSummaryHandler);
