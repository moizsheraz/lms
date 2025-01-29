"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/searchResult/coureCard/courseCard";
import { fetchStudentCourses } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading"; 
const EnrolledCoursesMainPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchStudentCourses();
        // Filter courses to only include those with isActive: true
        const activeCourses = data.courses.filter(course => course.isActive);
        setCourses(activeCourses); // Set the active courses
      } catch (err) {
       
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    loadCourses(); // Call the function to load courses
  }, []);

  if (loading) return <LoadingScreen />; // Display the LoadingScreen component
  if (error) return <p>Error: {error}</p>; // Error message

  return (
    <div className="lg:px-6 p-1">
      {/* Check if filtered courses array is empty */}
      {courses.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-gray-100 border rounded-md">
          <p className="text-gray-600 text-lg font-semibold">
            No active courses enrolled yet. Explore and enroll in new courses!
          </p>
        </div>
      ) : (
        // Map over the filtered active courses to render CourseCard components
        courses.map((course) => (
          <CourseCard
            isStudent={true}
            key={course._id}
            heading={course.name}
            courseId={course._id}
            courseImage={course.courseImage.replace(/^public\//, "")}
            description={course.description}
            isOwner={false} // Adjust this based on your logic
          />
        ))
      )}
    </div>
  );
};

export default EnrolledCoursesMainPage;
