import { NextResponse } from "next/server";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import path from "path";
import connectDb from "../../../../../backend/middleware/db";
import { Course } from "../../../../../backend/model/courses-model";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { auth } from "../../../../auth";

const pump = promisify(pipeline);

const generateCourseId = async () => {
  let courseId;
  let isUnique = false;

  while (!isUnique) {
    courseId = Math.random().toString(36).substring(2, 8).toUpperCase();

    const existingCourse = await Course.findOne({ courseId });
    if (!existingCourse) {
      isUnique = true;
    }
  }

  return courseId;
};

const createCourseHandler = async (request) => {
  try {
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

    const data = await request.json();
    const {
      courseImage,
      name,
      price,
      description,
      topic,
      subtopics,
      subsubtopics,
      theoreticalMaterial,
      auxiliaryMaterial,
      availableFor = 3,
    } = data;

    const requiredFields = {
      name,
      price,
      description,
      topic,
    
    };
    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return NextResponse.json(
          { message: `Missing or empty field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate availableFor (ensure it's a valid date)
    if (!availableFor) {
      return NextResponse.json(
        { message: "Missing availableFor field" },
        { status: 400 }
      );
    }

    // Generate a unique courseId
    const courseId = await generateCourseId();

    // Process course image if provided
    let courseImagePath;
    if (courseImage) {
      const courseImgData = courseImage.split(",")[1];
      const courseImgBuffer = Buffer.from(courseImgData, "base64");
      const uniqueFilename = `${name}_${Date.now()}.png`;
      courseImagePath = path.join("./public/courses", uniqueFilename);

      await pump(
        Readable.from(courseImgBuffer),
        fs.createWriteStream(courseImagePath)
      );
      courseImagePath = courseImagePath.replace("./public", ""); // Store relative path
    }

    // Create a new Course document
    const newCourse = new Course({
      courseId,
      courseImage: courseImagePath,
      name,
      price,
      description,
      topic,
      subtopics: subtopics || [],
      subsubtopics: subsubtopics || [],
      theoreticalMaterial,
      auxiliaryMaterial,
      availableFor,
      teacher: teacher._id,
    });
    await newCourse.save();
    // Add the new course to the teacher's `courses` array
    teacher.courses.push(newCourse._id);
    await teacher.save();

    return NextResponse.json(
      {
        message: "Course created successfully",
        course: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      {
        message: "Failed to create course",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createCourseHandler);
