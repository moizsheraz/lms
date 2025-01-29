"use client";
import StudentLayout from "@/components/layout/studentLayout/studentLayout";
import EnrolledCoursesMainPage from "@/components/student/enrolledCourses/enrolledCoursesMainPage/enrolledCoursesMainPage";
import React from "react";
import { useTranslation } from "react-i18next";

const EnrolledCourses = () => {
  const { t } = useTranslation();
  return (
    <StudentLayout>
      <div>
        {" "}
        <p className="text-lg font-bold text-headingColor my-2">
          {t("studentprofile.coursesEnrolled")}
        </p>{" "}
      </div>
      <EnrolledCoursesMainPage />
    </StudentLayout>
  );
};

export default EnrolledCourses;
