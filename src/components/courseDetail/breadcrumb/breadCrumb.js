"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { MdInfo, MdOutlineStorage } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { PiFoldersFill } from "react-icons/pi";
import Link from "next/link"; // Importing Next.js Link component
import { useTranslation } from "react-i18next";

const BreadCrumb = () => {
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to handle the arrow click event
  const handleBackClick = () => {
    window.history.back();
  };

  // Menu links data
  const tabs = [
    {
      id: "about",
      icon: <MdInfo />,
      label:  t("studentCourseDetail.about"),
      href: "/student/course/course-detail/course-name",
    },
    {
      id: "theory",
      icon: <BiSolidBook />,
      label: t("studentCourseDetail.theoreticalMaterial"),
      href: "/student/course/course-material/course-name",
    },
    {
      id: "summaries",
      icon: <MdOutlineStorage />,
      label:  t("studentCourseDetail.summaries"),
      href: "/student/course/summaries/course-name",
    },
    {
      id: "exams",
      icon: <LiaClipboardListSolid />,
      label:  t("studentCourseDetail.exams"),
      href: "/student/course/exams/course-name",
    },
    {
      id: "resources",
      icon: <PiFoldersFill />,
      label:  t("studentCourseDetail.resourceFolder"),
      href: "/student/course/resource-folder/course-name",
    },
  ];

  return (
    <div className="">
      <div className=" ">
        <div className="flex items-center justify-end gap-2 my-3 text-lg text-white">
          {/* <CiMenuBurger
            onClick={toggleMenu}
            style={{ cursor: "pointer" }}
          /> */}
          <FaArrowRight
            onClick={handleBackClick}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      {/* Animated Menu */}
      <div
        className={`flex justify-end lg:absolute lg:top-16 lg:left-2 w-48 bg-lightCard text-desColor rounded-md p-4 transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="space-y-2">
          {tabs.map((tab) => (
            <li key={tab.id} className="flex items-center gap-2">
              {tab.icon}
              <Link href={tab.href} className="hover:underline" >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumb;
