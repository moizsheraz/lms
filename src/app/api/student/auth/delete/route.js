import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model"; 
import { auth } from "../../../../../auth"; 

export const DELETE = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Connect to DB
  await dbConnect();

  try {
    // Find and delete the user by email
    const student = await Student.findOneAndDelete({ email: user.email });

    if (!student) {
      return new NextResponse(JSON.stringify({ message: "Profile not found." }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new NextResponse(JSON.stringify({ message: "Account deleted successfully." }), {
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
