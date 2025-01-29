"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const SolvedExamCard = ({ examId }) => {
  const { t } = useTranslation();
  return (
    <Link href={`/student/exams/solved-exams/${examId}`}>
      <div className="w-full bg-cyan-100 rounded-md p-5 mb-2">
        <div className="flex items-center justify-center">
          <Image
            className="w-32 h-32"
            src="/images/png/solved.png"
            height={1000}
            width={1000}
            alt="Solved Exams"
          />
        </div>
        <p className="text-headingColor text-lg font-bold my-1 text-center">
          {t("answerAndLearn")}
        </p>
      </div>
    </Link>
  );
};

export default SolvedExamCard;
