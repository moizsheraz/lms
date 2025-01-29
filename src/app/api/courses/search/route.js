import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";

const getCoursesByKeywordHandler = async (request) => {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests are allowed" },
      { status: 405 }
    );
  }

  const { keyword } = await request.json(); // Get keyword from request body

  if (!keyword) {
    return NextResponse.json(
      { message: "Keyword is required" },
      { status: 400 }
    );
  }

  try {
    let courses;

    if (keyword === "all") {
      // If keyword is "all", fetch all active courses
      courses = await Course.find({ isActive: true });
    } else {
      // Search by name or courseId
      courses = await Course.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } }, // Case-insensitive name search
          { courseId: { $regex: keyword, $options: "i" } }, // Case-insensitive courseId search
        ],
        isActive: true, // Ensure the course is active
      });
    }

    return NextResponse.json(
      { message: "Courses retrieved successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return NextResponse.json(
      { message: "Failed to retrieve courses" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getCoursesByKeywordHandler);
