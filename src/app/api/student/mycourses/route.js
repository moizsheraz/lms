import { NextResponse } from "next/server";
import { Student } from "../../../../../backend/model/student-model";
import connectDb from "../../../../../backend/middleware/db";
import { auth } from "@/auth";
import { Course } from "../../../../../backend/model/courses-model";

export const dynamic = 'force-dynamic';

const getCoursesHandler = async (request) => {
  try {
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
    console.log(student);
    if (!student || !student.purchasedCourses || student.purchasedCourses.length === 0) {
      return NextResponse.json(
        { message: "No purchased courses found for this student", courses: [] },
        { status: 404 }
      );
    }

    // Find the courses based on purchasedCourses array
    const courses = await Course.find({ _id: { $in: student.purchasedCourses } })
      .populate('teacher', 'username')
      .exec();

    if (!courses || courses.length === 0) {
      return NextResponse.json(
        { message: "Courses not found for the given IDs", courses: [] },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Courses retrieved successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return NextResponse.json(
      { message: "Failed to retrieve courses", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getCoursesHandler);
