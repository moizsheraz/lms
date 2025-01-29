import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Student } from "../../../../../backend/model/student-model";
import { auth } from "../../../../auth";
import { Teacher } from "../../../../../backend/model/teacher-model"; // Import the Teacher model

const getAllStudentsHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  // Find the user in the Teacher model to check admin rights
  const adminUser = await Teacher.findOne({ email: user.email }).lean();

  if (!adminUser || !adminUser.AdminRights) {
    return NextResponse.json(
      { message: "User does not have admin rights" },
      { status: 403 }
    );
  }

  try {
    const students = await Student.find({});

    if (!students || students.length === 0) {
      return NextResponse.json(
        { message: "No students found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Students retrieved successfully", students },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving students:", error);
    return NextResponse.json(
      { message: "Failed to retrieve students" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getAllStudentsHandler);
