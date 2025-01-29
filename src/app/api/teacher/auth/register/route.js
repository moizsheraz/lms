import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { Teacher } from "../../../../../../backend/model/teacher-model"; 
import { sendOTP } from "@/services";
import { generateOTP } from "@/services";

const validateInput = (firstName, lastName, email, password, username, countryCode) => {
  const errors = [];

  if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 3) {
    errors.push("First Name must be at least 3 characters long.");
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 3) {
    errors.push("Last Name must be at least 3 characters long.");
  }
  if (!email || typeof email !== 'string' || email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Invalid email format.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long.");
  }
  if (!countryCode || typeof countryCode !== 'string' || countryCode.trim().length < 1) {
    errors.push("Country Code is required.");
  }

  return errors;
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const createTeacher = async (data) => {
  const teacher = new Teacher(data);
  await teacher.save();
};

export const POST = async (request) => {
  try {
    const { firstName, lastName, email, password, username, countryCode } = await request.json();
    await dbConnect();

    const errors = validateInput(firstName, lastName, email, password, username, countryCode);
    if (errors.length > 0) {
      return new NextResponse(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!email) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Email is required." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingTeacher = await Teacher.findOne({ email: email.toLowerCase() });
    if (existingTeacher) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Teacher with this email already exists." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();

    const newTeacher = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      username,
      otp,
      countryCode,
    };

    await createTeacher(newTeacher);
    await sendOTP(email, otp);

    return new NextResponse(
      JSON.stringify({ success: true, message: "Teacher created, OTP sent to email." }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    if (error.code === 11000) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Duplicate email error: Teacher already exists." }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
