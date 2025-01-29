import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Student } from "../../../../../../backend/model/student-model"; 

const generateRandomUsername = async () => {
    const randomUsername = `user_${Math.random().toString(36).substr(2, 8)}`; 
    const existingUser = await Student.findOne({ username: randomUsername });
    return existingUser ? generateRandomUsername() : randomUsername; 
};

export const POST = async (request) => {
  const { name, email } = await request.json();

  await dbConnect();

  try {
    const existingStudent = await Student.findOne({ email: email });

    if (existingStudent) {
      return new NextResponse(
        JSON.stringify({ isExist: true, userData: existingStudent }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const username = await generateRandomUsername();

    const newStudent = {
      firstName: name,
      lastName: "",
      email: email,
      username,
      isVerified: true,
    };

    const student = new Student(newStudent);
    await student.save(); 
    return new NextResponse(
      JSON.stringify({ isExist: false, userData: student }),
      {
        status: 201,
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
