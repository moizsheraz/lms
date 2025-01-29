// pages/api/admin/topic/[topicId]/subtopic/delete.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../backend/model/topic-model"; 
import { auth } from "../../../../../../../auth";

const deleteSubtopicHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { subtopicId } = await request.json();
  const { topicId } = params;

  if (!subtopicId) {
    return NextResponse.json(
      { message: "Subtopic ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedTopic = await Topic.findByIdAndUpdate(
      topicId,
      { $pull: { subTopics: { _id: subtopicId } } },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subtopic deleted successfully", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting subtopic:", error);
    return NextResponse.json(
      { message: "Failed to delete subtopic" },
      { status: 500 }
    );
  }
};

export const DELETE = connectDb(deleteSubtopicHandler);
