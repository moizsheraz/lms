"use client";
import React, { useEffect, useState } from "react";
import StatCard from "@/components/admin/statCard/statCard";
import DonutChart from "@/components/common/donutChart/donutChart";
import CourseCard from "@/components/searchResult/coureCard/courseCard";
import { PiBook, PiStudent } from "react-icons/pi";
import { fetchCourses } from "@/app/utils/teacher/courses/api";
import Link from "next/link";
import { fetchTeacherAnalytics } from "@/app/utils/teacher/analytics/api";
import { useTranslation } from "react-i18next";

const DashboardMainPage = ({ profile }) => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCounts, setRatingCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const teacherId = profile._id; // Replace with actual teacher ID

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data.slice(0, 5)); // Display only the first 5 courses
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const data = await fetchTeacherAnalytics(teacherId);

        const totalCourses = data.courses.length;

        // Using a Set to store unique student IDs across all courses
        const uniqueStudentIds = new Set();
        data.courses.forEach((course) => {
          course.totalStudents.forEach((studentId) => {
            uniqueStudentIds.add(studentId);
          });
        });
        const totalStudents = uniqueStudentIds.size;

        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let totalRatingSum = 0;
        let totalReviewsCount = 0;

        // Aggregate rating data across all courses
        data.courses.forEach((course) => {
          for (let rating = 1; rating <= 5; rating++) {
            const count = course.ratingCounts[rating] || 0;
            ratingCounts[rating] += count;
            totalRatingSum += rating * count;
            totalReviewsCount += count;
          }
        });

        setTotalCourses(totalCourses);
        setTotalStudents(totalStudents);
        setRatingCounts(ratingCounts);
        setAverageRating(
          totalReviewsCount
            ? (totalRatingSum / totalReviewsCount).toFixed(1)
            : 0
        );
      } catch (error) {
        console.error("Failed to fetch teacher analytics:", error);
      }
    };

    getAnalytics();
  }, [teacherId]);

  return (
    <div>
      {averageRating > 0 ? (
        <div className="lg:flex block items-center gap-4">
          <div className="w-full h-full lg:h-[250px] lg:w-[75%]">
            <DonutChart
              averageRating={averageRating}
              ratingCounts={ratingCounts}
            />
          </div>
          <div className="w-full lg:w-[25%]">
            <div className="mb-4">
              <StatCard
                icon={<PiBook />}
                heading={t("totalCourse")}
                number={totalCourses}
              />
            </div>
            <StatCard
              icon={<PiStudent />}
              heading={t("totalStudents")}
              number={totalStudents}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white border rounded-md shadow-md p-6 text-center mt-4">
          <p className="text-headingColor font-bold text-lg mb-2">
            {t("noRatingsYet")}
          </p>
        </div>
      )}

      {/* Courses Section */}
      <div className="flex items-center justify-between mt-10 mb-4">
        <p className="text-headingColor font-bold text-lg">
          {t("coursesCount")}
        </p>
        <Link
          href="/teacher/courses"
          className="text-btnColor text-sm cursor-pointer"
        >
          {t("seeAll")}
        </Link>
      </div>

      {loading ? (
        <p>{t("loading")}</p>
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            isTeacher={true}
            key={course._id}
            isOwner={true}
            courseId={course._id}
            studentCount={course.students.length}
            heading={course.name}
            description={course.description.slice(0, 44)}
            courseImage={course.courseImage.replace(/^public\//, "")}
          />
        ))
      ) : (
        <div className="bg-white border rounded-md shadow-md p-6 text-center mt-4">
          <p className="text-headingColor font-bold text-lg mb-2">
            No Courses Created Yet
          </p>
          <p className="text-paraColor text-sm mb-4">
            Start by creating your first course to engage students!
          </p>
          <Link
            href="/teacher/create-course"
            className="w-40 text-white bg-gradient-to-t from-btnColorOne to-btnColor p-2 rounded-md text-center"
          >
            + Create Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardMainPage;
