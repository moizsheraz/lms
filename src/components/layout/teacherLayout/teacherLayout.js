"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/common/sideBar/sidebar";
import { FaHome, FaHeadphones } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { TbLogs } from "react-icons/tb";
import { MdManageAccounts } from "react-icons/md";
import Header from "@/components/common/header/header";
import { useTranslation } from "react-i18next";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";

const TeacherLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  // Check if the current language is Hebrew
  const isHebrew = i18n.language === "he";

  const teacherLinks = [
    {
      href: "/teacher/dashboard",
      label: t("teacherSideBar.home"),
      icon: <FaHome />,
      content: "Teacher Home Content",
    },
    {
      href: "/teacher/courses",
      label: t("teacherSideBar.myCourses"),
      icon: <BsBook />,
      content: "Courses Content",
    },
    {
      href: "/teacher/blogs",
      label: t("adminSidebar.blogs"),
      icon: <TbLogs />,
      content: "Blogs Content",
    },
    {
      href: "/teacher/edit-profile",
      label: t("teacherSideBar.myProfile"),
      icon: <MdManageAccounts />,
      content: "Teacher edit profile",
    },
    {
      href: "/teacher/support",
      label: t("teacherSideBar.support"),
      icon: <FaHeadphones />,
      content: "Teacher edit profile",
    },
  ];

  // Fetch profile and handle redirection if profile is missing
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getTeacherProfile();

        if (!data || !data.profile) {
          // Redirect to root if no profile is found
          router.push("/");
          return;
        }

        setProfile(data.profile); // Set profile if it exists
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
        router.push("/"); // Redirect to root if fetching profile fails
      }
    };

    fetchProfile();
  }, [router]);

  // Prevent rendering layout until profile is validated
  if (!profile) {
    return null; // Optionally, show a loader or nothing during profile validation
  }

  return (
    <div className="flex">
      <SideBar mainLinks={teacherLinks} isTeacher={true} />
      <div className={`w-full ${isHebrew ? "lg:mr-64" : "lg:ml-64"}`}>
        <Header isAuth={true} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default TeacherLayout;
