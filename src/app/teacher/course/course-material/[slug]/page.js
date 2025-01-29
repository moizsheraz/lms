"use client";
import ExtraMaterial from "@/components/courseDetail/extraMaterial/extraMaterial";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";

const CourseExtraMaterial = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [theoreticalMaterial, setTheoreticalMaterial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        setTheoreticalMaterial(courseData.course.theoreticalMaterial);
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
      <ExtraMaterial
        heading="Theoretical Material"
        isPurchased={true}
        materialLink={theoreticalMaterial}
      />
    </div>
  );
};

export default CourseExtraMaterial;
