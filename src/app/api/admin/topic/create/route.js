import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../backend/model/topic-model"; 
import { auth } from "../../../../../auth";
import { Teacher } from "../../../../../../backend/model/teacher-model";

const addTopicHandler = async (request) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  // Check if the user has admin rights
  const adminUser = await Teacher.findOne({ email: user.email }).lean();

  if (!adminUser || !adminUser.AdminRights) {
    return NextResponse.json(
      { message: "User does not have admin rights" },
      { status: 403 }
    );
  }

  const data = await request.json();
  const { title, description } = data;

  if (!title) {
    return NextResponse.json(
      { message: "Title is required" },
      { status: 400 }
    );
  }

  try {
    const newTopic = new Topic({
      title,
      description: description || "",
    });

    await newTopic.save();

    return NextResponse.json(
      { message: "Topic created successfully", topic: newTopic },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "Failed to create topic" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(addTopicHandler);
