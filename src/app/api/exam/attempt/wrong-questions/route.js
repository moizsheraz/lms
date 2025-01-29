import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { Wrong } from "../../../../../../backend/model/wrong-questions";
import { Question } from "../../../../../../backend/model/question-model";
import { Student } from "../../../../../../backend/model/student-model";
import { Exam } from "../../../../../../backend/model/exam-schema";
import connectDb from "../../../../../../backend/middleware/db";

const reattemptWrongQuestionsHandler = async (request) => {
  try {
    // Authenticate user
    const session = await auth();
    const user = session?.user;

    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Fetch student details
    const student = await Student.findOne({ email: user.email });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const studentId = student._id;
    const data = await request.json();
    const { reattempts } = data;

    if (!reattempts || !Array.isArray(reattempts)) {
      return NextResponse.json(
        { message: "Reattempts data is required." },
        { status: 400 }
      );
    }

    const updatedResults = [];

    // Process each reattempt
    for (const attempt of reattempts) {
      const { questionId, studentAnswer } = attempt;
      console.log(
        "Reattempting question:",
        questionId,
        "with answer:",
        studentAnswer
      );

      if (!questionId || !studentAnswer) {
        updatedResults.push({
          questionId,
          result: "invalid",
          message: "Missing questionId or studentAnswer",
        });
        continue;
      }

      // Fetch the wrong question record
      const wrongQuestion = await Wrong.findOne({
        student: studentId,
        question: questionId,
      });
      if (!wrongQuestion) {
        updatedResults.push({
          questionId,
          result: "not_found",
          message: "No wrong question record found for this student.",
        });
        continue;
      }

      // Fetch the actual question to get the correct answer index
      const question = await Question.findById(questionId);
      if (!question) {
        updatedResults.push({
          questionId,
          result: "question_not_found",
          message: "Question not found.",
        });
        continue;
      }

      // Convert studentAnswer to number and compare with correctIndex
      const isCorrect = Number(studentAnswer) === question.correctIndex;

      if (isCorrect) {
        // Remove from wrong questions
        await Wrong.deleteOne({ _id: wrongQuestion._id });

        // Optionally, update exam score here
        const exam = await Exam.findById(wrongQuestion.exam);
        const attemptIndex = exam.attempts.findIndex(
          (attempt) => String(attempt.student) === String(studentId)
        );

        if (attemptIndex !== -1) {
          exam.attempts[attemptIndex].score += 1;
          await exam.save();
        }

        updatedResults.push({
          questionId,
          result: "correct",
          message: "Correct answer, removed from wrong questions.",
        });
      } else {
        updatedResults.push({
          questionId,
          result: "incorrect",
          message: "Incorrect answer, still in wrong questions.",
        });
      }
    }

    return NextResponse.json(
      {
        status: "success",
        message: "Reattempted wrong questions",
        updatedResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reattempting wrong questions:", error);
    return NextResponse.json(
      { message: "Failed to reattempt wrong questions", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(reattemptWrongQuestionsHandler);
