import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Question } from "../../../../../backend/model/question-model";
import { Wrong } from "../../../../../backend/model/wrong-questions";
import { auth } from "../../../../auth";
import { Student } from "../../../../../backend/model/student-model";
import { Exam } from "../../../../../backend/model/exam-schema";

const attemptExamHandler = async (request) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const student = await Student.findOne({ email: user.email });
    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    const studentId = student._id;
    const data = await request.json();
    const { examId, answers, startTime, timeTaken } = data;

    // Check for required fields
    if (!examId || !answers || !startTime) {
      return NextResponse.json(
        { message: "Exam ID, Answers, and Start Time are required." },
        { status: 400 }
      );
    }

    let score = 0;
    const wrongQuestions = []; // Array to store all details of wrong questions

    // Evaluate answers
    for (const answer of answers) {
      const { questionId, studentAnswer } = answer;
      const question = await Question.findById(questionId);

      if (!question) {
        continue;
      }

      if (studentAnswer === question.correctIndex) {
        // Correct answer, increase score
        score += 1;

        // If the answer was previously wrong, remove it from wrong collection
        await Wrong.deleteOne({
          student: studentId,
          exam: examId,
          question: questionId,
        });
      } else {
        // Wrong answer, add to wrong collection if not already there
        const existingWrongQuestion = await Wrong.findOne({
          student: studentId,
          exam: examId,
          question: questionId,
        });

        if (!existingWrongQuestion) {
          const wrongQuestion = new Wrong({
            student: studentId,
            exam: examId,
            question: questionId,
            studentAnswer,
          });

          await wrongQuestion.save();
        }

        // Add all details of the current question and student answer to wrongQuestions
        wrongQuestions.push({
          questionId,
          questionText: question.questionText,
          questionImage: question.questionImage,
          options: question.options,
          hint: question.hint,
          correctAnswer: question.options[question.correctIndex],
          studentAnswer, // Include the student's answer
        });
      }
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    // Check if the student has already attempted this exam
    const existingAttemptIndex = exam.attempts.findIndex(
      (attempt) => attempt.student.toString() === studentId.toString()
    );

    const newAttempt = {
      student: studentId,
      score,
      answers: answers.map((answer) => ({
        questionId: answer.questionId,
        answer: answer.studentAnswer,
      })),
      dateTaken: new Date(),
      startTime: new Date(startTime),
      timeTaken,
    };

    if (existingAttemptIndex !== -1) {
      exam.attempts[existingAttemptIndex] = newAttempt;
    } else {
      exam.attempts.push(newAttempt);
    }

    await exam.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Exam attempted successfully",
        score,
        wrongQuestions, 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing exam attempt:", error);
    return NextResponse.json(
      { message: "Failed to process exam attempt", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = connectDb(attemptExamHandler);
