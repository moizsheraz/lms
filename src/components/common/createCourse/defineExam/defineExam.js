"use client";
import React, { useState } from "react";
import SummarytitleCard from "../summarytitleCard/summarytitleCard";
import { FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import DefineQuestion from "../defineQuestion/defineQuestion";
import createExam from "@/app/utils/teacher/courses/api";
import { t } from "i18next";

const DefineExam = ({ courseId }) => {
  const [exams, setExams] = useState([]);
  const [examName, setExamName] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To store error messages

  const handleAddExam = () => {
    if (examName) {
      setExams((prevExams) => [
        ...prevExams,
        { name: examName, questions: [] },
      ]);
      setExamName("");
    }
  };

  const handleRemoveExam = (examName) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.name !== examName));
  };

  const handleAddQuestionToExam = (examName, question) => {
    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam.name === examName
          ? { ...exam, questions: [...exam.questions, question] }
          : exam
      )
    );
    setVisibleQuestions((prev) => ({
      ...prev,
      [examName]: true,
    }));
    setSelectedExam(null);
  };

  const toggleQuestionVisibility = (examName) => {
    setVisibleQuestions((prev) => ({
      ...prev,
      [examName]: !prev[examName],
    }));
  };

  // Function to handle save/exam creation
  const handleSaveExams = async () => {
    try {
      setLoading(true);
      setError(""); // Reset error message before API call

      // Prepare the exams data for submission
      const examsData = exams.map((exam) => ({
        courseId,
        name: exam.name,
        questions: exam.questions,
      }));

      const result = await createExam(examsData);

      if (result.message === "Exams and questions created successfully and linked to courses") {
        alert("Exams created successfully!");
        window.location.reload();
      } else {
        setError(result.message); // Set the error message if creation fails
      }
    } catch (error) {
      setError("Failed to create exams. Please try again later.");
      console.error("Error saving exams:", error);
    } finally {
      setLoading(false); // Turn off loading state after the request is complete
    }
  };

  return (
    <div className="text-headingColor p-2">
      <label htmlFor="examName">{t("teacherCreateCourseStep4no1.examName")}</label>
      <span className="text-red-500 text-xs mx-1">*</span>
      <input
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder={t("teacherCreateCourseStep4no1.examName")}
        id="examName"
      />

      <button
        type="button"
        onClick={handleAddExam}
        className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
      >
        {t("teacherCreateCourseStep2.add")}
      </button>

      <p className="text-headingColor my-4">{t("teacherCreateCourseStep3.defineExam")}</p>

      {exams.length === 0 ? (
        <p className="text-gray-500 italic">{t("teacherCreateCourseStep3.noCourse")}</p>
      ) : (
        exams.map((exam, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-center">
              <SummarytitleCard
                heading={exam.name}
                button="Questions"
                onButtonClick={() => setSelectedExam(exam.name)}
              />

              <button
                onClick={() => handleRemoveExam(exam.name)}
                className="text-red-500 flex items-center space-x-2 mt-2 hover:text-red-700"
              >
                <FaTrashAlt className="text-lg" />
              </button>
            </div>

            {selectedExam === exam.name && (
              <DefineQuestion
                selectedExam={exam.name}
                onAddQuestion={handleAddQuestionToExam}
              />
            )}

            {/* Display questions for this exam */}
            {exam.questions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-headingColor mb-2 flex items-center">
                  Questions
                  <button
                    className="ml-2 text-lg text-gray-600 hover:text-gray-800"
                    onClick={() => toggleQuestionVisibility(exam.name)}
                  >
                    {visibleQuestions[exam.name] ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </h3>
                {visibleQuestions[exam.name] && (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    {exam.questions.map((question, qIndex) => (
                      <div
                        key={qIndex}
                        className="p-4 border rounded-lg bg-white shadow-md relative flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-lg font-medium">{question.question}</p>
                          {question.questionImage && (
                            <img
                              src={question.questionImage}
                              alt="Question"
                              className="w-12 h-12 object-cover rounded-full border"
                            />
                          )}
                        </div>
                        <div className="mt-auto">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className={`p-2 border rounded-md mt-1 flex justify-between items-center ${question.correctIndex === oIndex
                                  ? "bg-green-100 border-green-400"
                                  : "border-gray-300"
                                }`}
                            >
                              <span>{option}</span>
                              {question.correctIndex === oIndex && (
                                <span className="text-green-600 font-bold text-lg">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        {question.hint && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Hint: {question.hint}</p>
                            {question.hintImage && (
                              <img
                                src={question.hintImage}
                                alt="Hint"
                                className="w-12 h-12 object-cover rounded-full border mt-2"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}

      {/* Save Exams Button */}
      <button
        onClick={handleSaveExams}
        disabled={loading}
        className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
      >
        {loading ? t("saving") : t("saveExam")}
      </button>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default DefineExam;
