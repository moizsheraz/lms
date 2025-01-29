import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Topic } from "../../../../../../backend/model/topic-model"; // Import Topic schema

const getTopicsHandler = async () => {
  try {
    const topics = await Topic.find();
    return NextResponse.json({ topics }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { message: "Failed to fetch topics" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getTopicsHandler);
