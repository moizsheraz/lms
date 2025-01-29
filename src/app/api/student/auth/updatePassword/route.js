import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model"; 
import { auth } from "../../../../../auth"; 

export const PUT = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { currentpassword, newpassword } = await request.json();

  // Connect to DB
  await dbConnect();

  try {
    // Find the user by their email
    const student = await Student.findOne({ email: user.email });

    if (!student) {
      return new NextResponse(JSON.stringify({ message: "Profile not found." }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentpassword.currentpassword, student.password);
    if (!isMatch) {
      return new NextResponse(JSON.stringify({ message: "Current password is incorrect." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate new password (optional)
    if (!currentpassword.newpassword || currentpassword.newpassword.length < 6) {
      return new NextResponse(JSON.stringify({ message: "New password must be at least 6 characters long." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the new password and update
    student.password = await bcrypt.hash(currentpassword.newpassword, 10);
    await student.save();

    return new NextResponse(JSON.stringify({ message: "password updated successfully." }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
