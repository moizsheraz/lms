import connectDb from "../../../../../backend/middleware/db";
import { Blog } from "../../../../../backend/model/blog-model";
import { NextResponse } from "next/server";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { Category } from "../../../../../backend/model/category-model";

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find({}).populate("category teacher");
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getAllBlogs);
