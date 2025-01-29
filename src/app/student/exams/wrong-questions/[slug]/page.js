"use client";
import React from "react";
import { usePathname } from "next/navigation";
import WrongQuestionsMainPage from "@/components/student/exams/wrongQuestions/wrongQuestionsMainPage/wrongQuestionsMainPage";

const WrongQuestions = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <WrongQuestionsMainPage examId={id} />
    </div>
  );
};

export default WrongQuestions;
