"use client";
import SubTopicsMainPage from "@/components/admin/subTopics/subTopicsMainPage/subTopicsMainPage";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import { usePathname } from "next/navigation";
import React from "react";
 
const SubTopics = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <AdminLayout>
      <SubTopicsMainPage topicId={id} />
    </AdminLayout>
  );
};

export default SubTopics;
