import { NextResponse } from "next/server";
import { auth } from "@/auth"; // Ensure your auth is set up correctly

import connectDb from "../../../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../../../backend/model/topic-model";

const addSubSubtopicHandler = async (request, { params }) => {
  const session = await auth(); // Authentication check
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { topicId, subtopicid } = params; // Use lowercase as received

  const data = await request.json(); // Parse incoming JSON data
  const { title, description } = data;

  // Check for title
  if (!title) {
    return NextResponse.json(
      { message: "Title is required for sub-subtopic" },
      { status: 400 }
    );
  }

  try {
    // Fetch the topic by ID
    const topic = await Topic.findById(topicId);

    // Check if topic exists
    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    // Fetch the specific subtopic by ID
    const subTopic = topic.subTopics.id(subtopicid); // Use the lowercase variable
    if (!subTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    // Create the new sub-subtopic object
    const newSubSubtopic = {
      title,
      description: description || "",
      subTopics: [], // Start with an empty subTopics array
    };

    // Add new sub-subtopic to the found subtopic
    subTopic.subTopics.push(newSubSubtopic);
    await topic.save(); // Save the updated topic

    return NextResponse.json(
      { message: "Sub-subtopic added successfully", topic },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding sub-subtopic:", error); // Log error details
    return NextResponse.json(
      { message: "Failed to add sub-subtopic", error: error.message },
      { status: 500 }
    );
  }
};

// Export the handler wrapped in DB connection middleware
export const POST = connectDb(addSubSubtopicHandler);
