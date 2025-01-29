import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db"; // Ensure this is the correct path to the db connection
import { Course } from "../../../../../../backend/model/courses-model"; // Ensure this path is correct
import { Student } from "../../../../../../backend/model/student-model"; // Ensure this path is correct
import { Teacher } from "../../../../../../backend/model/teacher-model"; // Ensure this path is correct
import { Exam } from "../../../../../../backend/model/exam-schema"; // Ensure this path is correct
import { auth } from "../../../../../auth"; // Assuming this handles authentication for the API
import { Summary } from "../../../../../../backend/model/summary-model";
import { Question } from "../../../../../../backend/model/question-model";
const getCourseHandler = async (request, context) => {
  const session = await auth();
  const user = session?.user;

  let student = null;
  let teacher = null;

  if (user && user.email) {
    student = await Student.findOne({ email: user.email }).lean();
    teacher = await Teacher.findOne({ email: user.email }).lean();
  }

  // Await `context.params` to extract `courseId`
  const { courseId } = await context.params;

  try {
    // Fetch the course by ID with populated fields
    const course = await Course.findById(courseId)
      .populate("teacher", "firstName lastName email profileImage") // Teacher details
      .populate("summaries") // Summaries related to the course
      .populate({
        path: "exam",
        populate: { path: "questions" }, // Exam and its questions
      })
      .populate({
        path: "reviews.student",
        model: "Student",
        select: "firstName lastName profileImage", // Reviews and students' basic details
      })
      .lean(); // Using .lean() to return plain JavaScript objects instead of Mongoose documents
     
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // If user is a student, we will fetch the enrollment details from students array
    let purchaseDate = null;
    if (student) {
      const enrollment = course.students.find((enrollment) =>
        enrollment.student.equals(student._id)
      );
      purchaseDate = enrollment ? enrollment.purchaseDate : null;
    }

    // Prepare the course response data
    const responseData = {
      course: {
        ...course,
        reviews: course.reviews || [],
        purchaseDate,
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { message: "Failed to fetch course" },
      { status: 500 }
    );
  }
};

// Export the GET handler, wrapped with the DB connection
export const GET = connectDb(getCourseHandler);
