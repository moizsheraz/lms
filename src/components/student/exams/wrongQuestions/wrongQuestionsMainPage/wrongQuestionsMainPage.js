import React, { useEffect, useState } from "react";
import { fetchExamMarks } from "@/app/utils/student/courses/api";
import QuestionsCard from "../../questionCard/questionCard";
import BreadCrumb from "@/components/courseDetail/breadcrumb/breadCrumb";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const WrongQuestionsMainPage = ({ examId }) => {
 
  const { t } = useTranslation();
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchWrongQuestions = async () => {
      try {
        const response = await fetchExamMarks(examId);
        if (response.status === "success") {
          // Only include questions where the student's answer is incorrect
          setWrongQuestions(response.wrongQuestions);
          console.log("wrongQuestions",response.wrongQuestions)        }
      } catch (error) {
        console.error("Error fetching wrong questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWrongQuestions();
  }, [examId]);

  if (loading) return <LoadingScreen />;

  const totalQuestions = wrongQuestions.length;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="w-full bg-gradient-to-t from-btnColorOne to-btnColor p-6 lg:h-screen">
      <div className="lg:flex block items-center justify-between mb-8">
        <div className="lg:ml-0 lg:mt-0">
          <BreadCrumb />
        </div>
        <p className="text-white font-black text-center lg:my-0 text-2xl">
          {t("wrongQuestiontitle")}
        </p>
        <div className=""></div>
      </div>
      <div className="flex flex-col items-center space-y-8">
        {wrongQuestions.length > 0 && (
          <QuestionsCard
            question={wrongQuestions[currentQuestionIndex].questionText}
            options={wrongQuestions[currentQuestionIndex].options}
            questionImage={wrongQuestions[currentQuestionIndex].questionImage}

            correctIndex={wrongQuestions[currentQuestionIndex].options.indexOf(
              wrongQuestions[currentQuestionIndex].correctAnswer
            )}
            hint={wrongQuestions[currentQuestionIndex].hint}
            hintImage={wrongQuestions[currentQuestionIndex].hintImage}
            isCreate={false}
            selectedIndex={wrongQuestions[currentQuestionIndex].options.indexOf(
              wrongQuestions[currentQuestionIndex].studentAnswer
            )}
          />
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 my-4">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-white rounded-md p-2 text-red-600 w-28 text-sm font-bold"
        >
          {t("teacherCreateCourseStep1.previous")}
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="bg-white rounded-md p-2 text-btnColor w-28 text-sm font-bold"
        >
          {t("teacherCreateCourseStep1.next")}
        </button>
        <Link
          href="/student/profile"
          className=" items-center text-center bg-white rounded-md p-2 text-btnColor w-28 text-sm  block font-bold"
        >
          <span> {t("closeBtn")} </span>
        </Link>
      </div>
    </div>
  );
};

export default WrongQuestionsMainPage;
