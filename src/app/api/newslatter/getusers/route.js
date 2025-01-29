import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Newsletter } from "../../../../../backend/model/newslattter-model";

const getSubscribersHandler = async () => {
  try {
    const subscribers = await Newsletter.find();

    return NextResponse.json(
      { message: "Subscribers retrieved successfully", subscribers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving subscribers:", error);
    return NextResponse.json(
      { message: "Failed to retrieve subscribers" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getSubscribersHandler);
