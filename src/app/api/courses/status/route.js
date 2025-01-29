import { NextResponse } from "next/server";
import { Course } from "../../../../../backend/model/courses-model";
import connectDb from "../../../../../backend/middleware/db";
import { auth } from "@/auth";

const updateCourseStatusHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User  not authenticated" },
      { status: 401 }
    );
  }

  const data = await request.json();
  const { courseId, isActive } = data;

  if (typeof isActive !== "boolean") {
    return NextResponse.json(
      { message: "isActive must be a boolean value" },
      { status: 400 }
    );
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Update the isActive status
    course.isActive = isActive;
    await course.save();

    return NextResponse.json(
      { message: "Course status updated successfully", course },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating course status:", error);
    return NextResponse.json(
      { message: "Failed to update course status", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(updateCourseStatusHandler);
