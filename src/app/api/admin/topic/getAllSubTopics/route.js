// File path: src/app/api/admin/topic/allSubtopicsAndSubSubtopics/route.js
import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../backend/model/topic-model";

const getAllSubtopicsAndSubSubtopicsHandler = async () => {
  try {
    // Retrieve all topics, including their subtopics and subSubTopics
    const topics = await Topic.find().select("subTopics");

    // Extract all subtopics and sub-subtopics
    const allSubtopics = topics.flatMap((topic) => topic.subTopics || []);  // Handle missing subTopics
    const allSubSubtopics = allSubtopics.flatMap((subtopic) => subtopic.subTopics || []);  // Handle missing subSubTopics

    return NextResponse.json(
      { subTopics: allSubtopics, subSubtopics: allSubSubtopics },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subtopics and sub-subtopics:", error);
    return NextResponse.json(
      { message: "Failed to fetch subtopics and sub-subtopics" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getAllSubtopicsAndSubSubtopicsHandler);
