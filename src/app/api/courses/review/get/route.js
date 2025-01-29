import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import {Student} from "../../../../../../backend/model/student-model";

const getReviewsHandler = async (request) => {
  const { courseId } = await request.json();

  if (!courseId) {
    return NextResponse.json(
      { message: "Course ID is required" },
      { status: 400 }
    );
  }

  try {
    const course = await Course.findById(courseId).populate("reviews.student", "username email");

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const reviews = course.reviews;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(2) : 0;

    return NextResponse.json(
      {
        message: "Reviews retrieved successfully",
        reviews,
        averageRating: parseFloat(averageRating),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    return NextResponse.json(
      { message: "Failed to retrieve reviews" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getReviewsHandler);
