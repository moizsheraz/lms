import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Newsletter } from "../../../../../backend/model/newslattter-model";

const subscribeNewsletterHandler = async (request) => {
  try {
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Create a new newsletter subscription
    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    return NextResponse.json(
      {
        message: "Subscribed to newsletter successfully",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    if (error.code === 11000) {
      // Duplicate key error for unique field
      return NextResponse.json(
        { message: "This email is already subscribed" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(subscribeNewsletterHandler);
