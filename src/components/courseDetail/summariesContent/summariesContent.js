"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import SummariesCard from "../summariesCard/summariesCard";
import BreadCrumb from "../breadcrumb/breadCrumb";
import { FaArrowRight, FaEdit, FaTrash, FaMicrophone } from "react-icons/fa";
import { editSummary, deleteSummary } from "@/app/utils/teacher/courses/api";
import { useForm } from "react-hook-form";

// Import ReactQuill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles
import { useTranslation } from "react-i18next";

const SummariesContent = ({
  isTeacher,
  isPurchased,
  summaries,
  setSummaries,
}) => {
  const { t } = useTranslation();

  const [selectedSummary, setSelectedSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedSummary, setUpdatedSummary] = useState({
    summaryTitle: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (selectedSummary) {
      setValue("summaryTitle", selectedSummary.summaryTitle);
      setUpdatedSummary({
        summaryTitle: selectedSummary.summaryTitle,
        description: selectedSummary.description,
      });
    }
  }, [selectedSummary, setValue]);

  const handleSummaryClick = (summary) => {
    if (isPurchased) {
      setSelectedSummary(summary);
    }
  };

  const handleBackToSummaries = () => {
    setSelectedSummary(null);
  };

  const handleEditClick = (summary) => {
    setSelectedSummary(summary);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (summaryId) => {
    if (window.confirm("Are you sure you want to delete this summary?")) {
      setIsLoading(true);
      try {
        await deleteSummary(summaryId);
        window.location.reload();
      } catch (err) {
        console.error("Error deleting summary:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDescriptionChange = (value) => {
    setUpdatedSummary((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleUpdateSummary = async (data) => {
    const updatedData = {
      summaryTitle: data.summaryTitle,
      description: updatedSummary.description,
    };
    setIsLoading(true);
    try {
      await editSummary(selectedSummary._id, updatedData);
      setIsModalOpen(false);
      setSelectedSummary((prev) => ({
        ...prev,
        summaryTitle: updatedData.summaryTitle,
        description: updatedData.description,
      }));
      window.location.reload();
    } catch (err) {
      console.error("Error updating summary:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const [speechRate, setSpeechRate] = useState(1); // Default rate is 1 (normal speed)
  const handleSpeakSummary = () => {
    if (selectedSummary && selectedSummary.description) {
      const strippedDescription = selectedSummary.description.replace(/<[^>]*>/g, "");
      const utterance = new SpeechSynthesisUtterance(strippedDescription);
  
      // Set language to Hebrew
      utterance.lang = "he-IL";
  
      // Get available voices and select a Hebrew voice
      const voices = window.speechSynthesis.getVoices();
      const hebrewVoice = voices.find((voice) => voice.lang === "he-IL");
      if (hebrewVoice) {
        utterance.voice = hebrewVoice; // Use the Hebrew voice
      } else {
        console.warn("No Hebrew voice available.");
      }
  
      // Set the speech rate
      utterance.rate = speechRate;
  
      window.speechSynthesis.speak(utterance);
    }
  };
  
  

  const handleSpeedChange = (newRate) => {
    setSpeechRate(newRate);
  };
  return (
    <div className="bg-gradient-to-t from-btnColorOne to-btnColor p-6 md:p-10 lg:p-20 h-screen">
      {selectedSummary === null ? (
        <BreadCrumb />
      ) : (
        <div className="absolute top-8 right-20">
          <FaArrowRight
            className="text-white"
            onClick={handleBackToSummaries}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}

      {selectedSummary ? (
        <div>
          <div className="lg:flex  block items-center justify-center mb-8">
            <p className="text-white font-black text-center lg:my-0 text-2xl">
              {selectedSummary.summaryTitle}
            </p>
            {isTeacher && (
              <>
                <FaEdit
                  onClick={() => handleEditClick(selectedSummary)}
                  className="text-white ml-4 cursor-pointer"
                />
                <FaTrash
                  onClick={() => handleDeleteClick(selectedSummary._id)}
                  className="text-red-500 ml-4 cursor-pointer"
                />
              </>
            )}

          </div>
          <div className=" lg:w-3/5 w-full  mx-auto ">
            <div className="flex items-center justify-start my-2  ">
              <FaMicrophone
                onClick={handleSpeakSummary}
                className="text-white ml-4 cursor-pointer"
              />
              <div className="flex items-center ml-4">
                <label htmlFor="speed" className="text-white mr-2">
                  Speed:
                </label>
                <select
                  id="speed"
                  value={speechRate}
                  onChange={(e) => handleSpeedChange(Number(e.target.value))}
                  className="p-2 rounded bg-white"
                >
                  <option value={0.5}>Slow</option>
                  <option value={1}>Normal</option>
                  <option value={1.5}>Fast</option>
                  <option value={2}>Very Fast</option>
                </select>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-xl text-slate-800 flex justify-center p-3 overflow-x-auto">

              <div
                className="max-w-full break-words"
                dangerouslySetInnerHTML={{ __html: selectedSummary.description }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-white font-bold text-base md:text-xl lg:text-2xl mx-auto mb-8 text-center">
            {t("summaries")}
          </p>
          <div className="w-full h-full lg:h-[400px] lg:overflow-auto lg:w-[50%] mx-auto bg-white p-3 md:p-6 border rounded-md">
            {summaries.length === 0 ? (
              <div className="text-center text-gray-500">
                {t("nosummariesyet")}
              </div>
            ) : (
              summaries.map((summary) => (
                <div key={summary._id}>
                  <div onClick={() => handleSummaryClick(summary)}>
                    <SummariesCard
                      isStudent={true}
                      summaryId={summary._id}
                      title={summary.summaryTitle}
                      isPurchased={isPurchased}
                      isSelected={selectedSummary?._id === summary._id}
                    />
                    <div className="flex justify-end mt-2">
                      {isTeacher && (
                        <>
                          <FaEdit
                            onClick={() => handleEditClick(summary)}
                            className="text-blue-500 cursor-pointer mx-2"
                          />
                          <FaTrash
                            onClick={() => handleDeleteClick(summary._id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-2xl mb-4">Edit Summary</h3>
            <input
              type="text"
              name="summaryTitle"
              placeholder="Summary Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              {...register("summaryTitle")}
            />
            <ReactQuill
              value={updatedSummary.description}
              onChange={handleDescriptionChange}
              placeholder="Description"
              className="w-full mb-4"
            />
            {isLoading ? (
              <p className="text-center text-blue-500">{t("pleaseWait")}</p>
            ) : (
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={handleSubmit(handleUpdateSummary)}
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SummariesContent;
