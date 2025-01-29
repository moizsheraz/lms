"use client";
import SubSubTopicsMainPage from "@/components/admin/subSubTopics/subSubTopicsMainPage/subSubTopicsMainPage";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import { usePathname } from "next/navigation";
import React from "react";

const SubSubtopics = () => {
  const pathname = usePathname();

  // Get the URL parameters directly from the pathname
  const getIdFromUrl = (url) => {
    const params = url.split("/").pop().split("&");
    const ids = {};
    params.forEach(param => {
      const [key, value] = param.split("=");
      ids[key] = value;
    });
    return ids;
  };

  const { topic, subtopic } = getIdFromUrl(pathname);


  return (
    <AdminLayout>
      <SubSubTopicsMainPage topicId={topic} subtopicId={subtopic} />
    </AdminLayout>
  );
};

export default SubSubtopics;
