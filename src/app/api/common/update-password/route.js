import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Student } from "../../../../../backend/model/student-model";
import { Teacher } from "../../../../../backend/model/teacher-model";

export const POST = async (request) => {
  const { email, userType, newPassword } = await request.json();

  // Validate input
  if (!email || !userType || !newPassword) {
    return new NextResponse("Invalid input. All fields are required.", {
      status: 400,
    });
  }

  try {
    // Determine the user model based on userType
    const Model = userType === "student" ? Student : Teacher;

    // Find user by email
    const user = await Model.findOne({ email });
    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return new NextResponse("Failed to update password. Please try again.", {
      status: 500,
    });
  }
};
