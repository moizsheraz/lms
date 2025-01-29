import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Exam } from "../../../../../backend/model/exam-schema";
import { auth } from "../../../../auth";
import { Student } from "../../../../../backend/model/student-model";
import { Question } from "../../../../../backend/model/question-model";

const getExamMarksHandler = async (request) => {
  try {
    const session = await auth();
    const user = session?.user;
    console.log("Authenticated user details:", user);

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    let userId = user.id || user._id;
    if (!userId) {
      const foundUser = await Student.findOne({ email: user.email });
      if (!foundUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      userId = foundUser._id;
    }

    console.log("Authenticated User ID:", userId);

    const { examId } = await request.json();
    if (!examId) {
      return NextResponse.json(
        { message: "Exam ID is required" },
        { status: 400 }
      );
    }

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    const totalMarks = exam.questions.length;

    const studentAttempt = exam.attempts.find(
      (attempt) => attempt.student.toString() === userId.toString()
    );

    if (!studentAttempt) {
      console.log("Student ID:", userId);
      console.log("Exam Attempts:", exam.attempts);
      return NextResponse.json(
        { message: "No attempt found for this student" },
        { status: 404 }
      );
    }

    const obtainedMarks = studentAttempt.score;

    const wrongQuestions = [];

    console.log("obtainedMarks", obtainedMarks, "wr", wrongQuestions);

    for (const answer of studentAttempt.answers) {
      const question = await Question.findById(answer.questionId);
      if (question) {
        console.log("Answer Given:", answer.answer, typeof answer.answer);
        console.log(
          "Correct Answer Index:",
          question.correctIndex,
          typeof question.correctIndex
        );

        if (Number(answer.answer) !== question.correctIndex) {
          wrongQuestions.push({
            questionText: question.questionText,
            questionImage: question.questionImage,
            options: question.options,
            hint: question.hint,
            hintImage: question.hintImage,
            studentAnswer: question.options[Number(answer.answer)],
            correctAnswer: question.options[question.correctIndex],
          });
        }
      }
    }

    return NextResponse.json(
      {
        status: "success",
        totalMarks,
        obtainedMarks,
        wrongQuestions,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching exam marks:", error);
    return NextResponse.json(
      { message: "Failed to fetch exam marks", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(getExamMarksHandler);
