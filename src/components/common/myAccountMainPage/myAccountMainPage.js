"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import LoadingScreen from "../loading/Loading";
import { fetchTeacherProfile } from "@/app/utils/common/teacher/api";
import Link from "next/link";

const MyAccountMainPage = ({ teacherId }) => {
  const { t } = useTranslation();
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("blogs");
  const [imgUrl, setImgUrl] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        const data = await fetchTeacherProfile(teacherId);
        setTeacherData(data.data.teacherProfile);
        console.log("teacher data", data.data.teacherProfile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      getTeacherData();
    }
  }, [teacherId]);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImgUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Destructure the data from teacherData
  const {
    profilePicture,
    firstName,
    lastName,
    bio,
    areaOfExpertise,
    totalPurchases,
    links: { courses, blogs },
  } = teacherData || {};

  // Calculate average rating for courses
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;
  };

  // Profile initials
  const profileInitials =
    firstName && lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : "";

  return (
    <div className="p-2">
      <div className="relative">
        <div className="w-full lg:h-[100px] rounded-xl lg:bg-gradient-to-t lg:from-btnColorOne to-btnColor"></div>
        <div className="lg:absolute lg:top-12 lg:flex items-end justify-center w-full">
          <div className="w-full lg:w-[20%]">
            <div
              className="w-44 h-48 border-4 border-sky-400 rounded-xl flex items-center justify-center cursor-pointer"
              onClick={handleImageClick}
              style={{
                backgroundImage: imgUrl
                  ? `url(${imgUrl})`
                  : profilePicture
                  ? `url(${profilePicture})`
                  : "linear-gradient(to top, rgba(0, 119, 211, 1), rgba(1, 194, 237, 1))",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!imgUrl && !profilePicture && (
                <span className="text-white text-6xl">{profileInitials}</span>
              )}
            </div>
            {/* <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            /> */}
          </div>
          <div className="flex items-center justify-between w-full lg:w-[80%]">
            <div className="w-full lg:w-[50%]">
              <p className="text-headingColor text-2xl font-bold my-1">
                {firstName} {lastName}
              </p>
              <p className="text-paraColor text-xs mb-1 w-full lg:w-80">
                {bio || "No bio available"}
              </p>
              <div className="flex items-center gap-1 mb-1">
                <p className="text-xs bg-btnColor text-white px-2 py-1 rounded-full">
                  {areaOfExpertise || "Not specified"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-orange-500 text-sm mb-1 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i <
                        (calculateAverageRating(
                          courses.flatMap((course) => course.reviews)
                        ) || 0)
                          ? "text-orange-500"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-paraColor text-xs">
                  ({courses.flatMap((course) => course.reviews).length} reviews)
                </p>
              </div>
              <a
                href={`mailto:${teacherData?.email}`}
                className="text-white p-2 rounded-md w-auto text-xs my-1 bg-gradient-to-t from-btnColorOne to-btnColor"
              >
                {t("getInTouch")}
              </a>
            </div>
            <div className="w-full lg:w-[50%] flex items-center gap-10">
              <div className="text-headingColor text-center">
                <p className="text-xs">{t("purchase")}</p>
                <p className="font-bold text-3xl">{totalPurchases || 0}</p>
              </div>
              <div className="text-headingColor text-center">
                <p className="text-xs">{t("courses")}</p>
                <p className="font-bold text-3xl">{courses?.length || 0}</p>
              </div>
              <div className="text-headingColor text-center">
                <p className="text-xs">{t("adminSidebar.blogs")}</p>
                <p className="font-bold text-3xl">{blogs?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 lg:mt-40">
          {/* Tabs */}
          <div className="flex items-center gap-5 border-b pb-2 text-lg text-headingColor">
            <p
              className={`cursor-pointer px-4 py-2 rounded ${
                activeTab === "blogs"
                  ? "bg-btnColor text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab("blogs")}
            >
              {t("adminSidebar.blogs")}
            </p>
            <p
              className={`cursor-pointer px-4 py-2 rounded ${
                activeTab === "courses"
                  ? "bg-btnColor text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab("courses")}
            >
              {t("courses")}
            </p>
          </div>

          {/* Content */}
          <div className="mt-8">
            {activeTab === "blogs" && (
              <div className="space-y-6">
                {blogs?.length > 0 ? (
                  blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 transition-all hover:shadow-xl"
                    >
                      <p className="text-xl font-semibold text-headingColor mb-2">
                        {blog.title}
                      </p>
                      <div
                        className="text-sm text-paraColor"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.description?.length > 250
                              ? `${blog.description.substring(0, 250)}...`
                              : blog.description,
                        }}
                      ></div>

                      <div className="mt-4 text-right">
                        <Link
                          href={`/blog-detail/${blog.slug}`}
                          className="text-btnColor text-xs font-medium border-b border-btnColor transition-all hover:text-btnColorLight"
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg text-gray-500">
                    {t("noBlogsYet")}
                  </p>
                )}
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-6">
                {courses?.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.courseId}
                      className="p-6 bg-white shadow-lg rounded-lg border border-gray-300 transition-all hover:shadow-xl"
                    >
                      <p className="text-xl font-semibold text-headingColor mb-2">
                        {course.courseName}
                      </p>
                      <p className="text-sm text-paraColor mb-2">
                        {t("topic")}: {course.topic}
                      </p>
                      <p className="text-sm text-paraColor mb-2">
                        Total Students: {course.totalStudents}
                      </p>
                      <p className="text-sm text-paraColor">
                        {t("rating")}:{" "}
                        {calculateAverageRating(course.reviews) || "N/A"}
                      </p>
                      <div className="mt-4 text-right">
                        <Link
                          href={`/course-detail/${course.courseId}`}
                          className="text-btnColor text-xs font-medium border-b border-btnColor transition-all hover:text-btnColorLight"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-lg text-gray-500">
                    {t("noCoursesYet")}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountMainPage;
