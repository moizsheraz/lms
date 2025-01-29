import React, { useEffect, useState } from "react";
import CourseCard from "../coureCard/courseCard";
import { fetchCoursesByKeyword } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import { useTranslation } from "react-i18next";

const ResultData = ({ filters = {}, searchQuery }) => {
  const [courses, setCourses] = useState([]);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch courses when searchQuery changes
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetchCoursesByKeyword(searchQuery);
        setCourses(response.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchCourses();
    } else {
      setCourses([]); // Clear courses if there's no search query
      setLoading(false);
    }
  }, [searchQuery]);

  // Ensure filters has default empty arrays for topics, subtopics, and subsubtopics
  const { topics = [], subtopics = [], subsubtopics = [] } = filters;

  // Apply filters to the fetched courses
  const filteredCourses = courses.filter((course) => {
    const matchesTopics =
      topics.length === 0 ||
      topics.some((topic) => course.topic.includes(topic));
    const matchesSubtopics =
      subtopics.length === 0 ||
      subtopics.some((subtopic) => course.subtopics?.includes(subtopic));
    const matchesSubSubtopics =
      subsubtopics.length === 0 ||
      subsubtopics.some((subSubtopic) =>
        course.subsubtopics?.includes(subSubtopic)
      );

    return matchesTopics && matchesSubtopics && matchesSubSubtopics;
  });

  return (
    <div className="w-full lg:w-[60%] p-3">
      <p className="text-sm font-bold text-headingColor mb-2">
        {" "}
        {t("SearchResults")}
      </p>
      {loading ? (
        <LoadingScreen />
      ) : filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard
            isLoggedOut={true}
            key={course._id}
            courseId={course._id}
            heading={course.name}
            description={course.description}
            courseImage={course.courseImage.replace(/^public\//, "")}
          />
        ))
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
};

export default ResultData;
