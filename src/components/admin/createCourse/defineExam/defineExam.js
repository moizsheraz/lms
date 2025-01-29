"use client"
import React, { useEffect, useState } from "react";
import SummarytitleCard from "../summarytitleCard/summarytitleCard";
import { FaTrashAlt } from "react-icons/fa"; // Import trash icon from react-icons
import { useTranslation } from "react-i18next";

const DefineExam = ({
  register,
  setValue,
  getValues,
  nextStep,
  setSelectedExam,
  courseData, // courseData passed as prop
}) => {
  console.log("courseData", courseData);

  // Local state for exams
  const [exams, setExams] = useState(getValues("exams") || []);

  // Local state for default exams from courseData
  const [defaultExams, setDefaultExams] = useState([]);

  // Sync local exams state with form state
  useEffect(() => {
    setValue("exams", exams);
  }, [exams, setValue]);

  // Set default exams when courseData is available
  useEffect(() => {
    if (courseData?.course?.exam) {
      setDefaultExams(courseData.course.exam);
    }
  }, [courseData]);

  const handleAddExam = () => {
    const examName = getValues("examName");

    if (examName) {
      // Update local exams state
      setExams((prevExams) => [
        ...prevExams,
        { name: examName, questions: [] },
      ]);
      setValue("examName", ""); // Clear the input field
    }
  };

  const handleRemoveExam = (examName) => {
    // Remove exam from both local exams state and form state
    setExams((prevExams) => prevExams.filter((exam) => exam.name !== examName));
  };
  const { t } = useTranslation();

  return (
    <div className="text-headingColor p-2">
      <label htmlFor="examName">{t("teacherCreateCourseStep4no1.examName")}</label>
      <span className="text-red-500 text-xs mx-1">*</span>
      <input
        {...register("examName")}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder="Exam Name"
        id="examName"
      />

      <button
        type="button"
        onClick={handleAddExam}
        className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
      >
        {t("teacherCreateCourseStep4no1.add")}
      </button>

      <p className="text-headingColor my-4">{t("teacherCreateCourseStep4no1.definedExams")}</p>

      {/* Display both default and added exams */}
      {defaultExams.length === 0 && exams.length === 0 ? (
        <p>{t("teacherCreateCourseStep4no1.noExamsAvailable")}</p>
      ) : (
        [...defaultExams, ...exams].map((exam, index) => (
          <div key={index} className="mb-4 flex justify-between items-center">
            <SummarytitleCard
              // Pass isPrev prop as true for default exams
              isPrev={defaultExams.some(
                (defaultExam) => defaultExam.name === exam.name
              )}
              heading={exam.name}
              button="Questions"
              onButtonClick={() => {
                setSelectedExam(exam.name); // Set the selected exam name
                if (typeof nextStep === "function") {
                  nextStep(); // Call nextStep to move to the question step
                }
              }}
            />

            {/* Conditionally render the remove button only for added exams */}
            {!defaultExams.some(
              (defaultExam) => defaultExam.name === exam.name
            ) && (
                <button
                  onClick={() => handleRemoveExam(exam.name)}
                  className="text-red-500 flex items-center space-x-2 mt-2 hover:text-red-700"
                >
                  <FaTrashAlt className="text-lg" />
                </button>
              )}
          </div>
        ))
      )
      }
    </div >
  );
};

export default DefineExam;
