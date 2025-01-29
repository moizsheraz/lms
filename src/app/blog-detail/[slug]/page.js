"use client";
import BlogDetailMainPage from "@/components/blogDetail/blogDetailMainPage/blogDetailMainPage";
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import { usePathname } from "next/navigation";
import React from "react";

const BlogDetail = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const slug = parts[parts.length - 1];
  return (
    <div>
     
      <BlogDetailMainPage slug={slug} />
  
    </div>
  );
};

export default BlogDetail;
