"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import SummarytitleCard from "../summarytitleCard/summarytitleCard";
import { createSummary } from "@/app/utils/teacher/courses/api";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

const DefineSummaries = ({ courseId }) => {
  const { t } = useTranslation();
  const [summaries, setSummaries] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [summaryTitle, setSummaryTitle] = useState("");
  const [summaryContent, setSummaryContent] = useState("");
  const [selectedSummary, setSelectedSummary] = useState(null); // Track the currently selected summary
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [success, setSuccess] = useState(null); // Success message state

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add summary to the list
  const handleAddSummary = () => {
    if (summaryTitle && summaryContent) {
      setSummaries((prevSummaries) => [
        ...prevSummaries,
        { summaryTitle, description: summaryContent, courseId }, // Include courseId here
      ]);
      setSummaryTitle(""); // Clear input field after adding
      setSummaryContent(""); // Clear content after adding
    }
  };

  // Create summaries in the backend
  const handleCreateSummaries = async () => {
    if (summaries.length === 0) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await createSummary(summaries); // Send all summaries at once
      setSuccess(t("teacherCreateCourseStep3.success"));
      setSummaries([]); // Clear the list after successful creation
      window.location.reload();
    } catch (err) {
      console.error("Error creating summaries:", err);
      setError(t("teacherCreateCourseStep3.errorCreatingSummaries"));
    } finally {
      setLoading(false);
    }
  };

  // Toggle view content
  const handleViewContent = (summary) => {
    if (selectedSummary === summary) {
      setSelectedSummary(null); // Close content if clicked again
    } else {
      setSelectedSummary(summary); // Open the selected content
    }
  };

  // Remove a summary from the list
  const handleRemoveSummary = (summaryToRemove) => {
    setSummaries((prevSummaries) =>
      prevSummaries.filter((summary) => summary !== summaryToRemove)
    );
  };

  if (!isClient) {
    return null; // Do not render on the server side
  }

  return (
    <div className="text-headingColor p-2">
      {/* Summary Title Input */}
      <label htmlFor="summaryTitle">{t("summaryTitle")}</label>
      <span className="text-red-500 text-xs mx-1">*</span>
      <input
        value={summaryTitle}
        onChange={(e) => setSummaryTitle(e.target.value)}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder={t("summaryTitle")}
        id="summaryTitle"
      />

      {/* Summary Content Quill Editor */}
      <div className="my-2">
        <label htmlFor="summaryContent">{t("teacherCreateCourseStep3.summaryTitle")}</label>
        <ReactQuill
          value={summaryContent}
          onChange={setSummaryContent}
          className="outline-none w-full rounded-md p-0 lg:h-[100px] mt-1 mb-4"
          placeholder={t("teacherCreateCourseStep3.summaryContent")}
        />
      </div>

      {/* Add Button */}
      <div className="my-2">
        <button
          type="button"
          onClick={handleAddSummary}
          className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
        >
          {t("teacherCreateCourseStep3.add")}
        </button>
      </div>

      {/* Display Added Summaries */}
      <p className="text-headingColor my-4">{t("teacherCreateCourseStep3.summaries")}</p>
      {summaries.map((summary, index) => (
        <div key={index} className="flex justify-between items-center border-b py-2">
          <SummarytitleCard
            heading={summary.summaryTitle}
            button={selectedSummary === summary ? t("hideContent") : t("viewContent")}
            onButtonClick={() => handleViewContent(summary)} // Show content when clicked
          />
          <button
            type="button"
            onClick={() => handleRemoveSummary(summary)}
            className="text-red-500 flex items-center space-x-1"
          >
            <FaTrashAlt />
            <span>{t("teacherCreateCourseStep3.remove")}</span>
          </button>
        </div>
      ))}

      {/* Create Button */}
      <div className="my-2">
        <button
          type="button"
          onClick={handleCreateSummaries}
          className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
          disabled={loading || summaries.length === 0}
        >
          {loading
            ? t("teacherCreateCourseStep3.creating")
            : t("teacherCreateCourseStep3.create")}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default DefineSummaries;
