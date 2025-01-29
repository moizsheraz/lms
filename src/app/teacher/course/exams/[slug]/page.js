"use client";
import ExamsContent from "@/components/courseDetail/examsContent/examsContent";
import DefineExam from "@/components/common/createCourse/defineExam/defineExam";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const Exams = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const loadCourseExams = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        const examsList = courseData.course.exam; // Assuming exams are in course.exams
        setExams(examsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseExams();
  }, [courseId]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExamsContent exams={exams} isPurchased={true} isTeacher={true} />

      {/* Define Exam Button */}
      <button
        onClick={handleModalOpen}
        className="absolute lg:top-2 top-[55px]left-2 bg-white text-btnColor hover:text-btnColorOne duration-500 px-4 py-2 rounded mt-4"
      >
       {t("addNewExam")}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative h-[500px] overflow-auto bg-white p-6 rounded-lg w-4/5">
            <button
              onClick={handleModalClose}
              className="absolute lg:top-2 top-[55px] right-2 text-xl font-bold"
            >
              &times;
            </button>
            <DefineExam courseId={courseId} /> {/* Assuming DefineExam requires courseId */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;
