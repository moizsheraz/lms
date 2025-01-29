"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import HeroSection from "../heroSection/heroSection";
import CourseCard from "@/components/searchResult/coureCard/courseCard";
import { fetchStudentCourses } from "@/app/utils/student/courses/api";
import { fetchStudentProfile } from "@/app/utils/student/auth/api";
import { fetchStudentDetailsWithCourses } from "@/app/utils/admin/students/api";
import { fetchTeacherDetailsWithCourses } from "@/app/utils/admin/teachers/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const ProfileMainPage = ({ studentId, isAdmin, isTeacher }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [displayedCourses, setDisplayedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const loadProfileAndCourses = async () => {
      try {
        if (isTeacher && studentId) {
          // Fetch teacher details
          const response = await fetchTeacherDetailsWithCourses(studentId);
          if (response.error) {
            setError(response.error);
          } else {
            setProfile({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              role: response.data.role,
            });
            // Here, response.data.courses is assumed to be an array of course IDs
            // You may need to fetch course details separately if these are just IDs.
            setCourses(response.data.courses);
            setDisplayedCourses(response.data.courses.slice(0, 3)); // Display first 3 courses
          }
        } else if (studentId) {
          // Fetch student details
          const response = await fetchStudentDetailsWithCourses(studentId);
          if (response.error) {
            setError(response.error);
          } else {
            setProfile(response.data.student);
            const activeCourses = response.data.purchasedCourses.filter(
              (course) => course.isActive
            );
            setCourses(activeCourses);
            setDisplayedCourses(activeCourses.slice(0, 3)); // Display the first 3 active courses
          }
        } else {
          // Fetch student profile and courses without studentId
          const profileData = await fetchStudentProfile();
          setProfile(profileData);

          const coursesData = await fetchStudentCourses();
          const activeCourses = coursesData.courses.filter(
            (course) => course.isActive
          );
          setCourses(activeCourses);
          setDisplayedCourses(activeCourses.slice(0, 3));
        }
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    loadProfileAndCourses();
  }, [studentId, isTeacher]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (!showAll) {
      setDisplayedCourses(courses); // Show all courses
    } else {
      setDisplayedCourses(courses.slice(0, 3)); // Show first 3 courses
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="lg:px-6 p-1">
      <HeroSection isTeacher={isTeacher} profile={profile} isAdmin={isAdmin} />

      <div className="flex items-center justify-between mt-10 mb-4">
        {isTeacher ? (
          <p className="text-lg font-bold">Courses I Have Created</p>
        ) : (
          <p className="text-lg font-bold">{t("studentprofile.coursesEnrolled")}</p>
        )}
        {isAdmin ? (
          <button onClick={toggleShowAll} className="text-sm text-btnColor">
            {showAll ? "Show less" : "See all"}
          </button>
        ) : (
          <Link
            href="/student/enrolled-courses"
            className="text-sm text-btnColor"
          >
            {t("studentprofile.seeAll")}
          </Link>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="p-2 flex items-center justify-center h-64 bg-gray-100 border rounded-md">
          <p className="text-gray-600 text-sm md:text-lg font-semibold">
            No active courses enrolled yet.
          </p>
        </div>
      ) : (
        displayedCourses.map((course) => (
          <CourseCard
            isStudent={true}
            key={course._id}
            courseId={course._id}
            isTeacher={isTeacher}
            heading={course.name}
            description={course.description}
            isOwner={false}
            courseImage={course.courseImage.replace(/^public\//, "")}
          />
        ))
      )}
    </div>
  );
};

export default ProfileMainPage;
