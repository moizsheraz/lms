import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { auth } from "@/auth";
import { Exam } from "../../../../../../backend/model/exam-schema";

const getCourseGradesHandler = async (request, { params }) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const { courseId } = params;
  const studentId = user._id;

  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "exam",
        populate: {
          path: "attempts",
          match: { student: studentId },
        },
      })
      .lean();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    let totalScore = 0;
    let totalTime = 0;
    let totalAttempts = 0;
    let totalMarks = 0;
    let obtainedMarks = 0;

    course.exam.forEach((exam) => {
      const maxMarksPerExam = exam.questions.length * 10; 
      totalMarks += maxMarksPerExam;

      exam.attempts.forEach((attempt) => {
        if (attempt.student.toString() === studentId) {
          totalScore += attempt.score;
          totalTime += attempt.timeTaken || 0;
          totalAttempts += 1;
          obtainedMarks += attempt.score;
        }
      });
    });

    const averageScore = totalAttempts > 0 ? (totalScore / (totalAttempts * 10)) * 100 : 0; 
    const averageTimeInMinutes = totalAttempts > 0 ? (totalTime / totalAttempts) / 60 : 0; // Convert average time to minutes

    return NextResponse.json(
      {
        averageScore: Math.round(averageScore),
        averageTime: Math.round(averageTimeInMinutes), // Use rounded average time in minutes
        totalMarks,
        obtainedMarks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error calculating course grades:", error);
    return NextResponse.json(
      { message: "Failed to calculate course grades" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getCourseGradesHandler);
