"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../heroSection/heroSection";
import Footer from "@/components/common/footer/footer";
import { MdInfo, MdOutlineStorage } from "react-icons/md";
import { BiSolidBook } from "react-icons/bi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { PiFoldersFill } from "react-icons/pi";
import AboutMainPage from "@/components/courseDetail/aboutMainpage/aboutMainPage";
import Image from "next/image";
import CircularProgressBar from "@/components/common/circularProgressBar/circularProgressBar";
import { IoStarSharp } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoMdSend } from "react-icons/io";
import Link from "next/link";
import AboutContent from "../aboutContent/aboutContent";
import {
  addReview,
  fetchCourseById,
  fetchCourseGrades,
  fetchStudentMetrics,
} from "@/app/utils/student/courses/api";
import CountdownTimer from "@/components/common/countDownTimer/countDownTimer";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";
import { fetchCourseSummary } from "@/app/utils/student/summary/api";

const CourseDetailMainPage = (props) => {
  const { t } = useTranslation();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseGrades, setCourseGrades] = useState(null);
  const [summaryCounts, setSummaryCounts] = useState({
    completedSummariesCount: 0,
    totalSummariesCount: 0,
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await fetchCourseById(props.courseId);

        setCourseData(data.course);
        console.log("data", data.course);

        // Fetch course grades

        setLoading(false);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching course data."
        );
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [props.courseId]);

  // Fetch course summary counts
  useEffect(() => {
    const fetchSummaryCounts = async () => {
      try {
        const data = await fetchCourseSummary(props.courseId);

        setSummaryCounts({
          completedSummariesCount: data.completedSummariesCount,
          totalSummariesCount: data.totalSummariesCount,
        });
      } catch (err) {}
    };

    fetchSummaryCounts();
  }, [props.courseId]);

  useEffect(() => {
    const fetchGradesData = async () => {
      try {
        const grades = await fetchStudentMetrics(props.courseId);
        setCourseGrades(grades);

        // Fetch course grades
      } catch (err) {}
    };

    fetchGradesData();
  }, [props.courseId]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>{error}</p>;
  // Data for tabs
  const tabs = [
    {
      id: "about",
      icon: <MdInfo />,
      label: t("teacherCourseDetail.about"),
      href: `/${
        props.isAdmin
          ? `admin/course/course-detail/${props.courseId}`
          : props.isTeacher
          ? `teacher/course/course-detail/${props.courseId}`
          : props.isPurchased && !props.isTeacher
          ? `student/course/course-detail/${props.courseId}`
          : `course-detail/${props.courseId}`
      }`,
    },
    {
      id: "theory",
      icon: <BiSolidBook />,
      label: t("teacherCourseDetail.theoreticalMaterial"),
      href: `/${
        props.isAdmin
          ? `admin/course/course-material/${props.courseId}`
          : props.isTeacher
          ? `teacher/course/course-material/${props.courseId}`
          : props.isPurchased && !props.isTeacher
          ? `student/course/course-material/${props.courseId}`
          : `course/course-material/${props.courseId}`
      }`,
    },
    {
      id: "summaries",
      icon: <MdOutlineStorage />,
      label: t("teacherCourseDetail.summaries"),
      href: `/${
        props.isAdmin
          ? `admin/course/summaries/${props.courseId}`
          : props.isTeacher
          ? `teacher/course/summaries/${props.courseId}`
          : props.isPurchased && !props.isTeacher
          ? `student/course/summaries/${props.courseId}`
          : `course/summaries/${props.courseId}`
      }`,
    },
    {
      id: "exams",
      icon: <LiaClipboardListSolid />,
      label: t("exams"),
      href: `/${
        props.isAdmin
          ? `admin/course/exams/${props.courseId}`
          : props.isTeacher
          ? `teacher/course/exams/${props.courseId}`
          : props.isPurchased && !props.isTeacher
          ? `student/course/exams/${props.courseId}`
          : `course/exams/${props.courseId}`
      }`,
    },
    {
      id: "resources",
      icon: <PiFoldersFill />,
      label: t("teacherCourseDetail.resourceFolder"),
      href: `/${
        props.isAdmin
          ? `admin/course/resource-folder/${props.courseId}`
          : props.isTeacher
          ? `teacher/course/resource-folder/${props.courseId}`
          : props.isPurchased && !props.isTeacher
          ? `student/course/resource-folder/${props.courseId}`
          : `course/resource-folder/${props.courseId}`
      }`,
    },
  ];

  // for review submission
  const handleReviewSubmit = async () => {
    setIsSubmitting(true);

    try {
      await addReview({ courseId: props.courseId, review, rating });
      setReview("");
      setRating(0);
      window.location.reload();
    } catch (err) {
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="px-8">
        <HeroSection courseData={courseData} />
        {/* for studend course deatil data start */}
        {props.isPurchased && !props.isTeacher ? (
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center bg-gray-300 rounded-lg text-white font-bold text-xl">
                {courseData.teacher.profileImage ? (
                  <Image
                    className="w-14 h-14 rounded-full"
                    src={courseData.teacher.profileImage}
                    alt={`${courseData.teacher.firstName} ${courseData.teacher.lastName}`}
                    width={1000}
                    height={1000}
                  />
                ) : (
                  // Display initials if profile image is not available
                  `${courseData.teacher.firstName[0]}${courseData.teacher.lastName[0]}`
                )}
              </div>
              <p className="text-headingColor">
                {courseData.teacher.firstName} {courseData.teacher.lastName}
              </p>
            </div>
            <a
              href={`mailto:${courseData.teacher.email}`}
              className="bg-gradient-to-t from-btnColorOne to-btnColor p-3 rounded-md w-36 text-sm text-white text-center"
            >
              {t("studentCourseDetail.contactTeacher")}
            </a>
          </div>
        ) : (
          ""
        )}

        <AboutContent
          courseData={courseData}
          isPurchased={props.isPurchased}
          isTeacher={props.isTeacher}
          price={courseData.price}
          isAdmin={props.isAdmin}
        />

        {/* for studend course deatil data end */}
        <div className="w-full grid grid-cols-2 gap-2 my-2 lg:flex lg:flex-nowrap">
          {tabs.map((tab, index) => (
            <Link
              href={tab.href}
              key={tab.id}
              className={`py-7 px-2 border rounded-md w-full cursor-pointer hover:bg-gradient-to-t hover:from-btnColorOne hover:to-btnColor hover:duration-500 hover:text-white text-desColor
                  ${
                    index === tabs.length - 1 && tabs.length % 2 === 1
                      ? "col-span-2"
                      : ""
                  }`}
            >
              <div className={`flex w-full items-center justify-center`}>
                {/* Dynamically change icon color */}
                {React.cloneElement(tab.icon, {
                  className: `w-8 h-8`,
                })}
              </div>
              <p className={`text-center text-sm my-1`}>{tab.label}</p>
            </Link>
          ))}
        </div>

        {/* for studend course deatil data start */}
        {props.isPurchased && !props.isTeacher ? (
          <>
            <p className="text-headingColor text-lg font-bold my-2">
              {t("studentCourseDetail.courseSummary")}
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {summaryCounts && (
                <div className="bg-lightCard rounded-lg border flex flex-col sm:flex-row items-center justify-between p-3 ">
                  <p className="text-headingColor text-sm md:text-xl mb-4 sm:mb-0">
                    {t("studentCourseDetail.summaryProgress")}
                  </p>
                  <CircularProgressBar
                    progress={summaryCounts.completedSummariesCount || 0}
                    score={summaryCounts.totalSummariesCount || 0}
                    isPurchased={true}
                    isSummary={true}
                  />
                </div>
              )}
              {courseGrades ? (
                <>
                  <div className="bg-lightCard rounded-lg border flex flex-col sm:flex-row items-center justify-between p-3">
                    <p className="text-headingColor text-sm md:text-xl mb-4 sm:mb-0">
                      {t("studentCourseDetail.testAnswered")}
                    </p>
                    <CircularProgressBar
                      progress={
                        (courseGrades.perfectTests /
                          courseGrades.perfectTests) *
                          100 || 0
                      }
                      score={courseGrades.perfectTests || 0}
                      totalQuestions={courseGrades.perfectTests || 0}
                      isPurchased={true}
                      isAnswered={true}
                    />
                  </div>

                  <div className="bg-lightCard rounded-lg border flex flex-col sm:flex-row items-center justify-between p-3">
                    <p className="text-headingColor text-sm md:text-xl mb-4 sm:mb-0">
                      {t("studentCourseDetail.averageGrade")}
                    </p>
                    <CircularProgressBar
                      progress={courseGrades.averageGrade || 0}
                      score={courseGrades.averageGrade || 0}
                      isPurchased={true}
                      isGrade={true}
                    />
                  </div>

                  <div className="bg-lightCard rounded-lg border flex flex-col sm:flex-row items-center justify-between p-3">
                    <p className="text-headingColor text-sm md:text-xl mb-4 sm:mb-0">
                      {t("studentCourseDetail.averageTimeToAnswer")}
                    </p>
                    <CircularProgressBar
                      progress={
                        courseGrades.averageTimeToAnswer
                          ? (courseGrades.averageTimeToAnswer / 100) * 100
                          : 0
                      }
                      score={courseGrades.averageTimeToAnswer || 0}
                      isPurchased={true}
                      isTime={true}
                    />
                  </div>
                </>
              ) : (
                <p>Loading...</p> // Show loading text or a spinner while `courseGrades` is null.
              )}

              <div>
                <CountdownTimer purchaseDate={courseData.purchaseDate} />
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {/* for studend course deatil data end */}
        {/* Tab content */}
        <div className="my-4">
          <div>
            <AboutMainPage courseData={courseData} />
          </div>

          {/* {activeTab === "theory" && (
            <div>
              <ExtraMaterial
                heading="Theoretical Material"
                isPurchased={props.isPurchased}
              />
            </div>
          )}
          {activeTab === "summaries" && (
            <div>
              <SummariesContent isPurchased={props.isPurchased} />
            </div>
          )}
          {activeTab === "exams" && (
            <div>
              <ExamsContent isPurchased={props.isPurchased} />
            </div>
          )}
          {activeTab === "resources" && (
            <div>
              <ExtraMaterial
                heading="Resource Folder"
                isPurchased={props.isPurchased}
              />
            </div>
          )} */}
        </div>
        {/* Review Section */}
        {props.isPurchased && !props.isTeacher && (
          <div className="my-3">
            <p className="text-lg font-bold text-headingColor mt-4 mb-2">
              {t("studentCourseDetail.leaveFeedback")}
            </p>
            <div className="flex items-center gap-2 text-3xl my-1">
              {[...Array(5)].map((_, index) => (
                <IoStarSharp
                  key={index}
                  className={
                    index < rating ? "text-orange-400" : "text-slateColor"
                  }
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <div className="relative">
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={4}
                placeholder="Write a review"
                value={review}
                onChange={(e) => setReview(e.target.value.slice(0, 400))}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <p className="text-headingColor text-sm">{review.length}/400</p>
                <button
                  onClick={handleReviewSubmit}
                  className="flex items-center justify-center bg-btnColor text-white w-8 h-8 rounded-md p-1"
                  disabled={isSubmitting || !review || !rating}
                >
                  {isSubmitting ? "..." : <IoIosArrowDropleftCircle />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetailMainPage;
