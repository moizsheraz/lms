"use client";
import ExamsContent from "@/components/courseDetail/examsContent/examsContent";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchCourseById } from "@/app/utils/student/courses/api";
const Exams = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p>Loading exams...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExamsContent exams={exams} isPurchased={false} />
    </div>
  );
};

export default Exams;
