"use client";
import CourseDetailMainPage from "@/components/courseDetail/courseDetailMainPage/courseDetailMainPage";
import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import { usePathname } from "next/navigation";
import React from "react";

const CourseDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <TeacherLayout>
      <CourseDetailMainPage
        isPurchased={true}
        courseId={id}
        isTeacher={true}
        isAdmin={false}
      />
    </TeacherLayout>
  );
};

export default CourseDetail;
