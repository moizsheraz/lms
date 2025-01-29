"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon
import axios from "axios";

const ExamsCard = ({
  heading,
  description,
  isPurchased,
  examId,
  isStudent,
  isTeacher,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [questions, setQuestions] = useState([]); // Store the fetched questions
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [areQuestionsVisible, setAreQuestionsVisible] = useState(false); // Track visibility of the questions

  // Function to fetch the exam questions
  const fetchExamQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/admin/exam/fetch", { examId });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to fetch exam questions.");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetching questions if it's a teacher or purchased by student
  useEffect(() => {
    if (isTeacher || (isPurchased && isStudent)) {
      fetchExamQuestions();
    }
  }, [isTeacher, isPurchased, isStudent, examId]);

  // Function to toggle the visibility of the exam questions
  const toggleQuestionsVisibility = () => {
    setAreQuestionsVisible((prevState) => !prevState);
  };

  const cardContent = (
    <div
      className="relative cursor-pointer w-full p-2 sm:p-3 border rounded-md my-2 flex items-center justify-between text-xs sm:text-sm font-bold text-headingColor transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col">
        <p>{heading}</p>
        {isPurchased ? "" : <p className="text-btnColor">{description}</p>}
      </div>
      {isPurchased ? (
        <p className="text-btnColor">{description}</p>
      ) : (
        <FaLock className="text-black" />
      )}

      {/* Tooltip for locked content when hovered */}
      {!isPurchased && isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] bg-lightCard text-headingColor border border-gray-300 rounded-md shadow-lg p-2 text-xs sm:text-sm text-center">
          <p className="font-bold text-red-500">Unlock this exam!</p>
          <p>You need to purchase this exam to access the content.</p>
        </div>
      )}
    </div>
  );

  return (
    <div>
      {/* Render the card, and make it clickable if purchased */}
      {isPurchased && isStudent ? (
        <Link href={`/student/exams/exams-detail/${examId}`}>
          {cardContent}
        </Link>
      ) : (
        <div>{cardContent}</div>
      )}

      {/* Show the exam questions if the user is a teacher or has purchased the exam */}
      {(isTeacher && isPurchased) && questions.length > 0 && (
        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-lg font-bold">Exam Questions</h3>

          {/* Toggle button to show/hide questions */}
          <button
            onClick={toggleQuestionsVisibility}
            className="py-2 px-6 bg-blue-600 text-white rounded-md mb-4 transition duration-300 ease-in-out transform hover:bg-blue-700"
          >
            {areQuestionsVisible ? "Hide Questions" : "Show Questions"}
          </button>

          {isLoading ? (
            <p className="text-gray-500">Loading questions...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : areQuestionsVisible && questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <p className="font-semibold text-md text-gray-800">
                    {question.questionText}
                  </p>
                  <div className="mt-2 space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`flex items-center py-2 px-4 rounded-md cursor-pointer transition-all duration-200 ${
                          optionIndex === question.correctIndex
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100"
                        }`}
                      >
                        <span className="mr-2 font-semibold">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                      </div>
                    ))}
                  </div>
                  {question.hint && (
                    <p className="mt-2 text-sm text-gray-500">
                      Hint: {question.hint}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ExamsCard;
