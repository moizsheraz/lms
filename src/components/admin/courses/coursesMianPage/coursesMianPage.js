"use client"
import CourseCard from "@/components/searchResult/coureCard/courseCard";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

const CoursesMainPage = ({ courses = [], isOwner, isTeacher, isAdmin }) => {
  const { t } = useTranslation();
  const descriptionLimit = 44;

  const formatImagePath = (path) => path.replace(/^public\//, ""); // Remove "public/" if present

  return (
    <div className="w-full ">
      <div className="flex items-center justify-between my-4">
        <p className="text-headingColor font-bold text-lg">{t("teacherMyCourses.myCourses")}</p>
        <Link
          href={`${
            isAdmin ? "/admin/create-course" : "/teacher/create-course"
          } `}
          className="w-36 text-white bg-gradient-to-t from-btnColorOne to-btnColor p-2 rounded-md text-center"
        >
          + {t("teacherMyCourses.newCourse")}
        </Link>
        
      </div>

      {courses.length > 0 ? (
        courses.map((course, index) => (
          <CourseCard
            isAdmin={isAdmin}
            isTeacher={isTeacher}
            key={course._id || index}
            isOwner={isOwner}
            courseId={course._id}
            studentCount={course.students.length}
            heading={course.name}
            description={course.description.slice(0, descriptionLimit)}
            courseImage={formatImagePath(course.courseImage)} // Format the image path
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
            href={`${
              isAdmin ? "/admin/create-course" : "/teacher/create-course"
            } `}
            className="w-40 text-white bg-gradient-to-t from-btnColorOne to-btnColor p-2 rounded-md text-center"
          >
            + Create Course
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesMainPage;
