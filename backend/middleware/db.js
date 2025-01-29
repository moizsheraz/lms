import mongoose from "mongoose";
import { NextResponse } from "next/server";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI ;
const connectDb = (handler) => async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      return NextResponse.json(
        { message: "Failed to connect to MongoDB" },
        { status: 500 }
      );
    }
  }
  return handler(req, res);
};

export default connectDb;
