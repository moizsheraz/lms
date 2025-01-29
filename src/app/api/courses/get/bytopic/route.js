import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";

const getCoursesByTopicHandler = async (request) => {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { message: "Topic is required" },
        { status: 400 }
      );
    }

    // Fetch courses that match the specified topic
    const courses = await Course.find({ topic: topic });

    if (courses.length === 0) {
      return NextResponse.json(
        { message: "No courses found for the specified topic" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Courses fetched successfully",
        courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching courses by topic:", error);
    return NextResponse.json(
      { message: "Failed to fetch courses", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getCoursesByTopicHandler);
