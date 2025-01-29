import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model"; 
import { sendOTP } from "@/services";
import { generateOTP } from "@/services";

const validateInput = (firstName, lastName, email, password, username,countryCode) => {
  const errors = [];

  if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
    errors.push("First Name must be at least 2 characters long.");
  }
  if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
    errors.push("Last Name must be at least 2 characters long.");
  }
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Invalid email format.");
  }
  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }
  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long.");
  }
  if (!countryCode || typeof countryCode !== 'string' || countryCode.trim().length < 3) {
    errors.push("Country Code must be at least 1 characters long.");
  }

  return errors;
};

export const POST = async (request) => {
  const { firstName, lastName, email, password, username, phoneNumber,countryCode } = await request.json();
  await dbConnect();

  const student = await Student.findOne({ email: email });
  if (student) {
    return new NextResponse(JSON.stringify({ message: "User already exists." }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Input validation
  const errors = validateInput(firstName, lastName, email, password, username,countryCode);
  if (errors.length > 0) {
    return new NextResponse(JSON.stringify({ errors }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for security

  // Generate the OTP
  const otp = generateOTP();

  // Form a DB payload
  const newStudent = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    username,
    otp: otp,
    phoneNumber,
    countryCode
  };

  // Save the student in the database and send the OTP
  try {
    const student = new Student(newStudent);
    await student.save(); 

    await sendOTP(email, otp);

  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new NextResponse(JSON.stringify({ message: "User has been created, OTP sent to email." }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
};
