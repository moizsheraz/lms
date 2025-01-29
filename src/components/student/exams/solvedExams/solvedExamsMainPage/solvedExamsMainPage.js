import React, { useEffect, useState } from "react";
import QuestionCard from "../../questionCard/questionCard";
import BreadCrumb from "@/components/courseDetail/breadcrumb/breadCrumb";
import { FaSearch } from "react-icons/fa";
import {
  fetchExamWithQuestions,
  fetchWrongQuestions,
} from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const SolvedExamsMainPage = ({ examId }) => {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Added state for filtered questions
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query

  useEffect(() => {
    const getQuestions = async () => {
      try {
        let data;
        if (examId === "wrong-questions") {
          // Retrieve courseId from localStorage
          const storedCourseId = localStorage.getItem("courseId");
          if (!storedCourseId) {
            throw new Error("Course ID not found in localStorage");
          }
          // Pass the courseId to fetchWrongQuestions
          data = await fetchWrongQuestions(storedCourseId);
          setQuestions(data.wrongQuestions.map((q) => q.question)); // Assuming each wrong question has a question field
        } else {
          data = await fetchExamWithQuestions(examId);
          if (data.exam) {
            setQuestions(data.exam.questions);
          }
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [examId]);

  useEffect(() => {
    // Filter questions based on search query
    if (searchQuery) {
      const filtered = questions.filter((q) =>
        q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [searchQuery, questions]); // Re-run filtering whenever searchQuery or questions change

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full bg-gradient-to-t from-btnColorOne to-btnColor p-6">
      <div className="lg:flex block items-center justify-between mb-8">
        <div className="bg-white flex gap-2 items-center text-paraColor p-2 rounded-full">
          <FaSearch />
          <input
            type="search"
            className="outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
        </div>
        <p className="text-white font-black text-center my-2 lg:my-0 text-2xl">
          {examId === "wrong-questions"
            ? t("reviewIncorrect")
            : t("answerAndLearn")}
        </p>

        <div>
          <div className="lg:ml-48 lg:mt-12">
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 ">
        {filteredQuestions.map((q, index) => (
          <QuestionCard
            key={index}
            question={q.questionText}
            options={q.options}
            hintImage={q.hintImage}
            correctIndex={q.correctIndex}
            questionImage={q.questionImage} // Include question image if necessary
            hint={q.hint} // Include hint if you want to display it
          />
        ))}
      </div>
    </div>
  );
};

export default SolvedExamsMainPage;
