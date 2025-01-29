import { NextResponse } from "next/server";
import connectDb from "../../../../../backend/middleware/db";
import { Exam } from "../../../../../backend/model/exam-schema";
import { Question } from "../../../../../backend/model/question-model";
import { Readable } from "stream";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import path from "path";

const pump = promisify(pipeline);

const editExamHandler = async (request) => {
  const { examId, name, updatedQuestions } = await request.json();

  if (!examId || !updatedQuestions || !Array.isArray(updatedQuestions)) {
    return NextResponse.json(
      {
        message:
          "Invalid request data, examId and updatedQuestions are required",
      },
      { status: 400 }
    );
  }

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    if (name) {
      exam.name = name;
    }

    for (let updatedQuestion of updatedQuestions) {
      const { _id, questionText, hint, options, correctIndex, questionImage, hintImage } =
        updatedQuestion;

      const question = await Question.findById(_id);
      if (!question) {
        return NextResponse.json(
          { message: `Question with ID ${_id} not found` },
          { status: 404 }
        );
      }

      question.questionText = questionText || question.questionText;
      question.hint = hint || question.hint;
      question.options = options || question.options;
      question.correctIndex = correctIndex || question.correctIndex;

      // Process question image
      if (questionImage && questionImage.startsWith("data:image/")) {
        // If questionImage is in base64, save it as a new file
        const questionImgData = questionImage.split(",")[1];
        const questionImgBuffer = Buffer.from(questionImgData, "base64");
        const uniqueQuestionFilename = `question_${Date.now()}.png`;
        const questionImagePath = path.join("./public/questionImages", uniqueQuestionFilename);

        await pump(Readable.from(questionImgBuffer), fs.createWriteStream(questionImagePath));
        question.questionImage = questionImagePath.replace("./public", "");
      } else if (questionImage) {
        // Keep the existing image path
        question.questionImage = questionImage;
      }

      // Process hint image
      if (hintImage && hintImage.startsWith("data:image/")) {
        // If hintImage is in base64, save it as a new file
        const hintImgData = hintImage.split(",")[1];
        const hintImgBuffer = Buffer.from(hintImgData, "base64");
        const uniqueHintFilename = `hint_${Date.now()}.png`;
        const hintImagePath = path.join("./public/hintImage", uniqueHintFilename);

        await pump(Readable.from(hintImgBuffer), fs.createWriteStream(hintImagePath));
        question.hintImage = hintImagePath.replace("./public", "");
      } else if (hintImage) {
        // Keep the existing image path
        question.hintImage = hintImage;
      }

      await question.save();
    }

    exam.questions = updatedQuestions.map((q) => q._id);

    await exam.save();

    return NextResponse.json(
      {
        message: "Exam updated successfully",
        exam,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating exam:", error);
    return NextResponse.json(
      { message: "Failed to update exam" },
      { status: 500 }
    );
  }
};

export const POST = connectDb(editExamHandler);
