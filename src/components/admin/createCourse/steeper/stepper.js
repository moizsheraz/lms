"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CourseDetail from "../courseDetail/courseDetail";
import UploadMaterial from "../uploadMaterial/uploadMaterial";
import DefineSummaries from "../defineSummaries/defineSummaries";
import DefineExam from "../defineExam/defineExam";
import DefineQuestion from "../defineQuestion/defineQuestion";
import { createCourse, editCourse } from "@/app/utils/teacher/courses/api";
import { fetchCourseById } from "@/app/utils/student/courses/api";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Stepper = ({ courseId, isAdmin }) => {
  const { t } = useTranslation();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [courseInfo, setCourseInfo] = useState(null);
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  // to fetch course if exist
  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        try {
          const courseData = await fetchCourseById(courseId);
          setCourseInfo(courseData);
          // Set the main course fields
          setValue("courseName", courseData.name);
          setValue("price", courseData.price);
          setValue("shortDescription", courseData.description);
          setValue("uploadImage", courseData.courseImage);
          setValue("theoreticalMaterial", courseData.theoreticalMaterial);
          setValue("auxiliaryMaterial", courseData.auxiliaryMaterial);
          setValue("topic", courseData.topic);
          setValue("isActive", courseData.isActive);

          // Set teacher details
          if (courseData.teacher) {
            setValue("teacher.firstName", courseData.teacher.firstName);
            setValue("teacher.lastName", courseData.teacher.lastName);
            setValue("teacher.email", courseData.teacher.email);
          }

          // Set summaries and exams if they exist
          if (courseData.summaries) {
            courseData.summaries.forEach((summary, index) => {
              setValue(
                `summaries[${index}].summaryTitle`,
                summary.summaryTitle
              );
              setValue(`summaries[${index}].description`, summary.description);
            });
          }

          if (courseData.exam) {
            courseData.exam.forEach((exam, index) => {
              setValue(`exams[${index}].name`, exam.name);
              exam.questions.forEach((question, qIndex) => {
                setValue(
                  `exams[${index}].questions[${qIndex}].questionText`,
                  question.questionText
                );
              });
            });
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
        }
      } else {
        // Initialize default values for a new course
        setCourseInfo({
          name: "",
          price: "",
          description: "",
          courseImage: "",
          theoreticalMaterial: "",
          auxiliaryMaterial: "",
          topic: "",
          isActive: true,
          summaries: [],
          exam: [],
          subtopics: [],
          subsubtopics: [],
          teacher: {
            firstName: "",
            lastName: "",
            email: "",
          },
        });

        // Set default values for the form
        setValue("courseName", "");
        setValue("price", "");
        setValue("shortDescription", "");
        setValue("uploadImage", "");
        setValue("theoreticalMaterial", "");
        setValue("auxiliaryMaterial", "");
        setValue("topic", "");
        setValue("isActive", true);
      }
    };

    fetchCourse();
  }, [courseId, setValue]);

  const nextStep = () => {
    if (currentStep === 4) {
      if (currentSubStep < subSteps.length) {
        setCurrentSubStep(currentSubStep + 1);
      } else {
        setCurrentStep(currentStep + 1);
        setCurrentSubStep(1); // Reset substep when moving to the next main step
      }
    } else if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep === 4) {
      if (currentSubStep > 1) {
        setCurrentSubStep(currentSubStep - 1);
      } else {
        setCurrentStep(currentStep - 1);
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Steps to render each component in order
  const steps = [
    {
      component: (
        <CourseDetail
          courseData={courseInfo}
          register={register}
          setValue={setValue}
        />
      ),
      label: t("courseDetailsHeading"),
    },
    {
      component: (
        <UploadMaterial
          courseData={courseInfo}
          register={register}
          setValue={setValue}
        />
      ),
      label: t("uploadMaterialHeading"),
    },
    {
      component: (
        <DefineSummaries
          courseData={courseInfo}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      ),
      label: t("defineSummariesHeading"),
    },
    {
      component: (
        <DefineExam
          courseData={courseInfo}
          register={register}
          setValue={setValue}
          getValues={getValues}
          nextStep={nextStep}
          setSelectedExam={setSelectedExam} // Pass down the function to set selected exam
        />
      ),
      label: t("defineExamsHeading"),
    },
  ];

  const subSteps = [
    {
      component: (
        <DefineExam
          courseData={courseInfo}
          register={register}
          setValue={setValue}
          getValues={getValues}
          nextStep={nextStep}
          setSelectedExam={setSelectedExam} // Pass down the function to set selected exam
        />
      ),
      label: t("examDetailHeading"),
    },
    {
      component: (
        <DefineQuestion
          courseData={courseInfo}
          register={register}
          setValue={setValue}
          getValues={getValues}
          selectedExam={selectedExam} // Pass down the selected exam
        />
      ),
      label: t("defineQuestionHeading"),
    },
  ];

  // Inside Stepper component

  const onSubmit = async () => {
    const formData = getValues();
    console.log("courseInfo:", formData);

    // Validate that at least one question is added for each exam
    const allExamsValid = (formData.exams || []).every(
      (exam) => exam.questions && exam.questions.length > 0
    );

    if (!allExamsValid) {
      alert("Please add at least one question for each exam.");
      return;
    }

    const allSummaries = [
      ...(courseInfo?.summaries?.map((summary) => ({
        title: summary.summaryTitle,
        content: summary.description,
        isDefault: true,
        id: summary._id,
        isRemoved: false,
      })) || []),
      ...(formData.summaries
        ?.filter((summary) => !summary.isRemoved)
        .map((summary) => ({
          title: summary.title || summary.summaryTitle,
          content: summary.content || summary.description,
          isDefault: summary.isDefault || false,
        })) || []),
    ];

    const allExams = [
      ...(courseInfo?.exam?.map((exam) => ({
        name: exam.name,
        isDefault: true,
        id: exam._id,
        questions: exam.questions.map((question) => ({
          questionText: question.questionText || question.question,
          options: question.options,
          correctIndex: question.correctIndex,
          hint: question.hint,
          questionImage: question.questionImage || "",
        })),
      })) || []),
      ...(formData.exams?.map((exam) => ({
        name: exam.name,
        isDefault: exam.isDefault || false,
        questions: exam.questions.map((question) => ({
          questionText: question.questionText || question.question,
          options: question.options,
          correctIndex: question.correctIndex,
          hint: question.hint,
          questionImage: question.questionImage || "",
        })),
      })) || []),
    ];

    const payload = {
      courseImage: formData.uploadImage || courseInfo.courseImage,
      name: formData.courseName || courseInfo.name,
      price: formData.price || courseInfo.price,
      description: formData.shortDescription || courseInfo.description,
      topic: formData.selectTopic || courseInfo.topic,
      subtopics: formData.selectSubtopic
        ? [formData.selectSubtopic]
        : courseInfo.subtopics,
      subsubtopics: formData.selectSubSubtopic
        ? [formData.selectSubSubtopic]
        : courseInfo.subsubtopics,
      theoreticalMaterial:
        formData.theoreticalMaterialLink || courseInfo.theoreticalMaterial,
      auxiliaryMaterial:
        formData.auxiliaryMaterialLink || courseInfo.auxiliaryMaterial,
      summaries: allSummaries,
      exams: allExams,
    };

    try {
      setIsSubmitting(true);
      let response;
      if (courseId) {
        response = await editCourse(courseId, payload);
      } else {
        response = await createCourse(payload);
      }
      console.log("API response:", response);

      if (typeof window !== "undefined") {
        localStorage.removeItem("exams");
        localStorage.removeItem("summaries");
      }

      setIsCompleted(true);
      router.push(isAdmin ? "/admin/courses" : "/teacher/courses");
    } catch (error) {
      console.error(
        "API error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main Stepper */}
      <div className="flex items-center mt-10">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 flex justify-center items-center rounded-full ${
                  index + 1 < currentStep || (index === 3 && currentSubStep > 1)
                    ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                    : index + 1 === currentStep
                    ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                    : "border-2 border-paraColor text-gray-500"
                }`}
              >
                {index + 1 < currentStep ||
                (index === 3 && currentSubStep > 1) ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <p
                className={`my-2 w-20 text-center text-sm ${
                  index + 1 < currentStep || index + 1 === currentStep
                    ? "text-btnColor"
                    : "text-paraColor"
                }}
                style={{ lineHeight: "1" }`}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 border-b-2 ${
                  index + 1 < currentStep
                    ? "border-btnColor"
                    : "border-paraColor"
                }}
                style={{ height: "2px", marginTop: "-4px" }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Sub-Stepper for Step 4 */}
      {currentStep === 4 && (
        <div className="mt-6">
          <div className="flex items-center">
            {subSteps.map((subStep, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 flex justify-center items-center rounded-full ${
                      index + 1 <= currentSubStep
                        ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                        : "border-2 border-paraColor text-gray-500"
                    }`}
                  >
                    {index + 1 <= currentSubStep ? (
                      <span>&#10003;</span>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p
                    className={`my-2 w-20 text-center text-sm ${
                      index + 1 <= currentSubStep
                        ? "text-btnColor"
                        : "text-paraColor"
                    }}
                    style={{ lineHeight: "1" }`}
                  >
                    {subStep.label}
                  </p>
                </div>
                {index < subSteps.length - 1 && (
                  <div
                    className={`w-16 border-b-2 ${
                      index + 1 <= currentSubStep
                        ? "border-btnColor"
                        : "border-paraColor"
                    }`}
                    style={{ height: "2px", marginTop: "-4px" }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form for the current step or sub-step */}
      <div className="mt-6">
        {currentStep === 4 && currentSubStep <= subSteps.length
          ? subSteps[currentSubStep - 1].component
          : steps[currentStep - 1].component}
      </div>

      {/* Main Stepper Navigation */}
      <div className="flex justify-between mt-6 p-2">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded ${
            currentStep === 1
              ? "bg-paraColor"
              : "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
          }`}
        >
          {t("teacherCreateCourseStep1.previous")}
        </button>
        {currentStep === steps.length && currentSubStep === subSteps.length ? (
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {isSubmitting
              ? t("pleaseWait")
              : t("teacherCreateCourseStep4no2.submit")}
          </button>
        ) : (
          <button
            onClick={nextStep}
            className={`px-4 py-2 rounded ${
              currentStep === steps.length && currentSubStep === subSteps.length
                ? "bg-paraColor"
                : "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
            }`}
          >
            {t("teacherCreateCourseStep1.next")}
          </button>
        )}
      </div>

      {/* Success Message after Submission */}
      {isCompleted && (
        <div className="mt-6 text-center text-green-500">
          All steps completed! Form submitted successfully.
        </div>
      )}
    </div>
  );
};

export default Stepper;
