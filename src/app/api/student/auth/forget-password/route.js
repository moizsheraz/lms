import { NextResponse } from "next/server";
import { sendOTP } from "../../../../../services";
import { Student } from "../../../../../../backend/model/student-model";
import { Teacher } from "../../../../../../backend/model/teacher-model";

export const POST = async (request) => {
  const { email } = await request.json();
  const otp = generateOTP();
  const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes

  try {
    let user = await Student.findOne({ email: email });
    let role = "student";

    if (!user) {
      user = await Teacher.findOne({ email: email });
      role = "teacher";
    }

    if (!user) {
      return new NextResponse("User not found.", { status: 404 });
    }

    await sendOTP(email, otp);

    user.otp = otp;
    user.otpExpiresAt = new Date(expirationTime);
    await user.save();

    return NextResponse.json(
      { message: "OTP sent to your email.", userType: role },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Failed to send OTP. Please try again.", {
      status: 500,
    });
  }
};

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
