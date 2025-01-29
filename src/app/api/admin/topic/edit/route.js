import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../backend/model/topic-model"; 
import { auth } from "../../../../../auth";
import { Teacher } from "../../../../../../backend/model/teacher-model"; // Import Teacher model for admin check

const updateTopicHandler = async (request) => {
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
  const { id, title, description, subTopics } = data;

  if (!id) {
    return NextResponse.json(
      { message: "Topic ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      {
        title: title || "",
        description: description || "",
        subTopics: subTopics || [],
      },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Topic updated successfully", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { message: "Failed to update topic" },
      { status: 500 }
    );
  }
};

export const PUT = connectDb(updateTopicHandler);
