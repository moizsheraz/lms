"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; // Import usePathname and useRouter
import { CiLogout, CiMenuFries } from "react-icons/ci";
import { signOut } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { GoPerson } from "react-icons/go";
import Link from "next/link";
import { getTeacherProfile } from "@/app/utils/teacher/auth/api";
import { fetchStudentProfile } from "@/app/utils/student/auth/api";

const btnColor = "text-sky-400"; // Tailwind color for active tab

const SideBar = ({ mainLinks, isTeacher }) => {
  const { t } = useTranslation();
  const [shownav, setshownav] = useState(false);
  const [isRTL, setIsRTL] = useState(false); // Manage RTL state
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const router = useRouter(); // Initialize useRouter to handle navigation
  const pathname = usePathname(); // Get current route path using usePathname

  useEffect(() => {
    // Check language from localStorage
    const language = localStorage.getItem("language");
    setIsRTL(language === "he"); // Set RTL if language is Hebrew
  }, []);

  const toggleNav = () => {
    setshownav(!shownav);
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

    if (shownav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [shownav]);

  const navigateTo = (href) => {
    router.push(href); // Use router.push() to change the route
    setshownav(false); // Close mobile sidebar after navigation
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Sign out and redirect to "/"
  };

  // to get the user name
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = isTeacher
          ? await getTeacherProfile()
          : await fetchStudentProfile();
        setProfile(isTeacher ? data.profile : data);

        reset(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error.message);
      }
    };
    fetchProfile();
  }, [isTeacher]);

  return (
    <div ref={headerRef}>
      {/* Mobile Navbar */}
      <div className="absolute flex lg:hidden items-center justify-between p-1 bg-white px-8">
        <div className="hidden lg:flex items-center gap-2">
          <Image
            className="w-12 h-16"
            src="/images/png/logo.png"
            width={1000}
            height={1000}
            alt="Logo"
          />
          <p className="text-white font-bold text-lg">Just A Game</p>
        </div>

        <button className="mt-3 lg:hidden" onClick={toggleNav}>
          <CiMenuFries size={14} />
        </button>
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex flex-col w-64 bg-gradient-to-t from-btnColorOne to-btnColor h-screen overflow-auto shadow-lg border-r fixed">
        <div className="flex items-center gap-2 px-6 py-4">
          <Image
            className="w-12 h-16"
            src="/images/png/logo.png"
            width={1000}
            height={1000}
            alt="Logo"
          />
          <p className="text-white font-bold text-lg">Just A Game</p>
        </div>
      
        <div className="flex flex-col px-6 py-4 gap-4">
        {profile && (
          <div className="flex items-center gap-2  bg-lightCard  rounded-2xl p-2 text-btnColor text-center font-bold  text-xs ">
            <GoPerson />
            <p>
              {profile.firstName} {" "} {profile.lastName}
            </p>
          </div>
        )}
          {mainLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigateTo(link.href)}
              className={`flex items-center gap-2 p-2 rounded-full transition duration-300 
                            ${
                              pathname === link.href
                                ? `${btnColor} bg-white`
                                : "text-white"
                            }`}
            >
              {React.cloneElement(link.icon, {
                className:
                  pathname === link.href ? `${btnColor}` : "text-white",
              })}
              <span>{link.label}</span>
            </button>
          ))}

          <div className="border border-r-0 border-b-0 border-l-0 border-t-sky-400 pt-2">
            <div
              className="w-full bg-opacity-30 text-white flex items-center gap-2 p-2 hover:bg-opacity-50 cursor-pointer"
              onClick={handleLogout}
            >
              <CiLogout />
              <span>{t("adminSidebar.logOut")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile when nav is open */}
      {shownav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-40"
          onClick={toggleNav}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        ref={menuRef}
        className={`fixed inset-0 z-50 w-64 bg-gradient-to-t from-btnColorOne to-btnColor px-6 py-4 block overflow-auto lg:hidden transform transition-transform duration-300 ${
          shownav
            ? "translate-x-0"
            : isRTL
            ? "translate-x-[100%]" // Adjust for RTL
            : "translate-y-[100%]" // Adjust for LTR
        }`}
      >
        <button
          onClick={toggleNav}
          className="absolute top-4 right-6 text-xl text-headingColor"
        >
          X
        </button>
        <div className="flex flex-col gap-5 mt-20">
        {profile && (
          <div className="flex items-center gap-2 justify-center bg-lightCard rounded-tl-[300px] rounded-br-[300px] p-2 text-btnColor text-center font-bold w-44 mx-auto text-xs ">
            <GoPerson />
            <p>
              {profile.firstName} {" "} {profile.lastName}
            </p>
          </div>
        )}
          {mainLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigateTo(link.href)}
              className={`flex items-center gap-2 p-2 rounded-full transition duration-300 
                            ${
                              pathname === link.href
                                ? `${btnColor} bg-white`
                                : "text-white"
                            }`}
            >
              {React.cloneElement(link.icon, {
                className:
                  pathname === link.href ? `${btnColor}` : "text-white",
              })}
              <span>{link.label}</span>
            </button>
          ))}
          <div>
            <div
              className="border border-r-0 border-b-0 border-l-0 border-t-sky-400 w-full bg-opacity-30 text-white flex items-center gap-2 p-2 hover:bg-opacity-50 cursor-pointer"
              onClick={handleLogout}
            >
              <CiLogout />
              <span>{t("adminSidebar.logOut")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
