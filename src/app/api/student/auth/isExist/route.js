import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model";

export const POST = async (request) => {
  const { email } = await request.json();

  await dbConnect();

  try {
    const student = await Student.findOne({ email: email });

    if (student) {
      return new NextResponse(
        JSON.stringify({ isExist: true, userData: student }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ isExist: false }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
