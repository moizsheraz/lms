"use client";
import React, { useState, useEffect } from "react";
import ExamsCard from "../examsCard/examsCard";
import BreadCrumb from "../breadcrumb/breadCrumb";
import { FaTrash, FaEdit, FaHeart } from "react-icons/fa"; // Add edit icon
import { deleteExam } from "@/app/utils/teacher/courses/api";
import { editExam } from "@/app/utils/common/exam/api";
import { useTranslation } from "react-i18next";
import { checkExamLikeStatus, likeExam } from "@/app/utils/student/summary/api";

const ExamsContent = ({ isTeacher, exams, isPurchased, isStudent }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for opening/closing the modal
  const [selectedExam, setSelectedExam] = useState(null); // State for selected exam
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const handleDeleteExam = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        const message = await deleteExam(examId);
        alert(message);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting exam:", error);
        alert(error.message);
      }
    }
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleUpdateExam = async () => {
    setIsLoading(true); // Set loading state to true
    const updatedExam = selectedExam;

    // Prepare exam data
    const examData = {
      examId: updatedExam._id,
      name: updatedExam.name,
      updatedQuestions: updatedExam.questions.map((q) => ({
        _id: q._id,
        questionText: q.questionText,
        hint: q.hint,
        options: q.options,
        correctIndex: q.correctIndex,
        questionImage: q.questionImage,
        hintImage: q.hintImage,
      })),
    };

    try {
      const result = await editExam(examData); // Call editExam function
      alert(result.message);
      setIsLoading(false); // Reset loading state
      window.location.reload();
    } catch (error) {
      console.error("Error updating exam:", error);
      alert("Failed to update the exam");
      setIsLoading(false); // Reset loading state
    }
  };

  const handleImageChange = async (event, questionIndex, imageType) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedExam((prevExam) => {
        const updatedQuestions = [...prevExam.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          [imageType]: reader.result, // Set base64 image
        };
        return { ...prevExam, questions: updatedQuestions };
      });
    };
    reader.readAsDataURL(file);
  };

  const [likedExams, setLikedExams] = useState(new Set()); // Track liked exams

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const likedStatuses = await Promise.all(
          exams.map((exam) => checkExamLikeStatus(exam._id))
        );
        const likedSet = new Set(
          exams
            .filter((_, index) => likedStatuses[index]?.hasLiked) // Updated to use hasLiked
            .map((exam) => exam._id)
        );
        setLikedExams(likedSet);
        console.log("Liked Exams Set:", likedSet);
      } catch (error) {
        console.error("Error fetching liked statuses:", error);
      }
    };
    fetchLikedStatus();
  }, [exams]);

  const handleLikeExam = async (examId) => {
    try {
      await likeExam(examId);
      setLikedExams((prevLikedExams) => {
        const updated = new Set(prevLikedExams);
        if (updated.has(examId)) {
          updated.delete(examId); // Unlike if already liked
        } else {
          updated.add(examId); // Like if not already liked
        }
        return updated;
      });
    } catch (error) {
      console.error("Error liking exam:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20 h-screen">
      <BreadCrumb />
      <p className="text-white font-bold text-base md:text-xl lg:text-2xl mx-auto mb-8 text-center">
        {t("exams")}
      </p>
      <div className="w-full h-[400px] overflow-auto lg:w-[50%] mx-auto bg-white p-3 md:p-6 border rounded-md">
        {exams && exams.length > 0 ? (
          exams.map((exam) => (
            <div
              key={exam._id}
              className={`p-3 my-4 border ${
                likedExams.has(exam._id) ? "border-green-500" : ""
              } rounded-md`}
            >
              <ExamsCard
                isStudent={isStudent}
                examId={exam._id}
                heading={exam.name}
                isTeacher={isTeacher}
                description={`${exam.questions.length} ${t("question")}`}
                isPurchased={isPurchased}
              />
              {isStudent && (
                <FaHeart
                  onClick={() => handleLikeExam(exam._id)}
                  className={`cursor-pointer ${
                    likedExams.has(exam._id) ? "text-red-500" : "text-gray-500"
                  }`}
                />
              )}
              {isTeacher && (
                <div className="flex justify-end mt-2">
                  <FaEdit
                    onClick={() => handleEditExam(exam)}
                    className="text-blue-500 cursor-pointer mr-4"
                  />
                  <FaTrash
                    onClick={() => handleDeleteExam(exam._id)}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border rounded-md p-6 text-center mt-4">
            <p className="text-headingColor font-bold text-lg mb-2">
              {t("noExamYet")}
            </p>
          </div>
        )}
      </div>

      {/* Modal for editing the exam */}
      {isModalOpen && selectedExam && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg h-[500px] overflow-auto w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 shadow-lg transform transition-all ease-in-out duration-300">
            <h3 className="text-3xl mb-6 text-center font-semibold text-gray-700">
              {t("editExam")}
            </h3>
            <input
              type="text"
              value={selectedExam.name}
              onChange={(e) =>
                setSelectedExam({ ...selectedExam, name: e.target.value })
              }
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Exam Name"
            />
            {/* Edit Questions */}
            <div className="mt-6">
              <label>
                Question Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index, "questionImage")}
                />
              </label>
              <div className="text-sm my-1 text-red-500">
                        <span>{t("imageSize")}</span>
                      </div>

              <h4 className="text-xl font-medium text-gray-800 mb-4">
                {t("question")}
              </h4>
              {selectedExam.questions.map((question, index) => (
                <div key={question._id} className="mb-6">
                  <label className="block text-gray-600 font-medium mb-2">
                    {t("question")} {index + 1}
                  </label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) =>
                      setSelectedExam({
                        ...selectedExam,
                        questions: selectedExam.questions.map((q, i) =>
                          i === index
                            ? { ...q, questionText: e.target.value }
                            : q
                        ),
                      })
                    }
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter the question"
                  />

                  {/* Display question image */}
                  {question.questionImage && (
                    <div className="mb-4">
                      <p className="text-gray-600 font-medium mb-2">
                        {t("questionImage")}
                      </p>

                      <img
                        className="w-32 h-32 object-cover rounded border"
                        src={`${
                          question.questionImage &&
                          question.questionImage.trim() !== ""
                            ? `/${question.questionImage
                                .replace(/^public[\\/]/, "")
                                .trim()}`
                            : "/images/png/solvedexams.png"
                        }`}
                      />
                    </div>
                  )}

                  <label>
                    Update Question Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageChange(e, index, "questionImage")
                      }
                    />
                  </label>
                  <div className="text-sm my-1 text-red-500">
                        <span>{t("imageSize")}</span>
                      </div>

                  <label className="block text-gray-600 font-medium mb-2">
                    {t("hint")}
                  </label>
                  <textarea
                    value={question.hint}
                    onChange={(e) =>
                      setSelectedExam({
                        ...selectedExam,
                        questions: selectedExam.questions.map((q, i) =>
                          i === index ? { ...q, hint: e.target.value } : q
                        ),
                      })
                    }
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Provide a hint"
                  />

                  {/* Display hint image */}
                  {question.hintImage && (
                    <div className="mb-4">
                      <p className="text-gray-600 font-medium mb-2">
                        {t("hintImage")}
                      </p>
                      <img
                        className="w-32 h-32 object-cover rounded border"
                        src={`${
                          question.hintImage && question.hintImage.trim() !== ""
                            ? `/${question.hintImage
                                .replace(/^public[\\/]/, "")
                                .trim()}`
                            : "/images/png/solvedexams.png"
                        }`}
                      />
                    </div>
                  )}

                  <label>
                    Update Hint Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, index, "hintImage")}
                    />
                  </label>
                  <div className="text-sm my-1 text-red-500">
                        <span>{t("imageSize")}</span>
                      </div>

                  <div className="mb-4">
                    <h5 className="text-lg font-medium text-gray-600 mb-2">
                      {t("option")}
                    </h5>
                    {question.options.map((option, i) => (
                      <input
                        key={i}
                        type="text"
                        value={option}
                        onChange={(e) =>
                          setSelectedExam({
                            ...selectedExam,
                            questions: selectedExam.questions.map((q, idx) =>
                              idx === index
                                ? {
                                    ...q,
                                    options: q.options.map((opt, idx2) =>
                                      idx2 === i ? e.target.value : opt
                                    ),
                                  }
                                : q
                            ),
                          })
                        }
                        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Option ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-600"
                onClick={handleCloseModal}
              >
                {t("modalButtons.cancel")}
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
                onClick={handleUpdateExam} // Submit changes
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? t("pleaseWait") : "Update Exam"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsContent;
