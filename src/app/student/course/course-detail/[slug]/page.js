"use client";
import CourseDetailMainPage from "@/components/courseDetail/courseDetailMainPage/courseDetailMainPage";
import StudentLayout from "@/components/layout/studentLayout/studentLayout";
import { usePathname } from "next/navigation";
import React from "react";

const CourseDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <StudentLayout>
      <CourseDetailMainPage isPurchased={true} courseId={id} />
    </StudentLayout>
  );
};

export default CourseDetail;
