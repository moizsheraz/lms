import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Teacher } from "../../../../../backend/model/teacher-model";

const getApprovedTeachersHandler = async () => {
  try {
    // Fetch only approved teachers from the database
    const teachers = await Teacher.find({ isApproved: true })
      .select("-password -otp -otpExpiresAt") // Exclude sensitive fields
      .lean()
      .exec();

    return NextResponse.json(
      {
        message: "Approved teachers retrieved successfully",
        teachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching approved teachers:", error);
    return NextResponse.json(
      { message: "Failed to retrieve approved teachers", error: error.message },
      { status: 500 }
    );
  }
};

// Wrap the handler with the database connection middleware
export const GET = connectDb(getApprovedTeachersHandler);
