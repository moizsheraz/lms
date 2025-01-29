import { NextResponse } from "next/server";
import { sendOTP } from "../../../../../services";
import { Teacher } from "../../../../../../backend/model/teacher-model"; 

export const POST = async (request) => {
  const { email } = await request.json();

  const otp = generateOTP();
  const expirationTime = Date.now() + 5 * 60 * 1000; 

  try {
    // Find the teacher by email
    const teacher = await Teacher.findOne({ email: email });
    
    if (!teacher) {
      return new NextResponse("Teacher not found.", { status: 404 });
    }

    await sendOTP(email, otp);

    teacher.otp = otp;
    teacher.otpExpiresAt = new Date(expirationTime);

    await teacher.save();

  } catch (error) {
    return new NextResponse("Failed to send OTP. Please try again.", {
      status: 500,
    });
  }

  return new NextResponse("OTP sent to your email.", {
    status: 200,
  });
};

const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};
