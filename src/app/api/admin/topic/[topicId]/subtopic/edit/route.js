import { NextResponse } from "next/server";
import connectDb from "../../../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../../../backend/model/topic-model";
import { auth } from "../../../../../../../auth";

const editSubtopicHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const data = await request.json();
  const { subtopicId, title, description } = data;
  const { topicId } = params;

  if (!subtopicId) {
    return NextResponse.json(
      { message: "Subtopic ID is required" },
      { status: 400 }
    );
  }

  try {
    const updatedTopic = await Topic.findOneAndUpdate(
      { _id: topicId, "subTopics._id": subtopicId },
      {
        $set: {
          "subTopics.$.title": title || "",
          "subTopics.$.description": description || "",
        },
      },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json(
        { message: "Subtopic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Subtopic updated successfully", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subtopic:", error);
    return NextResponse.json(
      { message: "Failed to update subtopic", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = connectDb(editSubtopicHandler);
