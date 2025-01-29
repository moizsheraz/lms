import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { auth } from "../../../../../auth";
import { Wrong } from "../../../../../../backend/model/wrong-questions";
import { Student } from "../../../../../../backend/model/student-model";
import { Course } from "../../../../../../backend/model/courses-model";
import { Question } from "../../../../../../backend/model/question-model";

const fetchWrongQuestionsHandler = async (request, { params }) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const student = await Student.findOne({ email: user.email }).lean();
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const { courseId } = params;
    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const course = await Course.findById(courseId).lean().exec();
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const wrongQuestions = await Wrong.find({
      student: student._id,
      exam: { $in: course.exam },
    }).populate("question").lean().exec();

    return NextResponse.json(
      {
        status: "success",
        message: "Fetched wrong questions successfully",
        wrongQuestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching wrong questions:", error);
    return NextResponse.json(
      { message: "Failed to fetch wrong questions", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(fetchWrongQuestionsHandler);
