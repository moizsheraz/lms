import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import path from "path";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Teacher } from "../../../../../../backend/model/teacher-model";
import { auth } from "../../../../../auth";

const pump = promisify(pipeline);

const editCourseHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const teacher = await Teacher.findOne({ email: user.email });
  if (!teacher) {
    return NextResponse.json(
      { message: "Teacher not found", user: user.email },
      { status: 404 }
    );
  }

  const { courseId } = params;
  const data = await request.json();
  const {
    courseImage,
    name,
    price,
    description,
    topic,
    subtopics,
    theoreticalMaterial,
    auxiliaryMaterial,
  } = data;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    if (
      !(
        teacher.AdminRights ||
        course.teacher.toString() === teacher._id.toString()
      )
    ) {
      return NextResponse.json(
        { message: "You are not authorized to edit this course" },
        { status: 403 }
      );
    }

    if (courseImage && courseImage.startsWith("data:image")) {
      const courseImgData = courseImage.split(",")[1];
      const courseImgBuffer = Buffer.from(courseImgData, "base64");
      const uniqueFilename = `${name}_${Date.now()}.png`;
      const courseImagePath = path.join("./public/courses", uniqueFilename);

      await pump(
        Readable.from(courseImgBuffer),
        fs.createWriteStream(courseImagePath)
      );
      course.courseImage = courseImagePath.replace("./public", "");
    } else if (courseImage) {
      course.courseImage = courseImage;
    }

    course.name = name || course.name;
    course.price = price || course.price;
    course.description = description || course.description;
    course.topic = topic || course.topic;
    course.subtopics = subtopics || course.subtopics;
    course.theoreticalMaterial =
      theoreticalMaterial || course.theoreticalMaterial;
    course.auxiliaryMaterial = auxiliaryMaterial || course.auxiliaryMaterial;

    await course.save();
    return NextResponse.json(
      { message: "Course updated successfully", course },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { message: "Failed to update course", error: error.message },
      { status: 500 }
    );
  }
};
export const PUT = connectDb(editCourseHandler);
