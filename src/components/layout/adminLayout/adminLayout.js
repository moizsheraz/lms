"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "@/components/common/sideBar/sidebar";
import Header from "@/components/common/header/header";
import {
  FaHome,
  FaChalkboardTeacher,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa";
import { MdClass, MdOutlineCategory } from "react-icons/md";
import { TbLogs } from "react-icons/tb";
import { BsBook, BsClipboard } from "react-icons/bs";
import { BiSolidMessageAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";

const AdminLayout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [profile, setProfile] = useState(null);

  // Get the current language
  const isHebrew = i18n.language === "he";

  const adminLinks = [
    {
      href: "/admin/dashboard",
      label: t("adminSidebar.home"),
      icon: <FaHome />,
    },
    {
      href: "/admin/topics",
      label: t("adminSidebar.topics"),
      icon: <BiSolidMessageAlt />,
    },
    {
      href: "/admin/teacher",
      label: t("adminSidebar.teachers"),
      icon: <FaChalkboardTeacher />,
    },
    {
      href: "/admin/students",
      label: t("adminSidebar.students"),
      icon: <MdClass />,
    },
    {
      href: "/admin/blogs",
      label: t("adminSidebar.blogs"),
      icon: <TbLogs />,
    },
    {
      href: "/admin/categories",
      label: t("blogsSidebar.heading"),
      icon: <MdOutlineCategory />,
    },
    {
      href: "/admin/courses",
      label: t("adminSidebar.courses"),
      icon: <BsBook />,
    },
    {
      href: "/admin/coupon",
      label: t("adminSidebar.coupon"),
      icon: <BsClipboard />,
    },
    {
      href: "/admin/edit-profile",
      label: t("adminSidebar.myProfile"),
      icon: <FaUserCircle />,
    },
    {
      href: "/admin/subscribed-users",
      label: t("adminSidebar.subscribedUsers"),
      icon: <FaUserFriends />,
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
    <div className="flex w-full">
      <SideBar t={t} mainLinks={adminLinks} isTeacher={true} />
      <div className={`w-full ${isHebrew ? "lg:mr-64" : "lg:ml-64"}`}>
        <Header isAuth={true} />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
