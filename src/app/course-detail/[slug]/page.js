"use client"
import Header from "@/components/common/header/header";
import CourseDetailMainPage from "@/components/courseDetail/courseDetailMainPage/courseDetailMainPage";
import { usePathname } from "next/navigation";
import React from "react";

const CourseDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <Header />
      <CourseDetailMainPage courseId={id} />
    </div>
  );
};

export default CourseDetail;
