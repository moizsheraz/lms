import connectDb from "../../../../backend/middleware/db";
import { Blog } from "../../../../backend/model/blog-model";
import { Teacher } from "../../../../backend/model/teacher-model";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { pipeline } from "stream";
import { auth } from "../../../auth";
import { Category } from "../../../../backend/model/category-model";
import slugify from "slugify";
const pump = promisify(pipeline);
const createBlog = async (data) => {
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
        { message: "Only teachers can create blogs" },
        { status: 401 }
      );
    }

    const { title, image, blogName, description, category, tags } = data;

    if (!title || !image || !blogName || !description || !category) {
      return NextResponse.json(
        { message: "All fields except tags are required" },
        { status: 400 }
      );
    }

    let blogImagePath;
    if (image) {
      const imageData = image.split(",")[1];
      const imageBuffer = Buffer.from(imageData, "base64");
      const uniqueFilename = `${title}_${Date.now()}.png`;
      blogImagePath = path.join("./public/blogs", uniqueFilename);

      await pump(
        Readable.from(imageBuffer),
        fs.createWriteStream(blogImagePath)
      );
      blogImagePath = blogImagePath.replace("./public", "");
    }

    const blog = new Blog({
      title,
      image: blogImagePath,
      blogName,
      description,
      category,
      tags,
      teacher: teacher?._id,
    });

    await blog.save();

    return NextResponse.json(
      { message: "Blog created successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create blog", error: error.message },
      { status: 500 }
    );
  }
};

const getBlogBySlug = async (data) => {
  try {
    const { slug } = data;

    // Populate both category and teacher fields
    const blog = await Blog.findOne({ slug })
      .populate("category")
      .populate("teacher", "profileImage firstName lastName");

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog", error: error.message },
      { status: 500 }
    );
  }
};

const updateBlogBySlug = async (request) => {
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
        { message: "Only teachers can update blogs" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { slug, title, image, blogName, description, category, tags } = body;
    let blogImagePath;

    if (image) {
      const imageData = image.split(",")[1];
      const imageBuffer = Buffer.from(imageData, "base64");
      const uniqueFilename = `${title}_${Date.now()}.png`;
      blogImagePath = path.join("./public/blogs", uniqueFilename);

      await pump(
        Readable.from(imageBuffer),
        fs.createWriteStream(blogImagePath)
      );
      blogImagePath = blogImagePath.replace("./public", "");
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        title,
        image: blogImagePath || undefined,
        blogName,
        description,
        category,
        tags,
      },
      { new: true }
    );
    console.log(updatedBlog);

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog updated successfully", blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update blog", error: error.message },
      { status: 500 }
    );
  }
};

const deleteBlogBySlug = async (data) => {
  try {
    const { slug } = data;
    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete blog", error: error.message },
      { status: 500 }
    );
  }
};

const handlePost = async (request) => {
  const { action, ...data } = await request.json();
  switch (action) {
    case "fetch":
      return getBlogBySlug(data);
    case "create":
      return createBlog(data);
    case "delete":
      return deleteBlogBySlug(data);
    default:
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
};

export const POST = connectDb(handlePost);
export const PUT = connectDb(updateBlogBySlug);
