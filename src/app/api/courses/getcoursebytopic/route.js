import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";
import { Topic } from "../../../../../backend/model/topic-model";

const getCoursesByTopicHandler = async (request) => {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests are allowed" },
      { status: 405 }
    );
  }

  const { topic } = await request.json();

  if (!topic) {
    return NextResponse.json(
      { message: "Topic ID is required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the topic name using the provided topic ID
    const topicData = await Topic.findById(topic).exec();
    if (!topicData) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    const topicName = topicData.title;

    // Find courses where the topic field matches the retrieved topic name (case-insensitive)
    const courses = await Course.find({
      topic: { $regex: topicName, $options: "i" }, // Case-insensitive search for topic name
    });

    return NextResponse.json(
      { message: "Courses retrieved successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving courses:", error);
    return NextResponse.json(
      { message: "Failed to retrieve courses" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getCoursesByTopicHandler);
