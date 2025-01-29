"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaTrashAlt } from "react-icons/fa"; // React Icon for trash button
import SummarytitleCard from "../summarytitleCard/summarytitleCard";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles
import { useTranslation } from "react-i18next";

const DefineSummaries = ({ register, setValue, getValues, courseData }) => {
  const { t } = useTranslation();
  const [summaries, setSummaries] = useState(getValues("summaries") || []);
  const [isClient, setIsClient] = useState(false);
  const [summaryContent, setSummaryContent] = useState(
    getValues("summaryContent") || ""
  );
  const [selectedSummary, setSelectedSummary] = useState(null); // State to hold selected summary

  // Local state for default summaries
  const [defaultSummaries, setDefaultSummaries] = useState(
    courseData?.course?.summaries || []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setValue("summaries", summaries);
  }, [summaries, setValue]);

  const handleAddSummary = () => {
    const title = getValues("summaryTitle");

    if (title && summaryContent) {
      setSummaries((prevSummaries) => [
        ...prevSummaries,
        { title, content: summaryContent },
      ]);
      setValue("summaryTitle", "");
      setSummaryContent(""); // Clear content after adding
    }
  };

  const handleContentChange = (content) => {
    setSummaryContent(content);
    setValue("summaryContent", content); // Update form state with content
  };

  const handleViewContent = (summary) => {
    // Toggle the content view when the same summary is clicked again
    if (selectedSummary === summary) {
      setSelectedSummary(null);
    } else {
      setSelectedSummary(summary);
    }
  };

  const handleRemoveSummary = (summaryToRemove) => {
    if (defaultSummaries.includes(summaryToRemove)) {
      // If it's from default summaries, remove it from the defaultSummaries state
      setDefaultSummaries((prevDefaultSummaries) =>
        prevDefaultSummaries.filter((summary) => summary !== summaryToRemove)
      );
    } else {
      // If it's from added summaries, remove it from the added summaries state
      setSummaries((prevSummaries) =>
        prevSummaries.filter((summary) => summary !== summaryToRemove)
      );
    }
  };

  if (!isClient) {
    return null; // Do not render on the server side
  }
  return (
    <div className="text-headingColor p-2">
      <label htmlFor="summaryTitle">Summary Title</label>
      <span className="text-red-500 text-xs mx-1">*</span>
      <input
        {...register("summaryTitle")}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder="Summary Title"
        id="summaryTitle"
      />

      <div className="my-2">
        <label htmlFor="summaryContent">{t("teacherCreateCourseStep3.summaryTitle")}</label>
        <ReactQuill
          value={summaryContent} // Use local state for ReactQuill content
          onChange={handleContentChange} // Update content with HTML
          className="outline-none w-full rounded-md p-0 lg:h-[100px] mt-1 mb-4"
          placeholder={t("teacherCreateCourseStep3.summaryContent")}
        />
      </div>
      <div className="my-2">
        <button
          type="button"
          onClick={handleAddSummary}
          className="w-32 p-2 bg-gradient-to-t from-btnColorOne to-btnColor text-white rounded-md mt-7 mb-4"
        >
          {t("teacherCreateCourseStep3.add")}
        </button>
      </div>

      <p className="text-headingColor my-4">{t("teacherCreateCourseStep3.summaries")}</p>
      {/* Combined default and added summaries */}
      {[...defaultSummaries, ...summaries].map((summary, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b py-2"
        >
          <SummarytitleCard
            heading={summary.summaryTitle || summary.title} // Handle both types of summaries
            button={
              selectedSummary === summary ? "Hide Content" : "View Content"
            }
            onButtonClick={() => handleViewContent(summary)} // Pass summary to handler
          />
          {/* Conditionally render the remove button only for added summaries */}
          {!defaultSummaries.includes(summary) && (
            <button
              type="button"
              onClick={() => handleRemoveSummary(summary)}
              className="text-red-500 flex items-center space-x-1"
            >
              <FaTrashAlt />
              <span>Remove</span>
            </button>
          )}
        </div>
      ))}

      {/* Display selected summary details */}
      {selectedSummary && (
        <div className="border rounded-md p-4 mt-4 bg-gray-100">
          <h2 className="text-lg font-bold mb-2">{selectedSummary.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: selectedSummary.content || selectedSummary.description,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DefineSummaries;
