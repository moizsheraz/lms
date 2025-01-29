import { NextResponse } from "next/server";
import { Student } from "../../../../../../backend/model/student-model";

export const POST = async (request) => {
  const { email, otp } = await request.json();

  try {
    const student = await Student.findOne({ email: email });

    if (!student) {
      return new NextResponse("Student not found.", { status: 404 });
    }
    
    const currentTime = new Date();
    if (student.otp !== otp || student.otpExpiresAt < currentTime) {
      return new NextResponse("Invalid or expired OTP.", { status: 400 });
    }

    student.otp = undefined;
    student.otpExpiresAt = undefined;
    student.isVerified = true;
    
    await student.save();

    return new NextResponse("OTP verified successfully.", { status: 200 });

  } catch (error) {
    return new NextResponse("Failed to verify OTP. Please try again.", {
      status: 500,
    });
  }
};
