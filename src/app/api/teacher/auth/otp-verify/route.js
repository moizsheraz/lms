import { NextResponse } from "next/server";
import { Teacher } from "../../../../../../backend/model/teacher-model";

export const POST = async (request) => {
  const { email, otp } = await request.json();

  try {
    const teacher = await Teacher.findOne({ email: email });

    if (!teacher) {
      return new NextResponse("Teacher not found.", { status: 404 });
    }
    
    const currentTime = new Date();
    if (teacher.otp !== otp || teacher.otpExpiresAt < currentTime) {
      return new NextResponse("Invalid or expired OTP.", { status: 400 });
    }

    teacher.otp = undefined;
    teacher.otpExpiresAt = undefined;

    await teacher.save();

    return new NextResponse("OTP verified successfully.", { status: 200 });

  } catch (error) {
    return new NextResponse("Failed to verify OTP. Please try again.", {
      status: 500,
    });
  }
};
