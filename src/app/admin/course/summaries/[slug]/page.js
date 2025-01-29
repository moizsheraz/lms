"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SummariesContent from "@/components/courseDetail/summariesContent/summariesContent";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import LoadingScreen from "@/components/common/loading/Loading";
import DefineSummaries from "@/components/common/createCourse/defineSummaries/defineSummaries";
import { useTranslation } from "react-i18next";

const Summaries = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const courseId = parts[parts.length - 1];
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    const loadCourseDetails = async () => {
      try {
        const courseData = await fetchCourseById(courseId); // Fetch course by ID
        setCourseDetails(courseData.course); // Set the course details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourseDetails();
  }, [courseId]);

  if (loading) return <LoadingScreen />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {courseDetails ? (
        <>
          <SummariesContent
            isPurchased={true}
            course={courseDetails}
            isTeacher={true}
            summaries={courseDetails.summaries}
          />

          {/* Create Summaries Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="absolute lg:top-2 top-[55px] left-2 p-2 bg-white text-btnColor hover:text-btnColorOne duration-500 rounded-md"
          >
            {t("createSummaries")}
          </button>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="h-[600px] overflow-scroll bg-white p-6 rounded-lg w-11/12 max-w-lg">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500 text-lg float-right"
                >
                  &times;
                </button>
                <h2 className="text-xl font-bold mb-4">{t("defineSummariesHeading")}</h2>
                <DefineSummaries courseId={courseId} />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Course not found.</p>
      )}
    </div>
  );
};

export default Summaries;
