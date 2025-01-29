import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { auth } from "../../../../../auth"; 

const approveTeacherHandler = async (request, { params }) => {
  const { teacherId } = params;
  const { isApproved } = await request.json();

  if (!teacherId) {
    return NextResponse.json(
      { message: "Teacher ID is required" },
      { status: 400 }
    );
  }

  try {
    // Authenticate the user
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

    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    teacher.isApproved = isApproved;
    await teacher.save();

    return NextResponse.json(
      {
        message: `Teacher ${isApproved ? "approved" : "disapproved"} successfully`,
        teacher,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating teacher status:", error);
    return NextResponse.json(
      { message: "Failed to update teacher status" },
      { status: 500 }
    );
  }
};

export const PATCH = connectDb(approveTeacherHandler);
