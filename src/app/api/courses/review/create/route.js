import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { auth } from "../../../../../auth";
import { Student } from "../../../../../../backend/model/student-model";

const addReviewHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const data = await request.json();
  const { courseId, rating, reviewText } = data;
 console.log(data)
  if (!courseId || !rating) {
    return NextResponse.json(
      { message: "Course ID and rating are required" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { message: "Rating must be between 1 and 5" },
      { status: 400 }
    );
  }

  try {
    // Fetch the student using the user's email
    const student = await Student.findOne({ email: user.email });
    
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const course = await Course.findById(courseId);
    console.log("Course:", course);
    
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const newReview = {
      student: student._id,  
      rating,
      reviewText,
      reviewDate: new Date(),
    };

    course.reviews.push(newReview);
    await course.save();

    return NextResponse.json(
      { message: "Review added successfully", review: newReview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { message: "Failed to add review", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(addReviewHandler);
