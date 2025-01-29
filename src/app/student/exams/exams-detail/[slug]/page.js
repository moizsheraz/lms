"use client";
import BreadCrumb from "@/components/courseDetail/breadcrumb/breadCrumb";
import PracticeExamCard from "@/components/student/exams/examDetail/practiceExamCard/practiceExamCard";
import SolvedExamCard from "@/components/student/exams/examDetail/solvedExamCard/solvedExamCard";
import { usePathname } from "next/navigation";
import React from "react";

const ExamsDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div className="w-full h-full bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20 lg:h-screen">
      <BreadCrumb />
      <div className="w-full lg:w-[40%] mx-auto bg-white p-2 border rounded-md">
        <SolvedExamCard examId={id} />
        <PracticeExamCard examId={id} />
      </div>
    </div>
  );
};

export default ExamsDetail;
