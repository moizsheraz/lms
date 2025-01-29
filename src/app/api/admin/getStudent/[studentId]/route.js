import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Student } from "../../../../../../backend/model/student-model";
import { Course } from "../../../../../../backend/model/courses-model"; 
import { auth } from "../../../../../auth";
import { Teacher } from "../../../../../../backend/model/teacher-model";

const getStudentDetailsWithCoursesHandler = async (request, { params }) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Check if the user has admin rights
    const adminUser = await Teacher.findOne({ email: user.email }).lean();

    if (!adminUser || !adminUser.AdminRights) {
      return NextResponse.json(
        { message: "User does not have admin rights" },
        { status: 403 }
      );
    }

    // Extract studentId from URL parameters
    const { studentId } = params;
    if (!studentId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    // Find the student by ID, excluding the `reviews` field
    const student = await Student.findById(studentId)
      .select('-reviews') // Exclude the `reviews` field
      .lean()
      .exec();

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    // Find purchased courses for the student
    const purchasedCourses = await Course.find({
      _id: { $in: student.purchasedCourses } // Assuming purchasedCourses is an array of course IDs
    }).lean().exec();

    // Prepare response data
    const responseData = {
      student,
      purchasedCourses,
    };

    return NextResponse.json(
      {
        message: "Student details with purchased courses retrieved successfully",
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving student details with courses:", error);
    return NextResponse.json(
      { message: "Failed to retrieve student details with courses", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getStudentDetailsWithCoursesHandler);
