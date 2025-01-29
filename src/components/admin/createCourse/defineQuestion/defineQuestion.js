"use client";
import React, { useState } from "react";
import QuestionsCard from "@/components/student/exams/questionCard/questionCard";
import { FaCamera } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DefineQuestion = ({ register, setValue, getValues, selectedExam }) => {
  const { t } = useTranslation();

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("questionImage", reader.result); // Store the base64 data in form state
        setPreviewUrl(reader.result); // Set the preview for displaying
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddQuestion = () => {
    const questionText = getValues("questionText");
    const options = [
      getValues("option1"),
      getValues("option2"),
      getValues("option3"),
      getValues("option4"),
    ];
    const correctIndex = parseInt(getValues("correctAnswer")); // This will be the index selected from the dropdown
    const hint = getValues("writeHint"); // Get the hint from form state

    if (questionText && options.length === 4 && selectedExam) {
      const existingQuestions = getValues("questions") || [];
      const newQuestion = {
        question: questionText,
        options,
        correctIndex,
        questionImage: getValues("questionImage"), // Include the base64 image data
        hint, // Include the hint in the question object
      };

      // Find the index of the selected exam
      const exams = getValues("exams") || [];
      const examIndex = exams.findIndex((exam) => exam.name === selectedExam);
      if (examIndex !== -1) {
        exams[examIndex].questions.push(newQuestion); // Add question to the selected exam
        setValue("exams", exams); // Update the exams state
      }

      // Clear the form fields for the next question
      setValue("questionText", "");
      setValue("option1", "");
      setValue("option2", "");
      setValue("option3", "");
      setValue("option4", "");
      setValue("correctAnswer", ""); // Reset the correct answer dropdown
      setValue("questionImage", ""); // Clear the stored image data
      setValue("writeHint", ""); // Clear the hint input
      setPreviewUrl(null); // Clear the preview
    }
  };

  return (
    <div>
      {selectedExam ? (
        <>
          <label htmlFor="questionImage">Upload Question Image</label>
          <div className="relative w-full h-28 mt-1 mb-4 border rounded-md cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
             <div className="text-sm my-1 text-red-500">
            <span>{t("imageSize")}</span>
          </div>
            {!previewUrl ? (
              <>
                <FaCamera className="text-paraColor w-10 h-10 mx-auto mt-6" />
                <p className="text-paraColor text-xs my-1 text-center">
                  Tap to Choose Image
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="w-16 h-16 object-cover"
                />
                <p className="text-xs mt-2 text-center text-paraColor">
                  Image Selected
                </p>
              </div>
            )}
          </div>

          {/* Question and options input fields */}
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="w-full">
              <label htmlFor="questionText">Question</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <input
                {...register("questionText")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                placeholder="Question"
                id="questionText"
              />
            </div>
            <div className="w-full">
              <label htmlFor="option1">Option 1</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <input
                {...register("option1")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                placeholder="Option 1"
                id="option1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 w-full">
            <div className="w-full">
              <label htmlFor="option2">Option 2</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <input
                {...register("option2")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                placeholder="Option 2"
                id="option2"
              />
            </div>
            <div className="w-full">
              <label htmlFor="option3">Option 3</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <input
                {...register("option3")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                placeholder="Option 3"
                id="option3"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 w-full">
            <div className="w-full">
              <label htmlFor="option4">Option 4</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <input
                {...register("option4")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                placeholder="Option 4"
                id="option4"
              />
            </div>
            <div className="w-full">
              <label htmlFor="correctAnswer">Correct Answer</label>
              <span className="text-red-500 text-xs mx-1">*</span>
              <select
                {...register("correctAnswer")}
                className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
                id="correctAnswer"
              >
                <option value="0">Select Correct Answer</option>
                <option value="0">Option 1</option>
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
                <option value="3">Option 4</option>
              </select>
            </div>
          </div>
          <div>
            <span className="text-xs text-red-500">
              If you don't select a correct answer, the system will choose the
              first option as the correct answer.
            </span>
          </div>

          <label htmlFor="writehint">Write a Hint</label>
          <span className="text-red-500 text-xs mx-1">*</span>
          <textarea
            {...register("writeHint")}
            rows={3}
            className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
            placeholder="Write a hint..."
            id="writeHint"
          />

          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
          >
            Add Question
          </button>

          <p className="text-headingColor text-lg font-bold my-2">
            Defined Questions
          </p>
          {(getValues("exams") || []).map((exam) => {
            if (exam.name === selectedExam) {
              return exam.questions.map((q, index) => (
                <QuestionsCard
                  key={index}
                  question={q.question}
                  options={q.options}
                  hint={q.hint}
                  correctIndex={q.correctIndex}
                  isCreate={true}
                />
              ));
            }
            return null;
          })}

          {!selectedExam && (
            <p className="text-red-600">
              No exam selected. Please select an exam to add questions.
            </p>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-2xl font-semibold text-gray-800">
              {t("teacherCreateCourseStep4no2.finishExam")}
            </p>
            <p className="mt-2 text-gray-600">
              {t("teacherCreateCourseStep4no2.finishExamDescription")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefineQuestion;
