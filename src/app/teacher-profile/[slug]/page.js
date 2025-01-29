"use client";
import React from "react";
import MyAccountMainPage from "@/components/common/myAccountMainPage/myAccountMainPage";
import { usePathname } from "next/navigation";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/footer";

const TeacherProfile = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];
  return (
    <div>
      <Header />
      <MyAccountMainPage teacherId={id} />
      <Footer />
    </div>
  );
};

export default TeacherProfile;
