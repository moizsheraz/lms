import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Summary } from "../../../../../backend/model/summary-model";
import { Teacher } from "../../../../../backend/model/teacher-model";
import { Course } from "../../../../../backend/model/courses-model";
import { auth } from "../../../../auth";

const createSummaryHandler = async (request) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.email)
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const teacher = await Teacher.findOne({ email: user.email });
    if (!teacher)
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );

    const summaries = await request.json();

    if (!Array.isArray(summaries)) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 }
      );
    }

    const createdSummaries = [];

    for (const { summaryTitle, description, courseId } of summaries) {
      if (!summaryTitle || !description) {
        return NextResponse.json(
          { message: "Invalid summary data" },
          { status: 400 }
        );
      }

      // Find the course by courseId
      console.log("c", courseId);
      let course;
      if (courseId) {
        course = await Course.findOne({ _id: courseId });
        if (!course) {
          return NextResponse.json(
            { message: `Course not found  or access denied: ${courseId}` },
            { status: 404 }
          );
        }
      }

      const newSummary = new Summary({
        summaryTitle,
        description,
        likes: [],
      });

      // Save the summary
      await newSummary.save();

      // Push the new summary into the course's summaries array
      if (course) {
        course.summaries.push(newSummary._id);
        await course.save();
      }

      createdSummaries.push(newSummary);
    }

    return NextResponse.json(
      {
        message: "Summaries created successfully",
        summaries: createdSummaries,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to create summaries", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(createSummaryHandler);
