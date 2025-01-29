import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { Teacher } from "../../../../../../backend/model/teacher-model";  

const generateRandomUsername = async () => {
    const randomUsername = `user_${Math.random().toString(36).substr(2, 8)}`; 
    const existingUser = await Teacher.findOne({ username: randomUsername });
    return existingUser ? generateRandomUsername() : randomUsername; 
};

export const POST = async (request) => {
  const { name, email } = await request.json();

  await dbConnect();

  try {
    const existingTeacher = await Teacher.findOne({ email: email });

    if (existingTeacher) {
      return new NextResponse(
        JSON.stringify({ isExist: true, userData: existingTeacher }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate a random username if the teacher doesn't exist
    const username = await generateRandomUsername();

    const newTeacher = {
      firstName: name,
      lastName: "",
      email: email,
      username,
      isVerified: true,
    };

    const teacher = new Teacher(newTeacher);
    await teacher.save(); // Save the teacher to the database
    
    return new NextResponse(
      JSON.stringify({ isExist: false, userData: teacher }),
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
