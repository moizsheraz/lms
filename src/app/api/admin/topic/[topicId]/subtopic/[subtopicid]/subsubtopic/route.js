import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDb from "../../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../../backend/model/topic-model";

const getSubSubtopicsHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { topicId, subtopicid } = params;

  try {
    // Find the topic by ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Find the specific subtopic within the topic
    const subTopic = topic.subTopics.id(subtopicid);
    if (!subTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    // Return the sub-subtopics of the specified subtopic
    return NextResponse.json(
      { subSubtopics: subTopic.subTopics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching sub-subtopics:", error);
    return NextResponse.json(
      { message: "Failed to fetch sub-subtopics" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getSubSubtopicsHandler);
