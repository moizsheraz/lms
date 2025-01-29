"use client";
import { fetchCourses } from "@/app/utils/teacher/courses/api";
import CoursesMianPage from "@/components/admin/courses/coursesMianPage/coursesMianPage";
import LoadingScreen from "@/components/common/loading/Loading";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data); // Set courses with fetched data
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <AdminLayout>
      {loading ? (
        <LoadingScreen />
      ) : (
        <CoursesMianPage courses={courses} isOwner={true} isAdmin={true} />
      )}
    </AdminLayout>
  );
};

export default Courses;
