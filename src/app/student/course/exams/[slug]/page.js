"use client";
import ExamsContent from "@/components/courseDetail/examsContent/examsContent";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  fetchCourseById,
  fetchWrongQuestions,
} from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { t } from "i18next";

const Exams = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Store or update the courseId in localStorage
    if (courseId) {
      localStorage.setItem("courseId", courseId);
    }

    const loadCourseExams = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        const wrongQuestionsData = await fetchWrongQuestions(courseId);

        const examsList = courseData.course.exam; // Assuming exams are in course.exams
        // If wrong questions exist, add them as the first item in exams
        if (wrongQuestionsData.wrongQuestions.length > 0) {
          examsList.unshift({
            _id: "wrong-questions",
            name: t("wrongQuestion"),
            questions: wrongQuestionsData.wrongQuestions.map((q) => q.question),
          });
        }

        setExams(examsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseExams();
  }, [courseId]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExamsContent exams={exams} isPurchased={true} isStudent={true} />
    </div>
  );
};

export default Exams;
