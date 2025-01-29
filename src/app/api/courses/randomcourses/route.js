import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";

const getTopCoursesHandler = async (request) => {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Only GET requests are allowed" },
      { status: 405 }
    );
  }

  try {
    // Fetch top 3 courses based on rating (or another field like popularity)
    const courses = await Course.find()  // You can add filtering if needed
      .sort({ rating: -1 })  // Sort by rating in descending order
      .limit(3);  // Limit the result to 3 courses

    return NextResponse.json(
      { message: "Top courses retrieved successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top courses:", error);
    return NextResponse.json(
      { message: "Failed to retrieve courses" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getTopCoursesHandler);
