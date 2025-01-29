"use client";
import React, { useEffect, useState } from "react";
import CircularScoreBar from "@/components/common/circularScoreBar/circularScoreBar";
import BreadCrumb from "@/components/courseDetail/breadcrumb/breadCrumb";
import { fetchExamMarks } from "@/app/utils/student/courses/api";
import Link from "next/link";
import Confetti from "react-confetti"; // Import Confetti component
import { useTranslation } from "react-i18next";

const ExamMarksMainPage = ({ examId }) => {
  const { t } = useTranslation();
  const [score, setScore] = useState(null);
  const [maxScore, setMaxScore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false); // State to control confetti

  useEffect(() => {
    const getExamMarks = async () => {
      try {
        const data = await fetchExamMarks(examId);
        setScore(data.obtainedMarks);
        setMaxScore(data.totalMarks);
        setShowConfetti(true); // Show confetti when exam marks are fetched

        // Hide confetti after 7 seconds
        setTimeout(() => {
          setShowConfetti(false);
        }, 12000); // 7 seconds
      } catch (error) {
        console.error("Failed to fetch exam marks:", error);
      }
    };

    getExamMarks();
  }, [examId]);

  return (
    <div className="h-screen w-full bg-gradient-to-t from-btnColorOne to-btnColor p-6">
      {showConfetti && (
        <Confetti
          width={window.innerWidth} // Set confetti width
          height={window.innerHeight} // Set confetti height
        />
      )}
      <div className="mt-12">
        <BreadCrumb />
      </div>
      <p className="text-white font-black text-center w-80 mx-auto my-2 text-2xl">
       {t("examMarks.title")}
      </p>
      <div className="flex justify-center items-center my-16">
        {/* Render CircularScoreBar only if scores are loaded */}
        {score !== null && maxScore !== null ? (
          <CircularScoreBar score={score} maxScore={maxScore} />
        ) : (
          <p className="text-white text-center">{t("loading")}</p>
        )}
      </div>
      <div className="flex items-center justify-center my-4">
        {score !== null && maxScore !== null && score < maxScore && (
          <Link
            href={`/student/exams/wrong-questions/${examId}`}
            className="bg-white rounded-md p-2 text-btnColor w-auto text-sm font-bold"
          >
            {t("examMarks.button1")}
          </Link>
        )}
      </div>
      <div className="flex items-center justify-center my-4">
        <Link
          href="/student/enrolled-courses"
          className="text-white w-28 text-sm font-bold text-center"
        >
            {t("examMarks.button3")}
        </Link>
      </div>
    </div>
  );
};

export default ExamMarksMainPage;
