"use client";
import React, { useState, useEffect, useRef } from "react";
import Footer from "@/components/common/footer/footer";
import Header from "@/components/common/header/header";
import CoursesCard from "@/components/landingPage/coursesCard/coursesCard";
import HeroSection from "@/components/landingPage/heroSection/heroSection";
import ReviewsCard from "@/components/landingPage/reviewsCard/reviewsCard";
import TopicsCard from "@/components/landingPage/topicsCard/topicsCard";
import Image from "next/image";
import { fetchTopics } from "../utils/common/topics/api";
import {
  fetchCoursesByTopic,
  fetchRandomCourses,
} from "../utils/student/courses/api";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { fetchStudentProfile } from "../utils/student/auth/api";
import { getTeacherProfile } from "../utils/teacher/auth/api";
import TeachersSection from "@/components/landingPage/TeachersSection/TeachersSection";

const LandingPage = () => {
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
  }, []);

  useEffect(() => {
    // Check if the script is already present
    const existingScript = document.querySelector(
      'script[src="https://vee-crm.com/js/"]'
    );
    if (!existingScript) {
      // Initialize Vee's Accessibility Plugin configuration
      window.args = {
        sitekey: "f4b23eb922868ea9a02af493b81d5629",
        position: "Right",
        styles: {
          primary_color: "#177fab",
          secondary_color: "#b586ff",
          background_color: "#f6f6f6",
          primary_text_color: "#636363",
          headers_text_color: "#105675",
          primary_font_size: 14,
          slider_left_color: "#b586ff",
          slider_right_color: "#177fab",
          icon_vertical_position: "top",
          icon_offset_top: 100,
          icon_offset_bottom: 0,
          highlight_focus_color: "#177fab",
          toggler_icon_color: "#ffffff",
        },
        access: "https://vee-crm.com",
        links: {
          acc_policy: "",
          additional_link: "https://vee.co.il/pricing/",
        },
        options: {
          open: false,
          aaa: false,
          hide_tablet: false,
          hide_mobile: false,
          button_size_tablet: 44,
          button_size_mobile: 34,
          position_tablet: "Right",
          position_mobile: "Right",
          icon_vertical_position_tablet: "top",
          icon_vertical_position_mobile: "top",
          icon_offset_top_tablet: 100,
          icon_offset_bottom_tablet: 0,
          icon_offset_top_mobile: 100,
          icon_offset_bottom_mobile: 0,
          keyboard_shortcut: true,
          hide_purchase_link: false,
          display_checkmark_icon: false,
          active_toggler_color: "#118f38",
        },
        exclude: [],
      };

      // Embed the external script
      const embedScript = document.createElement("script");
      embedScript.src = `${window.args.access}/js/`; // Corrected URL
      embedScript.defer = true;
      embedScript.crossOrigin = "anonymous";
      embedScript.setAttribute("data-cfasync", "true");

      embedScript.onload = () => {
        console.log("Vee Accessibility Plugin script loaded successfully.");
      };

      embedScript.onerror = () => {
        console.error("Failed to load Vee Accessibility Plugin script.");
      };

      document.body.appendChild(embedScript);
    } else {
      console.log("Vee Accessibility Plugin script is already loaded.");
    }

    // No need to clean up the script because it's a singleton
  }, []);

  const aboutRef = useRef(null);
  const reviewsRef = useRef(null);

  const { t } = useTranslation();

  // Data for buttons
  const [topics, setTopics] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to load topics:", error);
      }
    };
    getTopics();
  }, []);
  // Fetch courses based on the selected topic
  const handleTopicClick = async (topicTitle) => {
    setSelectedTopic(topicTitle); // Update selected topic
    try {
      const data = await fetchCoursesByTopic(topicTitle);
      setCourses(data); // Update courses based on fetched data
      console.log("data", data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      setCourses([]); // Clear courses if there's an error
    }
  };

  // Fetch three random courses on component mount
  useEffect(() => {
    const getRandomCourses = async () => {
      try {
        const data = await fetchRandomCourses();
        setCoursesData(data); // Store random courses
        console.log("r", data);
      } catch (error) {
        console.error("Failed to load random courses:", error);
      }
    };
    getRandomCourses();
  }, []);

  // reviewsCard
  const reviewsData = t("reviews.reviewsList", { returnObjects: true }).map(
    (review, index) => ({
      img: `/images/jpg/r${index + 1}.jpg`,
      name: review.name,
      job: review.title,
      description: review.content,
    })
  );

  // const avatarImages = [
  //   "/images/jpg/tm2.jpg",
  //   "/images/jpg/tm3.jpg",
  //   "/images/jpg/tm1.jpg",
  // ];
  // just a game topic
  const textContent = [
    t("aboutSection.para1"),
    t("aboutSection.para2"),
    t("aboutSection.para3"),
  ];

  const [visibleCards, setVisibleCards] = useState(5); // Initially show 5 cards

  const handleToggle = () => {
    if (visibleCards === 5) {
      setVisibleCards(reviewsData.length); // Show all cards
    } else {
      setVisibleCards(5); // Reset to show only 5 cards
    }
  };

  return (
    <div>
      <Header
        scrollToSection={(section) => {
          if (section === "about") {
            aboutRef.current.scrollIntoView({ behavior: "smooth" });
          } else if (section === "reviews") {
            reviewsRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <HeroSection t={t} />
      <div>
        <div className="">
          <p className="text-headingColor text-2xl font-bold p-2">
            {t("popularTopic")}
          </p>
          {/* Render buttons dynamically */}
          <div
            className="w-full flex overflow-auto items-center gap-6 my-3 p-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {topics.map((topic, index) => (
              <div
                key={index}
                onClick={() => handleTopicClick(topic._id)} // Set topic as keyword
                className={`cursor-pointer min-w-max rounded-lg border p-3 bg-lightCard duration-500 hover:bg-gradient-to-t to-btnColor from-btnColorOne hover:text-white text-headingColor text-sm font-medium ${
                  selectedTopic === topic.title
                    ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                    : ""
                }`}
              >
                {topic.title} {/* Assuming 'title' holds the topic name */}
              </div>
            ))}
          </div>

          {/* Render TopicsCard components dynamically */}
          {/* for large screen */}
          <div className="hidden lg:flex flex-wrap justify-start gap-2 items-center p-2">
            {courses && courses.length > 0 ? (
              courses
                .filter((course) => course.isActive) // Filter to only include active courses
                .map((course, index) => (
                  <TopicsCard
                    courseId={course._id}
                    key={index}
                    bgImage={course.courseImage.replace(/^public[\\/]/, "")}
                    heading={course.name} // Assuming course data has a heading field
                    description={
                      course.description.length > 100
                        ? course.description.slice(0, 100) + "..."
                        : course.description
                    } // Assuming course data has a description field
                  />
                ))
            ) : (
              <p>{t("noCourseFound")}</p>
            )}
          </div>

          {/* for small screen */}
          <div className="p-4 block lg:hidden">
            <div
              className="flex gap-4 overflow-x-auto lg:overflow-x-hidden lg:grid lg:grid-cols-3 xl:grid-cols-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {courses && courses.length > 0 ? (
                courses
                  .filter((course) => course.isActive) // Filter to only include active courses
                  .map((course, index) => (
                    <div
                      className="min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:w-auto"
                      key={index}
                    >
                      <TopicsCard
                        courseId={course._id}
                        bgImage={course.courseImage.replace(/^public[\\/]/, "")}
                        heading={course.name}
                        description={
                          course.description.length > 100
                            ? course.description.slice(0, 100) + "..."
                            : course.description
                        }
                      />
                    </div>
                  ))
              ) : (
                <p>No courses found for the selected topic.</p>
              )}
            </div>
          </div>

          <p className="text-headingColor text-2xl font-bold p-2 lg:mt-20">
            {t("recomendedCourses")}
          </p>
          {/* for large screen */}
          <div className="hidden lg:flex flex-wrap justify-between items-center p-2 my-4">
            {coursesData &&
              coursesData.length > 0 &&
              coursesData
                .filter((course) => course.isActive) // Filter to only include active courses
                .map((course, index) => (
                  <CoursesCard
                    key={index}
                    courseId={course._id}
                    iscourses={course.iscourses}
                    bgImage={course.courseImage.replace(/^public[\\/]/, "")}
                    heading={course.name}
                    description={course.description}
                  />
                ))}
          </div>

          {/* for small screen */}
          <div className="p-4 block lg:hidden">
            <div
              className="flex gap-4 overflow-x-auto lg:overflow-x-hidden lg:grid lg:grid-cols-3 xl:grid-cols-4"
              style={{
                /* Hide scrollbar for Webkit browsers */
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
              }}
            >
              {coursesData &&
                coursesData.length > 0 &&
                coursesData
                  .filter((course) => course.isActive) // Filter to only include active courses
                  .map((course, index) => (
                    <div
                      className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:w-auto"
                      key={index}
                    >
                      <CoursesCard
                        courseId={course._id}
                        iscourses={course.iscourses}
                        bgImage={course.courseImage.replace(/^public[\\/]/, "")}
                        heading={course.name}
                        description={course.description}
                      />
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {!studentData && (
            <Link
              href="/login"
              className="block text-white bg-gradient-to-t to-btnColor from-btnColorOne p-2 w-44 rounded-md text-center mt-4 mb-16"
            >
              {t("startNow")}
            </Link>
          )}
        </div>
        <div ref={reviewsRef} className="bg-lightCard p-2">
          <p className="text-headingColor text-center text-3xl font-bold p-2">
            {t("reviews.title")}
          </p>
          <p className="text-paraColor text-center">{t("reviews.subtitle")}</p>

          <div>
            {/* Card Container */}
            <div className="hidden lg:flex flex-wrap items-center gap-4 justify-center mb-5">
              {reviewsData.slice(0, visibleCards).map((review, index) => (
                <ReviewsCard
                  t={t}
                  key={index}
                  img={review.img}
                  name={review.name}
                  job={review.job}
                  description={review.description}
                />
              ))}
            </div>

            {/* See More/Less Button */}
            {reviewsData.length > 5 && (
              <div className="text-center mt-4">
                <button
                  onClick={handleToggle}
                  className="px-4 py-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded"
                >
                  {visibleCards === 5 ? t("See All") : t("See Less")}
                </button>
              </div>
            )}
          </div>
          <div className="p-4 block lg:hidden">
            <div
              className="flex gap-4 overflow-x-auto lg:overflow-x-hidden lg:grid lg:grid-cols-3 xl:grid-cols-4"
              style={{
                /* Hide scrollbar for Webkit browsers */
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE and Edge
              }}
            >
              {reviewsData.map((review, index) => (
                <div
                  className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:w-auto "
                  key={index}
                >
                  <ReviewsCard
                    key={index}
                    img={review.img}
                    name={review.name}
                    job={review.job}
                    description={review.description}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Map over the avatarImages array to render Image components */}
          {/* <div className="flex items-center justify-center gap-4 my-4">
            {avatarImages.map((image, index) => (
              <Image
                key={index}
                className="w-14 h-14 rounded-full cursor-pointer hover:border-2 hover:border-btnColor"
                src={image}
                width={1000}
                height={1000}
                alt="Avatar"
              />
            ))}
          </div> */}
        </div>
      </div>
      <TeachersSection />
      <div
        ref={aboutRef}
        className="bg-gradient-to-t to-btnColor from-btnColorOne p-2"
      >
        <p className="text-white text-xl md:text-2xl lg:text-3xl text-center font-bold p-2 mt-10">
          {t("aboutSection.title")}
        </p>
        <div className="w-full lg:w-[1100px] text-center mx-auto my-2">
          {textContent.map((paragraph, index) => (
            <p key={index} className="text-slateColor text-sm my-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
