"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeadphones, FaHome, FaHouseUser, FaSearch } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import SideBar from "@/components/common/sideBar/sidebar";
import Header from "@/components/common/header/header";
import { useTranslation } from "react-i18next";
import { fetchStudentProfile } from "@/app/utils/student/auth/api";

const StudentLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  // Check if the current language is Hebrew
  const isHebrew = i18n.language === "he";

  const studentLinks = [
    {
      href: "/student/profile",
      label: t("studentPersonalArea.title"),
      icon: <FaHome />,
      content: "Student Home Content",
    },
    {
      href: "/student/enrolled-courses",
      label: t("studentPersonalArea.myCourses"),
      icon: <BsBook />,
      content: "My Courses Content",
    },
    {
      href: "/",
      label: t("studentPersonalArea.home"),
      icon: <FaHouseUser />,
      content: "Student Home Content",
    },
    {
      href: "/search-result",
      label: t("studentPersonalArea.search"),
      icon: <FaSearch />,
      content: "Search Content",
    },
    {
      href: "/student/support",
      label: t("studentPersonalArea.support"),
      icon: <FaHeadphones />,
      content: "Support Content",
    },
  ];

  // Fetch profile and handle redirection if profile is missing
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const studentProfile = await fetchStudentProfile();

        if (!studentProfile) {
          // Redirect to root if no profile is found
          router.push("/");
          return;
        }

        setProfile(studentProfile); // Set profile if it exists
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
      <SideBar mainLinks={studentLinks} isTeacher={false} />
      <div className={`w-full ${isHebrew ? "lg:mr-64" : "lg:ml-64"}`}>
        <Header isAuth={true} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default StudentLayout;
