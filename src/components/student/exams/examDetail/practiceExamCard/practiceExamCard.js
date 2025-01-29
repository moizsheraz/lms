import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const PracticeExamCard = ({ examId }) => {
  const { t } = useTranslation();

  return (
    <Link href={`/student/exams/take-quiz/${examId}`}>
      <div className="w-full bg-cyan-100 rounded-md p-5">
        <div className="flex items-center justify-center">
          <Image
            className="w-32 h-32"
            src="/images/png/practice.png"
            height={1000}
            width={1000}
          />
        </div>
        <p className="text-headingColor text-lg font-bold my-1 text-center">
          {t("takeExam.title")}
        </p>
      </div>
    </Link>
  );
};

export default PracticeExamCard;
