import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Teacher } from "../../../../../../backend/model/teacher-model"; 
import { auth } from "../../../../../auth";

const getTeacherCoursesReviewsHandler = async (request, { params }) => {
  try {

    const { teacherId } = params;
    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    // Find the teacher by ID
    const teacher = await Teacher.findById(teacherId).lean().exec();
    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    // Find all courses taught by the teacher
    const courses = await Course.find({ teacher: teacherId }).lean().exec();
    const courseReviews = courses.map(course => {
      // Count the number of reviews and total students enrolled
      const totalStudents = course.students; // Assuming students is an array of student IDs
      const reviews = course.reviews || []; // Reviews array

      // Count ratings
      const ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      reviews.forEach(review => {
        const rating = review.rating;
        if (ratingCounts[rating] !== undefined) {
          ratingCounts[rating]++;
        }
      });

      // Calculate overall rating
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const overallRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : null;

      return {
        courseId: course._id,
        courseName: course.name,
        totalStudents,
        ratingCounts,
        overallRating,
      };
    });

    return NextResponse.json(
      {
        message: "Teacher courses reviews retrieved successfully",
        courses: courseReviews,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving teacher courses reviews:", error);
    return NextResponse.json(
      { message: "Failed to retrieve teacher courses reviews", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getTeacherCoursesReviewsHandler);
