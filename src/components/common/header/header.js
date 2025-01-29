"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { RxPerson } from "react-icons/rx";
import { fetchStudentProfile } from "@/app/utils/student/auth/api";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";
import { useTranslation } from "react-i18next"; // Import useTranslation
import {
  FaChalkboardTeacher,
  FaHeadphones,
  FaHome,
  FaRegFlag,
  FaUserCircle,
  FaUserFriends,
} from "react-icons/fa"; // For flag icon
import { BsBook } from "react-icons/bs";
import { BiSolidMessageAlt } from "react-icons/bi";
import { MdClass } from "react-icons/md";

const Header = ({ isAuth, scrollToSection }) => {
  const { t, i18n } = useTranslation();
  const [shownav, setshownav] = useState(false); // Manage nav visibility
  const [isLanguageMenuVisible, setLanguageMenuVisible] = useState(false); // Manage language menu visibility
  const menuRef = useRef(null);
  const headerRef = useRef(null);

  const [studentData, setStudentData] = useState(null); // Student data state
  const [teacherData, setTeacherData] = useState(null); // Teacher data state

  useEffect(() => {
    // Fetch student profile data
    fetchStudentProfile()
      .then((data) => setStudentData(data))
      .catch((error) =>
        console.error("Failed to fetch student profile:", error)
      );

    // Fetch teacher profile data
    getTeacherProfile()
      .then((data) => setTeacherData(data))
      .catch((error) =>
        console.error("Failed to fetch teacher profile:", error)
      );

    // Load saved language or default to Hebrew for first-time visitors
    const savedLanguage = localStorage.getItem("language");
    if (!savedLanguage) {
      localStorage.setItem("language", "he"); // Save default language
    }
    i18n.changeLanguage(savedLanguage || "he"); // Set i18n language
  }, []);

  const toggleNav = () => {
    setshownav(!shownav); // Toggle mobile nav
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !headerRef.current.contains(event.target)
    ) {
      setshownav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    // Lock body scroll when mobile menu is open
    document.body.style.overflow = shownav ? "hidden" : "auto";

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto"; // Reset scroll on unmount
    };
  }, [shownav]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Sign out and redirect
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language
    localStorage.setItem("language", lang); // Save language to localStorage
    window.location.reload(); // Reload page to apply changes
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuVisible(!isLanguageMenuVisible);
  };

  // Main navigation links
  const mainLinks = [
    { label: t("home"), href: "/" },
    {
      label: t("about"),
      action: scrollToSection
        ? () => scrollToSection("about")
        : () => (window.location.href = "/"),
    },
    {
      label: t("reviews.title"),
      action: scrollToSection
        ? () => scrollToSection("reviews")
        : () => (window.location.href = "/"),
    },
    { label: t("faqSection.title"), href: "/faq" },
    { label: t("blogs.heading"), href: "/blogs" },
  ];

  // Conditionally add "Personal Area" link based on logged-in user type
  if (studentData !== null) {
    mainLinks.push({ label: t("personalArea"), href: "/student/profile" });
  } else if (teacherData !== null && teacherData.profile?.AdminRights) {
    mainLinks.push({ label: t("personalArea"), href: "/admin/dashboard" });
  } else if (teacherData !== null && !teacherData.profile?.AdminRights) {
    mainLinks.push({ label: t("personalArea"), href: "/teacher/dashboard" });
  }
  


  // Determine the logo based on the current language
  const currentLogo =
    i18n.language === "he"
      ? "/images/png/israellogo.png"
      : "/images/png/usalogo.png";

  const getMobileMenuLinks = () => {
    if (studentData) {
      return [
        {
          href: "/student/profile",
          label: t("studentPersonalArea.title"),
          icon: <FaHome />,
        },
        {
          href: "/student/enrolled-courses",
          label: t("studentPersonalArea.myCourses"),
          icon: <BsBook />,
        },
        { href: "/", label: t("studentPersonalArea.home"), icon: <FaHome /> },
        {
          href: "/search-result",
          label: t("studentPersonalArea.search"),
          icon: <FaHome />,
        },
        {
          href: "/student/support",
          label: t("studentPersonalArea.support"),
          icon: <FaHeadphones />,
        },
      ];
    }

    if (teacherData) {

      if (teacherData.profile?.AdminRights) {
        return [
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
            href: "/admin/courses",
            label: t("adminSidebar.courses"),
            icon: <BsBook />,
          },
          {
            href: "/admin/coupon",
            label: t("adminSidebar.coupon"),
            icon: <FaUserCircle />,
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
      }
      return [
        {
          href: "/teacher/dashboard",
          label: t("teacherSideBar.home"),
          icon: <FaHome />,
        },
        {
          href: "/teacher/courses",
          label: t("teacherSideBar.myCourses"),
          icon: <BsBook />,
        },
        {
          href: "/teacher/edit-profile",
          label: t("teacherSideBar.myProfile"),
          icon: <FaChalkboardTeacher />,
        },
        {
          href: "/teacher/support",
          label: t("teacherSideBar.support"),
          icon: <FaHeadphones />,
        },
      ];
    }

    return mainLinks.map((link) => ({
      href: link.href || null,
      label: link.label,
      action: link.action || null,
    }));
  };

  const mobileLinks = getMobileMenuLinks();

  return (
    <div ref={headerRef}>
      <div className="text-headingColor flex items-center justify-between p-1 md:p-3 bg-white lg:shadow-sm border px-8">
        {/* Logo and site title */}
        {!isAuth && (
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                className="w-12 h-16"
                src="/images/png/logo.png"
                width={1000}
                height={1000}
                alt="Logo"
              />
            </Link>
            <p className="text-btnColor font-bold text-lg">Just A Game</p>
          </div>
        )}

        {/* Main links for desktop */}
        <div className="hidden md:ml-[70px] md:mr-[70px] lg:ml-0  md:flex gap-4 items-center">
          {mainLinks.map((link, index) =>
            link.href ? (
              <Link
                key={index}
                href={link.href}
                className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={index}
                onClick={link.action}
                className="hover:underline hover:underline-offset-4 cursor-pointer hover:scale-110 transition ease-out hover:ease-in-out duration-300"
              >
                {link.label}
              </button>
            )
          )}
          {/* Language switcher */}
          <div className="relative z-50">
            <button
              onClick={toggleLanguageMenu}
              className="flex items-center gap-2"
            >
              <Image
                className="w-6 h-6"
                src={currentLogo}
                width={24}
                height={24}
                alt={i18n.language === "he" ? "Israel Logo" : "US Logo"}
              />
              {isLanguageMenuVisible && (
                <div className="absolute top-8 right-0 bg-white p-2 shadow-lg rounded-md z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaRegFlag size={16} /> EN
                  </button>
                  <button
                    onClick={() => changeLanguage("he")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaRegFlag size={16} /> HE
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* User actions */}
        <div className="hidden md:flex gap-2 items-center">
          {studentData || teacherData ? (
            <div
              onClick={handleLogout}
              className="bg-gradient-to-t from-btnColorOne to-btnColor w-24 text-white flex items-center justify-center gap-2 p-2 rounded-full hover:bg-btnColor cursor-pointer text-sm"
            >
              <FiLogOut />
              <button>{t("logout")}</button>
            </div>
          ) : (
            <>
              <Link
                href="/register"
                className="text-headingColor w-20 border p-2 rounded-full text-sm block bg-transparent hover:bg-btnColor duration-300 hover:text-white"
              >
                {t("signup")}
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-t from-btnColorOne to-btnColor w-24 text-white flex items-center justify-center gap-2 p-2 rounded-full hover:bg-btnColor cursor-pointer text-sm"
              >
                <RxPerson />
                <button>{t("login")}</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile nav button */}
        {!isAuth && (
          <button className="md:hidden ml-[70px]" onClick={toggleNav}>
            <CiMenuFries size={14} />
          </button>
        )}
      </div>

      {/* Mobile navigation */}
      {shownav && (
        <div
          className="fixed top-0 right-0 w-64 h-full shadow-lg  z-50 
        bg-gradient-to-t from-btnColorOne to-btnColor px-6 py-4 text-white
        "
        >

          <button onClick={toggleNav} className="text-gray-600">
            <CiMenuFries size={24} />
          </button>
          <div className="flex items-center gap-2 my-2">
            <Link href="/">
              <Image
                className="w-8 h-12"
                src="/images/png/logo.png"
                width={1000}
                height={1000}
                alt="Logo"
              />
            </Link>
            <p className="text-white font-bold text-sm">Just A Game</p>
          </div>
          <nav className="mt-4">
            {mobileLinks.map((link, index) =>
              link.href ? (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center gap-2 p-2 hover:bg-white hover:text-sky-400"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={link.action}
                  className="flex justify-start  py-2 hover:bg-white hover:text-sky-400"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>
          {studentData || teacherData ? (
            <button
              onClick={handleLogout}
              className="my-2 w-full bg-red-500 text-white py-2 rounded"
            >
              {t("logout")}
            </button>
          ) : (
            <>
              <Link
                href="/register"
                className="text-headingColor w-20 border p-2 rounded-full text-sm block my-2 bg-transparent hover:bg-btnColor duration-300 hover:text-white"
              >
                {t("signup")}
              </Link>
              <Link
                href="/login"
                className="bg-gradient-to-t from-btnColorOne to-btnColor w-24 text-white flex items-center justify-center gap-2 p-2 rounded-full hover:bg-btnColor my-2  cursor-pointer text-sm"
              >
                <RxPerson />
                <button>{t("login")}</button>
              </Link>
            </>
          )}
          <div className="my-2 relative z-50">
            <button
              onClick={toggleLanguageMenu}
              className="flex items-center gap-2"
            >
              <Image
                className="w-6 h-6"
                src={currentLogo}
                width={24}
                height={24}
                alt={i18n.language === "he" ? "Israel Logo" : "US Logo"}
              />
              {isLanguageMenuVisible && (
                <div className="absolute top-8 left-0 bg-sky-500 p-2 rounded-md z-50">
                  <button
                    onClick={() => changeLanguage("en")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaRegFlag size={16} /> EN
                  </button>
                  <button
                    onClick={() => changeLanguage("he")}
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
                  >
                    <FaRegFlag size={16} /> HE
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
