import connectDb from "../../../../../backend/middleware/db";
import { Blog } from "../../../../../backend/model/blog-model";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { Category } from "../../../../../backend/model/category-model";
const getBlogsByTeacher = async () => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const teacher = await Teacher.findOne({ email: user.email });
    if (!teacher) {
      return NextResponse.json(
        { message: "Only teachers can view blogs" },
        { status: 401 }
      );
    }

    // Fetch all blogs by the teacher's _id
    const blogs = await Blog.find({ teacher: teacher._id }).populate(
      "category"
    );

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        { message: "No blogs found for this teacher" },
        { status: 404 }
      );
    }

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blogs", error: error.message },
      { status: 500 }
    );
  }
};

const handlePost = async (request) => {
  const { action } = await request.json();

  if (action === "fetchByTeacher") {
    return getBlogsByTeacher();
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
};

export const POST = connectDb(handlePost);
