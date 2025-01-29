"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SolveQuestionCard from "../../solveQuestionCard/solveQuestionCard";
import BreadCrumb from "@/components/courseDetail/breadcrumb/breadCrumb";
import axios from "axios";
import {
  fetchExamWithQuestions,
  fetchWrongQuestions,
  reattemptWrongQuestions,
} from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const TakeQuizMainPage = ({ examId }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let examData;
        if (examId === "wrong-questions") {
          const storedCourseId = localStorage.getItem("courseId");
          if (!storedCourseId) {
            throw new Error("Course ID not found in localStorage");
          }
      
          // Pass courseId to fetchWrongQuestions
          const examData = await fetchWrongQuestions(storedCourseId);
          console.log("Exam Data:", examData);
      
          setQuestions(
            examData.wrongQuestions.map((item) => item.question) || []
          );
        } else {
          examData = await fetchExamWithQuestions(examId);
          console.log("e", examData);
          setQuestions(examData.exam.questions || []);
        }

        if (!startTime) {
          setStartTime(new Date());
        }
      } catch (error) {
        console.error("Error fetching exam questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [examId, startTime]);

  const handleOptionChange = (questionId, optionIndex) => {
    setSelectedOption(optionIndex);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = async () => {
    if (selectedOption == null) return;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(
        answers[questions[currentQuestionIndex + 1]?._id] || null
      );
    } else {
      await submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(
        answers[questions[currentQuestionIndex - 1]?._id] || null
      );
    }
  };

  const submitQuiz = async () => {
    setSubmitting(true);
    const formattedAnswers = Object.entries(answers).map(
      ([questionId, studentAnswer]) => ({
        questionId,
        studentAnswer,
      })
    );

    try {
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000);

      if (examId.includes("wrong-questions")) {
        const response = await reattemptWrongQuestions(formattedAnswers);
        console.log("Reattempted wrong questions:", response);
        router.push(`/student/profile`);
      } else {
        const response = await axios.post("/api/exam/attempt", {
          examId,
          answers: formattedAnswers,
          startTime: startTime.toISOString(),
          timeTaken,
        });
        console.log("Quiz submitted successfully:", response.data);
        router.push(`/student/course/exam-marks/${examId}`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error.response?.data || error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingScreen />;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;

  return (
    <div className="w-full bg-gradient-to-t from-btnColorOne to-btnColor p-6">
      <div className="lg:flex block items-center mb-8">
        <div className="ml-[520px] mt-14">
          <BreadCrumb />
        </div>
        <p className="text-white font-black text-center my-2 lg:my-0 text-2xl">
          {t("takeExam.title1")}
        </p>
      </div>

      <div className="flex justify-center text-white text-lg">
        <p>
          {currentQuestionIndex + 1} {t("takeExam.of")} {questions.length}
        </p>
      </div>

      <div className="w-[250px] mx-auto flex bg-white h-2 rounded-lg my-4">
        <div
          className="h-2 bg-sky-400 rounded-lg"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-center">
        {currentQuestion && ( 
          <SolveQuestionCard
           hintImage={currentQuestion.hintImage}
           questionImage={currentQuestion.questionImage}
            question={currentQuestion.questionText}
            options={currentQuestion.options}
            hint={currentQuestion.hint}
            correctIndex={currentQuestion.correctIndex}
            selectedOption={selectedOption}
            onSelectOption={(selectedOption) =>
              handleOptionChange(currentQuestion._id, selectedOption)
            }
          />
        )}
      </div>

      <div className="flex items-center justify-center gap-2 my-4">
        <button
          className="bg-white rounded-md p-2 text-red-600 w-28 text-sm font-bold"
          onClick={() => router.push(`/student/exams/exams-detail/${examId}`)}
        >
          {t("closeBtn")}
        </button>
        <button
          className="bg-white rounded-md p-2 text-blue-600 w-28 text-sm font-bold"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          {t("teacherCreateCourseStep1.previous")}
        </button>
        <button
          className="bg-white rounded-md p-2 text-btnColor w-28 text-sm font-bold"
          onClick={handleNext}
          disabled={selectedOption == null || submitting}
        >
          {submitting
            ? t("pleaseWait")
            : currentQuestionIndex < questions.length - 1
            ? t("teacherCreateCourseStep1.next")
            : t("teacherCreateCourseStep4no2.submit")}
        </button>
      </div>
    </div>
  );
};

export default TakeQuizMainPage;
