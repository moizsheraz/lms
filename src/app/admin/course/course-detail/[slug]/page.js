"use client";
import CourseDetailMainPage from "@/components/courseDetail/courseDetailMainPage/courseDetailMainPage";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import { usePathname } from "next/navigation";
import React from "react";

const CourseDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
   const id = parts[parts.length - 1];
  return (
    <AdminLayout>
      <CourseDetailMainPage
        isPurchased={true}
        courseId={id}
        isTeacher={true}
        isAdmin={true}
      />
    </AdminLayout>
  );
};

export default CourseDetail;
