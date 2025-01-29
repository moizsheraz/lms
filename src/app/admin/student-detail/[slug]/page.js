"use client";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import ProfileMainPage from "@/components/student/profile/profileMainPage/profileMainPage";
import { usePathname } from "next/navigation";
import React from "react";
 
const StudentDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <AdminLayout>
      <ProfileMainPage studentId={id} isAdmin={true} />
    </AdminLayout>
  );
};

export default StudentDetail;
