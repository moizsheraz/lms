import React, { useState, useEffect } from "react";
import CircularProgressBar from "@/components/common/circularProgressBar/circularProgressBar";
import Image from "next/image";
import Link from "next/link";
import { PiStudentFill } from "react-icons/pi";
import { fetchCourseProgress } from "@/app/utils/teacher/courses/api";
const CourseCard = (props) => {
  console.log("courseImage", props.courseImage);
  // Ensure courseImage is defined, else use a default value
  const formattedCourseImage = props.courseImage
    ? props.courseImage.replace(/^public\\/, "")
    : "images/jpg/man.jpg"; // Replace with an actual default image path if needed

  // Fix the log statement to reference the correct variable
  console.log("formatted", formattedCourseImage);

  // State for course progress
  const [progress, setProgress] = useState(null);

  // Fetch the course progress
  useEffect(() => {
    const getCourseProgress = async () => {
      try {
        if (props.courseId) {
          const courseProgress = await fetchCourseProgress(props.courseId); // Fetch progress
          setProgress(courseProgress);
        }
      } catch (error) {
        console.error("Error fetching course progress:", error);
      }
    };

    getCourseProgress();
  }, [props.courseId]);

  return (
    <Link
      href={
        props.isAdmin
          ? `/admin/course/course-detail/${props.courseId}`
          : props.isLoggedOut
          ? `/course-detail/${props.courseId}`
          : props.isStudent
          ? `/student/course/course-detail/${props.courseId}`
          : props.isTeacher
          ? `/teacher/course/course-detail/${props.courseId}`
          : `/course-detail/${props.courseId}`
      }
      className="block w-full bg-white border rounded-md shadow-md mb-2 p-1"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-12"
            src={`/${formattedCourseImage}`}
            alt="Course"
          />
          <div className="w-48">
            <p className="text-headingColor text-sm">{props.heading}</p>
            <p className="text-paraColor text-xs">
              {props.description.length > 50
                ? props.description.slice(0, 50) + "..."
                : props.description}
            </p>
          </div>
        </div>
        {props.isOwner ? (
          <div>
            <PiStudentFill className="text-btnColor" />
            <p className="text-btnColor text-sm font-bold">
              {props.studentCount}
            </p>
          </div>
        ) : !props.isLoggedOut && progress !== null && !props.isTeacher ? (
          <CircularProgressBar progress={progress} score={progress} />
        ) : null}
      </div>
    </Link>
  );
};

export default CourseCard;
