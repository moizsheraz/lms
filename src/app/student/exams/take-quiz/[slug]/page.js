"use client";
import React from "react";
import TakeQuizMainPage from "@/components/student/exams/takeQuiz/takeQuizMainPage/takeQuizMainPage";
import { usePathname } from "next/navigation";

const PracticeExams = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <TakeQuizMainPage examId={id} />
    </div>
  );
};

export default PracticeExams;
