// pages/api/admin/topic/[topicId]/subtopic/[subtopicid]/subsubtopic/edit.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { Topic } from "../../../../../../../../../../backend/model/topic-model";
import connectDb from "../../../../../../../../../../backend/middleware/db";

const editSubSubtopicHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const data = await request.json();
  const { subSubtopicId, title, description } = data;
  const { topicId, subtopicid } = params;

  if (!subSubtopicId) {
    return NextResponse.json(
      { message: "Sub-subtopic ID is required" },
      { status: 400 }
    );
  }

  try {
    // Find the topic
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    // Find the subtopic within the topic's subTopics array
    const subTopic = topic.subTopics.id(subtopicid);
    if (!subTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    // Find and update the sub-subtopic within the subtopic's subTopics array
    const subSubtopic = subTopic.subTopics.id(subSubtopicId);
    if (!subSubtopic) {
      return NextResponse.json(
        { message: "Sub-subtopic not found" },
        { status: 404 }
      );
    }

    // Update the fields
    subSubtopic.title = title || subSubtopic.title;
    subSubtopic.description = description || subSubtopic.description;

    await topic.save();

    return NextResponse.json(
      { message: "Sub-subtopic updated successfully", topic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating sub-subtopic:", error);
    return NextResponse.json(
      { message: "Failed to update sub-subtopic", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = connectDb(editSubSubtopicHandler);
