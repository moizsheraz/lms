"use client";
import React, { useState, useEffect } from "react";
import {
  fetchTopics,
  fetchAllSubtopicsAndSubSubtopics,
} from "@/app/utils/common/topics/api";
import { useTranslation } from "react-i18next";

const SearchSidebar = ({ updateFilters }) => {
  const { t } = useTranslation();
  const [showAllSubtopics, setShowAllSubtopics] = useState(false);
  const [showAllSubSubtopics, setShowAllSubSubtopics] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [selectedSubSubtopics, setSelectedSubSubtopics] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subSubtopics, setSubSubtopicsData] = useState({});

  // Fetch topics when the component mounts
  useEffect(() => {
    const getTopics = async () => {
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (error) {
        console.error("Error fetching topics", error);
      }
    };

    getTopics();
  }, []);

  // Fetch all subtopics and sub-subtopics at once
  useEffect(() => {
    const getAllSubtopicsAndSubSubtopics = async () => {
      try {
        const { subTopics, subSubtopics } =
          await fetchAllSubtopicsAndSubSubtopics();

        const subSubtopicsMap = {};

        // Set the sub-subtopics
        subSubtopics.forEach((subSubtopic) => {
          const key = `${subSubtopic._id}`;
          subSubtopicsMap[key] = subSubtopic;
        });

        setSubSubtopicsData(subSubtopicsMap);
      } catch (error) {
        console.error("Error fetching subtopics and sub-subtopics", error);
      }
    };

    getAllSubtopicsAndSubSubtopics();
  }, []);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleSubtopic = (subtopic) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((st) => st !== subtopic)
        : [...prev, subtopic]
    );
  };

  const toggleSubSubtopic = (subSubtopic) => {
    setSelectedSubSubtopics((prev) =>
      prev.includes(subSubtopic)
        ? prev.filter((sst) => sst !== subSubtopic)
        : [...prev, subSubtopic]
    );
  };

  const applyFilters = () => {
    updateFilters({
      topics: selectedTopics,
      subtopics: selectedSubtopics,
      subsubtopics: selectedSubSubtopics,
    });
  };

  return (
    <div className="p-3 bg-white border rounded-md shadow-md w-full md:w-72 h-full">
      <p className="text-sm font-bold text-headingColor mb-4">{t("Filter")}</p>

      {/* Topics Section */}
      <div className="mb-5 text-headingColor text-sm">
        <h3 className="text-sm font-bold mb-2"> {t("Topics")}</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic._id}
              className={`px-3 py-1 rounded-full ${
                selectedTopics.includes(topic._id)
                  ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                  : "border"
              }`}
              onClick={() => toggleTopic(topic._id)}
            >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* Subtopics Section */}
      <div className="mb-5 text-headingColor text-sm">
        <h3 className="text-sm font-bold mb-2"> {t("Subtopics")}</h3>
        <div
          className={`flex flex-wrap gap-2 ${
            !showAllSubtopics && "h-16 overflow-hidden"
          }`}
        >
          {topics.map(
            (topic) =>
              topic.subTopics &&
              topic.subTopics.length > 0 &&
              topic.subTopics.map((subtopic) => (
                <button
                  key={subtopic._id}
                  className={`px-3 py-1 rounded-full ${
                    selectedSubtopics.includes(subtopic._id)
                      ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                      : "border"
                  }`}
                  onClick={() => toggleSubtopic(subtopic._id)}
                >
                  {subtopic.title}
                </button>
              ))
          )}
        </div>
        <button
          onClick={() => setShowAllSubtopics(!showAllSubtopics)}
          className="text-btnColor mt-2"
        >
          {showAllSubtopics ? "Show Less" : "Show All"}
        </button>
      </div>

      {/* Sub-Subtopics Section */}
      <div className="mb-5 text-headingColor text-sm">
        <h3 className="text-sm font-bold mb-2"> {t("SubsubTopics")}</h3>
        <div
          className={`flex flex-wrap gap-2 ${
            !showAllSubSubtopics && "h-16 overflow-hidden"
          }`}
        >
          {Object.values(subSubtopics).map((subSubtopic) => (
            <button
              key={subSubtopic._id}
              className={`px-3 py-1 rounded-full ${
                selectedSubSubtopics.includes(subSubtopic._id)
                  ? "bg-gradient-to-t from-btnColorOne to-btnColor text-white"
                  : "border"
              }`}
              onClick={() => toggleSubSubtopic(subSubtopic._id)}
            >
              {subSubtopic.title}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAllSubSubtopics(!showAllSubSubtopics)}
          className="text-btnColor mt-2"
        >
          {showAllSubSubtopics ? "Show Less" : "Show All"}
        </button>
      </div>

      {/* Apply Button */}
      <button
        className="w-full bg-gradient-to-t from-btnColorOne to-btnColor text-white py-2 rounded-md"
        onClick={applyFilters}
      >
        {t("Apply")}
      </button>
    </div>
  );
};

export default SearchSidebar;
