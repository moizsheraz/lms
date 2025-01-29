// pages/api/admin/topic/[topicId]/subtopic/[subtopicid]/subsubtopic/delete.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "../../../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../../../backend/model/topic-model";

const deleteSubSubtopicHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { subSubtopicId } = await request.json();
  const { topicId, subtopicid } = params;

  console.log("params", params);
  if (!subSubtopicId) {
    return NextResponse.json(
      { message: "Sub-subtopic ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the topic by ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Find the specific subtopic within the topic's subTopics array
    const subTopic = topic.subTopics.id(subtopicid);
    if (!subTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    // Remove the sub-subtopic from the subtopic's subTopics array
    const updatedSubTopics = subTopic.subTopics.filter(
      (subSubtopic) => subSubtopic._id.toString() !== subSubtopicId
    );

    subTopic.subTopics = updatedSubTopics;

    await topic.save();

    return NextResponse.json(
      { message: "Sub-subtopic deleted successfully", topic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting sub-subtopic:", error);
    return NextResponse.json(
      { message: "Failed to delete sub-subtopic" },
      { status: 500 }
    );
  }
};

export const DELETE = connectDb(deleteSubSubtopicHandler);
