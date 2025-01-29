import { NextResponse } from "next/server";
import connectDb from "../../../../../../backend/middleware/db";
import { Course } from "../../../../../../backend/model/courses-model";
import { Student } from "../../../../../../backend/model/student-model";
import { Exam } from "../../../../../../backend/model/exam-schema";
import { auth } from "../../../../../auth";
import { Question } from "../../../../../../backend/model/question-model";

const getCourseDetailsHandler = async (request, { params }) => {
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

    const course = await Course.findById(courseId)
      .populate({
        path: 'reviews.student',
        select: 'firstName lastName',
      })
      .lean()
      .exec();

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    const responseCourse = {
      _id: course._id,
      name: course.name,
      description: course.description,
      price: course.price,
      courseImage: course.courseImage,
      topic: course.topic,
      subtopics: course.subtopics,
      subsubtopics: course.subsubtopics,
      theoreticalMaterial: course.theoreticalMaterial,
      auxiliaryMaterial: course.auxiliaryMaterial,
      isActive: course.isActive,
      reviews: course.reviews.map(review => ({
        student: {
          firstName: review.student.firstName,
          lastName: review.student.lastName,
        },
        rating: review.rating,
        reviewText: review.reviewText,
      })),
    };

    let totalQuestions = 0;
    let attemptedQuestions = 0;
    let totalScore = 0;
    let examCount = 0;
    let totalTimeTaken = 0;
    let totalAttemptsWithTime = 0;

    for (const examId of course.exam) {
      const exam = await Exam.findById(examId).populate('questions').lean().exec();
      if (exam) {
        totalQuestions += exam.questions.length;

        const attempts = await Exam.findById(examId)
          .populate('attempts', null, { student: student._id })
          .lean()
          .exec();

        const studentAttempt = attempts.attempts.find(attempt => attempt.student.equals(student._id));
        if (studentAttempt) {
          attemptedQuestions += studentAttempt.answers.length;
          totalScore += studentAttempt.score;
          examCount++;

          // Calculate time taken for the attempt
          if (studentAttempt.startTime && studentAttempt.dateTaken) {
            const startTime = new Date(studentAttempt.startTime);
            const dateTaken = new Date(studentAttempt.dateTaken);
            const timeTaken = (dateTaken - startTime) / 1000; // Convert to seconds
            totalTimeTaken += timeTaken;
            totalAttemptsWithTime++;
          }
        }
      }
    }

    const averageGrade = examCount > 0 ? (totalScore / examCount).toFixed(2) : null;
    const averageTimeTaken = totalAttemptsWithTime > 0 ? (totalTimeTaken / totalAttemptsWithTime).toFixed(2) : null;

    return NextResponse.json(
      {
        message: "Course details retrieved successfully",
        course: {
          ...responseCourse,
          averageGrade: averageGrade,
          totalQuestions: totalQuestions,
          attemptedQuestions: attemptedQuestions,
          averageTimeTaken: averageTimeTaken, 
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving course details:", error);
    return NextResponse.json(
      { message: "Failed to retrieve course details", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getCourseDetailsHandler);
