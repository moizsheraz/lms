"use client";
import React from "react";
import ExamMarksMainPage from "@/components/student/examMarks/examMarksMainPage/examMarksMainPage";
import { usePathname } from "next/navigation";

const ExamMarks = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <ExamMarksMainPage examId={id} />
    </div>
  );
};

export default ExamMarks;
