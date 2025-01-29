import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { auth } from "../../../../auth";

const getAllTeachersHandler = async (request) => {
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

  try {
    const teachers = await Teacher.find({});

    if (!teachers || teachers.length === 0) {
      return NextResponse.json(
        { message: "No teachers found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Teachers retrieved successfully", teachers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving teachers:", error);
    return NextResponse.json(
      { message: "Failed to retrieve teachers" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getAllTeachersHandler);
