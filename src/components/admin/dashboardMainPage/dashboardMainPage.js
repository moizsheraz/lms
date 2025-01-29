"use client";
import React, { useEffect, useState } from "react";
import LineGraph from "@/components/common/lineGraph/lineGraph";
import StatCard from "../statCard/statCard";
import CourseCard from "@/components/searchResult/coureCard/courseCard";
import { IoSchool } from "react-icons/io5";
import { PiStudent, PiStudentFill } from "react-icons/pi";
import { fetchCourses } from "@/app/utils/teacher/courses/api";
import { fetchAllTeachers } from "@/app/utils/admin/teachers/api";
import { fetchAllStudents } from "@/app/utils/admin/students/api";
import { fetchEarnings } from "@/app/utils/admin/earnings/api";
import Link from "next/link";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const DashboardMainPage = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [earningsData, setEarningsData] = useState([]); // State to store earnings data

  useEffect(() => {
    const getStudents = async () => {
      const data = await fetchAllStudents();
      setStudents(data);
      setLoading(false);
    };
    getStudents();
  }, []);

  useEffect(() => {
    const getTeachers = async () => {
      const data = await fetchAllTeachers();
      setTeachers(data);
      setLoading(false);
    };
    getTeachers();
  }, []);

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
    const getEarnings = async () => {
      const currentYear = new Date().getFullYear();
      const data = await fetchEarnings(currentYear);
      setEarningsData(data.earnings || []);
    };

    getEarnings();
  }, []);

  return (
    <div>
      <div className="lg:flex block items-center gap-4 ">
        <div className="w-full h-full lg:h-[250px] lg:w-[73%] border rounded-md">
          <LineGraph t={t} earningsData={earningsData} />{" "}
          {/* Pass earningsData to LineGraph */}
        </div>
        <div className="w-full lg:w-[27%]">
          <div className=" flex items-center gap-2 mb-5">
            <StatCard
              icon={<IoSchool />}
              heading={t("adminDashboard.totalCourses")}
              number={courses.length}
            />
            <StatCard
              icon={<PiStudentFill />}
              heading={t("adminDashboard.totalStudents")}
              number={students.length}
            />
          </div>
          <StatCard
            icon={<PiStudent />}
            heading={t("adminDashboard.totalTeachers")}
            number={teachers.length}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-10 mb-4">
        <p className="text-headingColor font-bold text-lg">{t("adminDashboard.courses")}</p>
        <Link
          href="/admin/courses"
          className="text-btnColor text-sm cursor-pointer"
        >
        {t("adminDashboard.seeAll")}
        </Link>
      </div>

      {loading ? (
        <LoadingScreen />
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            isTeacher={true}
            key={course._id}
            isAdmin={true}
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
            href="/admin/create-course"
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
