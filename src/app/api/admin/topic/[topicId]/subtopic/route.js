import { NextResponse } from "next/server";
import connectDb from "../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../backend/model/topic-model"; 
import { auth } from "../../../../../../auth";

const getSubtopicsHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { topicId } = params;

  try {
    // Find the topic by ID
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    // Return the subtopics of the topic
    return NextResponse.json(
      { subTopics: topic.subTopics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subtopics:", error);
    return NextResponse.json(
      { message: "Failed to fetch subtopics" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getSubtopicsHandler);
