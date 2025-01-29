// api/teacher/auth/updatePassword.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { auth } from "../../../../../auth";

export const PUT = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { currentpassword, newpassword } = await request.json();

  await dbConnect();

  try {
    const teacher = await Teacher.findOne({ email: user.email });

    if (!teacher) {
      return new NextResponse(
        JSON.stringify({ message: "Profile not found." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const isMatch = await bcrypt.compare(currentpassword.currentpassword, teacher.password);
    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({ message: "Current password is incorrect." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    teacher.password = await bcrypt.hash(currentpassword.newpassword, 10);
    await teacher.save();

    return new NextResponse(
      JSON.stringify({ message: "Password updated successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
