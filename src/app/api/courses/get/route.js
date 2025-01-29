import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { auth } from "../../../../auth";

const getCoursesHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const teacher = await Teacher.findOne({ email: user.email });
  if (!teacher) {
    return NextResponse.json({ message: "Teacher not found" }, { status: 404 });
  }

  try {
    // Check if the teacher has admin rights
    let courses;
    if (teacher.AdminRights) {
      // Admin has rights to see all courses
      courses = await Course.find({});
    } else {
      // Regular teacher sees only their own courses
      courses = await Course.find({ teacher: teacher._id });
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

export const GET = connectDb(getCoursesHandler);
