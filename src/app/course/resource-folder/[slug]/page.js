"use client";
import ExtraMaterial from "@/components/courseDetail/extraMaterial/extraMaterial";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import { useTranslation } from "react-i18next";

const CourseResourceFolder = () => {
  const { t } = useTranslation();

  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [auxiliaryMaterial, setAuxiliaryMaterial] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        setAuxiliaryMaterial(courseData.course.auxiliaryMaterial);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [courseId]);

  if (loading) return <p>Loading auxiliary material...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExtraMaterial
        heading="Resource Folder"
        isPurchased={false}
        materialLink={auxiliaryMaterial}
      />
    </div>
  );
};

export default CourseResourceFolder;
