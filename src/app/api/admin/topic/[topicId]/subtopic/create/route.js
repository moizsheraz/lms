import { NextResponse } from "next/server";
import connectDb from "../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../backend/model/topic-model"; 
import { auth } from "../../../../../../../auth";

const addSubtopicHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { topicId } = params;
  const data = await request.json();
  const { title, description } = data;

  if (!title) {
    return NextResponse.json(
      { message: "Title is required for subtopic" },
      { status: 400 }
    );
  }

  try {
    // Find the topic by ID and add a new subtopic to it
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    // Add the new subtopic to the topic's subTopics array
    const newSubtopic = { title, description: description || "" };
    topic.subTopics.push(newSubtopic);

    await topic.save();

    return NextResponse.json(
      { message: "Subtopic added successfully", topic },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding subtopic:", error);
    return NextResponse.json(
      { message: "Failed to add subtopic" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(addSubtopicHandler);
