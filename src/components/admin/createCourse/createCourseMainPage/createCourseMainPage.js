"use client";
import React, { useEffect, useState } from "react";
import Stepper from "../steeper/stepper";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CreateCourseMainPage = ({ isAdmin }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    // Get the current URL
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const id = params.get("courseId"); // Get the courseId from query parameters
    setCourseId(id);

    if (id) {
      // Fetch the course data with courseId to populate the form fields
      fetchCourseData(id);
    }
  }, []);

  const fetchCourseData = async (id) => {
    // Implement the fetch logic here
    // Populate the form fields in Stepper if needed
  };

  return (
    <div>
      <p className="text-headingColor font-bold text-3xl mt-2 ">
        {courseId ? t("editCourseHeading") : t("createCourseHeading")}
      </p>
      <Stepper courseId={courseId} isAdmin={isAdmin} />
    </div>
  );
};

export default CreateCourseMainPage;
