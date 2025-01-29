import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Student } from "../../../../../../backend/model/student-model";
import { auth } from "@/auth";

const getStudentMetricsHandler = async (request, context) => {
  const session = await auth();
  const user = session?.user;

  if (!user || !user.email) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const params = await context.params; // Await params
  const { courseId } = params;
  const email = user.email;

  const student = await Student.findOne({ email });
  if (!student) {
    return NextResponse.json({ message: "Student not found" }, { status: 404 });
  }

  const studentId = student._id;

  try {
    const course = await Course.findById(courseId)
      .populate({
        path: "exam",
        populate: {
          path: "attempts",
        },
      })
      .lean();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const exams = course.exam;

    // Initialize metrics
    let totalScore = 0;
    let totalAttempts = 0;
    let totalTimeTaken = 0;
    let perfectTestCount = 0;
    let maxPossibleScore = 0; // New metric to calculate grade percentage

    // Process each exam
    exams.forEach((exam) => {
      const maxScoreForExam = exam.questions.length; // Assuming each question = 1 point
      maxPossibleScore += maxScoreForExam; // Accumulate maximum possible score

      // Filter attempts for the specific student
      const studentAttempts = exam.attempts.filter(
        (attempt) => attempt.student.toString() === studentId.toString()
      );

      studentAttempts.forEach((attempt) => {
        totalAttempts++;
        totalScore += attempt.score;
        totalTimeTaken += attempt.timeTaken; // Sum up time for each attempt

        if (attempt.score === maxScoreForExam) {
          perfectTestCount++;
        }
      });
    });

    // Calculate metrics
    const averageGrade =
      totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(2) : 0;
    const averageTimeToAnswer =
      totalAttempts > 0 ? (totalTimeTaken / totalAttempts).toFixed(2) : 0; // Use totalAttempts for averaging time
    const averageGradePercentage =
      maxPossibleScore > 0 ? ((totalScore / maxPossibleScore) * 100).toFixed(2) : 0; // Calculate grade percentage

    return NextResponse.json(
      {
        perfectTests: perfectTestCount,
        averageGrade: parseFloat(averageGradePercentage),
        averageTimeToAnswer: parseFloat(averageTimeToAnswer),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching student metrics:", error);
    return NextResponse.json(
      { message: "Failed to fetch metrics" },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getStudentMetricsHandler);
