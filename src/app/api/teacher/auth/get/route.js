// api/teacher/auth/get.js
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { auth } from "../../../../../auth";

export const GET = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

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

    return new NextResponse(JSON.stringify({ profile: teacher }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
