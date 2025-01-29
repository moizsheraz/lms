import mongoose from "mongoose";
import { Course } from "../../../../../../backend/model/courses-model";
import { Exam } from "../../../../../../backend/model/exam-schema";
import { Summary } from "../../../../../../backend/model/summary-model";
import { Student } from "../../../../../../backend/model/student-model";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import connectDb from "../../../../../../backend/middleware/db";

const calculateProgress = async (request, { params }) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const { courseId } = await params;
    const email = user.email;

    // Find the student
    const student = await Student.findOne({ email });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const studentId = student._id;

    if (!studentId || !courseId) {
      return NextResponse.json(
        { message: "Missing studentId or courseId" },
        { status: 400 }
      );
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    // Fetch exams individually
    const exams = await Promise.all(
      course.exam.map(async (examId) => {
        const exam = await Exam.findById(examId);
        return exam;
      })
    );

    // Calculate total score and number of attempts for the student
    let totalScore = 0;
    let numberOfAttempts = 0;
    let maxScore = 0;

    exams.forEach((exam) => {
      maxScore = exam.questions.length * 1;

      exam?.attempts.forEach((attempt) => {
        if (String(attempt.student) === String(studentId)) {
          totalScore += attempt.score;
          numberOfAttempts++;
        }
      });
    });

    const averageScore =
      numberOfAttempts > 0 ? totalScore / numberOfAttempts : 0;

    const examProgress =
      numberOfAttempts > 0 ? (averageScore / maxScore) * 50 : 0;

    const summaries = await Promise.all(
      course.summaries.map(async (summaryId) => {
        const summary = await Summary.findById(summaryId);
        return summary;
      })
    );

    const likedSummariesCount = summaries.filter((summary) =>
      summary?.likes.includes(studentId)
    ).length;

    const summaryProgress =
      summaries.length > 0 ? (likedSummariesCount / summaries.length) * 50 : 0;

    // Total progress
    // const totalProgress = examProgress+3+ summaryProgress; 
    // (what is the purpose of adding 3 here in above line ?)
    const totalProgress = examProgress + summaryProgress;

    console.log("Exam progress:", examProgress);
    console.log("Summary progress:", summaryProgress);

    return NextResponse.json({ progress: totalProgress }, { status: 200 });
  } catch (error) {
    console.error("Error calculating progress:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const GET = connectDb(calculateProgress);
