import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { Course } from "../../../../../../backend/model/courses-model";
import { auth } from "../../../../../auth";

const getTeacherDetailsHandler = async (request, { params }) => {
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

    const { teacherId } = params;
    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    const teacher = await Teacher.findById(teacherId)
      .select("-password -otp -otpExpiresAt")
      .populate({
        path: "courses",
        model: Course,
        select: "name description courseImage isActive",
      })
      .lean()
      .exec();

    console.log("Teacher Data:", teacher); // Log the teacher data

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Teacher details retrieved successfully",
        data: teacher,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving teacher details:", error);
    return NextResponse.json(
      { message: "Failed to retrieve teacher details", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getTeacherDetailsHandler);
