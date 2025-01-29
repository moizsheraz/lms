"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SummariesContent from "@/components/courseDetail/summariesContent/summariesContent";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const Summaries = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const courseData = await fetchCourseById(courseId); // Fetch course by ID
        setCourseDetails(courseData.course); // Set the course details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [courseId]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {courseDetails ? (
        <SummariesContent t={t}
          isPurchased={false}
          course={courseDetails}
          summaries={courseDetails.summaries}
        />
      ) : (
        <p>Course not found.</p>
      )}
    </div>
  );
};

export default Summaries;
