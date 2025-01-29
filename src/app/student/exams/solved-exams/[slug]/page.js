"use client";
import SolvedExamsMainPage from "@/components/student/exams/solvedExams/solvedExamsMainPage/solvedExamsMainPage";
import { usePathname } from "next/navigation";
import React from "react";

const SolvedExams = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <SolvedExamsMainPage examId={id} />
    </div>
  );
};

export default SolvedExams;
