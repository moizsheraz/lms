"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import {
  fetchTopics,
  fetchSubtopics,
  fetchSubSubtopics,
} from "@/app/utils/common/topics/api";
import { useTranslation } from "react-i18next";

const CourseDetail = ({ register, setValue, courseData }) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(null);
  const inputRef = useRef(null);

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [subSubtopics, setSubSubtopics] = useState([]);
  const [shortDescription, setShortDescription] = useState(
    courseData?.course?.description || ""
  );

  const [selectedTopic, setSelectedTopic] = useState(
    courseData?.course?.topic || ""
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState(
    courseData?.course?.subtopics?.[0] || ""
  );
  const [selectedSubSubtopic, setSelectedSubSubtopic] = useState(
    courseData?.course?.subsubtopics?.[0] || ""
  );

  useEffect(() => {
    // Populate initial course data and topics list
    if (courseData?.course) {
      const { course } = courseData;
      setValue("courseName", course.name);
      setValue("price", course.price);
      setValue("shortDescription", course.description);
      setValue("uploadImage", course.courseImage);

      const baseUrl = "https://justagame.tech/";
      const imagePath = course.courseImage.replace(/^public\//, "");
      setImgUrl(`${baseUrl}${imagePath}`);
      setSelectedTopic(course.topic || "");
      setSelectedSubtopic(course.subtopics?.[0] || "");
      setSelectedSubSubtopic(course.subsubtopics?.[0] || "");
    }

    // Fetch topics when the component mounts
    const loadTopics = async () => {
      try {
        const topicsData = await fetchTopics();
        setTopics(topicsData);
      } catch (error) {
        console.error("Failed to fetch topics", error);
      }
    };

    loadTopics();
  }, [courseData, setValue]);

  useEffect(() => {
    // Fetch subtopics whenever the selected topic changes
    const loadSubtopics = async () => {
      if (selectedTopic) {
        try {
          const subtopicsData = await fetchSubtopics(selectedTopic);
          setSubtopics(subtopicsData);
        } catch (error) {
          console.error("Failed to fetch subtopics", error);
        }
      } else {
        setSubtopics([]);
      }
      setSelectedSubtopic(""); // Reset subtopic selection
      setSelectedSubSubtopic(""); // Reset sub-subtopic selection
    };

    loadSubtopics();
  }, [selectedTopic]);

  useEffect(() => {
    // Fetch sub-subtopics whenever the selected subtopic changes
    const loadSubSubtopics = async () => {
      if (selectedTopic && selectedSubtopic) {
        try {
          const subSubtopicsData = await fetchSubSubtopics(
            selectedTopic,
            selectedSubtopic
          );
          setSubSubtopics(subSubtopicsData);
        } catch (error) {
          console.error("Failed to fetch sub-subtopics", error);
        }
      } else {
        setSubSubtopics([]);
      }
      setSelectedSubSubtopic(""); // Reset sub-subtopic selection
    };

    loadSubSubtopics();
  }, [selectedSubtopic, selectedTopic]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
        setValue("uploadImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => inputRef.current.click();
  const handleTopicChange = (e) => {
    const selectedTitle = e.target.value; // Get the selected title
    const selectedTopic = topics.find((topic) => topic.title === selectedTitle);

    if (selectedTopic) {
      setSelectedTopic(selectedTopic._id); // Store the ID for API call
    }
  };

  const handleSubtopicChange = (e) => {
    const selectedTitle = e.target.value; // Get the selected title
    const selectedSubtopic = subtopics.find(
      (subtopic) => subtopic.title === selectedTitle
    );

    if (selectedSubtopic) {
      setSelectedSubtopic(selectedSubtopic._id); // Store the ID for API call
    }
  };

  const handleSubSubtopicChange = (e) => {
    const selectedTitle = e.target.value; // Get the selected title
    const selectedSubSubtopic = subSubtopics.find(
      (subsubtopic) => subsubtopic.title === selectedTitle
    );

    if (selectedSubSubtopic) {
      setSelectedSubSubtopic(selectedSubSubtopic._id); // Store the ID for API call
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 400) {
      setShortDescription(value);
      setValue("shortDescription", value);
    }
  };

  return (
    <div>
      <label htmlFor="uploadImage">
        {t("teacherCreateCourseStep1.uploadTopicImage")}
      </label>
      <div
        className="relative w-full h-28 mt-1 mb-4 border rounded-md cursor-pointer"
        onClick={handleImageClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
         <div className="text-sm my-1 text-red-500">
            <span>{t("imageSize")}</span>
          </div>
        {!imgUrl ? (
          <>
            <FaCamera className="text-paraColor w-10 h-10 mx-auto mt-6" />
            <p className="text-paraColor text-xs my-1 text-center">
              {t("teacherCreateCourseStep1.tapToChooseImage")}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src={imgUrl}
              alt="Selected"
              className="w-16 h-16 object-cover"
            />
            <p className="text-xs mt-2 text-center text-paraColor">
              Image Selected
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 w-full">
        <div className="w-full">
          <label htmlFor="courseName">
            {t("teacherCreateCourseStep1.courseName")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>
          <input
            {...register("courseName")}
            defaultValue={courseData?.course?.name || ""}
            className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
            placeholder="Course Name"
            id="courseName"
          />
        </div>
        <div className="w-full">
          <label htmlFor="price">{t("teacherCreateCourseStep1.price")}</label>
          <span className="text-red-500 text-xs mx-1">*</span>
          <input
            {...register("price")}
            defaultValue={courseData?.course?.price || ""}
            className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
            placeholder="Price"
            type="text"
            id="price"
            onKeyPress={(e) => {
              if (!/^\d$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
      <div>
        <label htmlFor="shortDescription">
          {t("teacherCreateCourseStep1.shortDescription")}
        </label>
        <span className="text-red-500 text-xs mx-1">*</span>
        </div>
        <p className="text-headingColor text-sm">
          {shortDescription.length}/400
        </p>
        
      </div>
      <textarea
        value={shortDescription}
        onChange={handleDescriptionChange}
        rows={4}
        className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
        placeholder="Short Description"
        id="shortDescription"
      />

      {/* Topic Dropdown */}
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="w-full">
          <label htmlFor="selectTopic">
            {t("teacherCreateCourseStep1.selectTopic")}
          </label>
        <span className="text-red-500 text-xs mx-1">*</span>
          
          <select
            {...register("selectTopic")}
            value={
              topics.find((topic) => topic._id === selectedTopic)?.title || ""
            }
            onChange={handleTopicChange}
            className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
          >
            <option value="" disabled>
              {t("teacherCreateCourseStep1.selectTopic")}
            </option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic.title}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic Dropdown */}
        <div className="w-full">
          <label htmlFor="selectSubtopic">
            {t("teacherCreateCourseStep1.selectSubtopic")}
          </label>
        <span className="text-red-500 text-xs mx-1">*</span>

          <select
            {...register("selectSubtopic")}
            value={
              subtopics.find((subtopic) => subtopic._id === selectedSubtopic)
                ?.title || ""
            }
            onChange={handleSubtopicChange}
            className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
            disabled={!selectedTopic}
          >
            <option value="" disabled>
              {t("teacherCreateCourseStep1.selectSubtopic")}
            </option>
            {subtopics.map((subtopic) => (
              <option key={subtopic._id} value={subtopic.title}>
                {subtopic.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sub-Subtopic Dropdown */}
      <div className="w-full">
        <label htmlFor="selectSubSubtopic">
          {t("teacherCreateCourseStep1.selectSubSubtopic")}
        </label>
        <span className="text-red-500 text-xs mx-1">*</span>

        <select
          {...register("selectSubSubtopic")}
          value={
            subSubtopics.find(
              (subsubtopic) => subsubtopic._id === selectedSubSubtopic
            )?.title || ""
          }
          onChange={handleSubSubtopicChange}
          className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
          disabled={!selectedSubtopic}
        >
          <option value="" disabled>
            {t("teacherCreateCourseStep1.selectSubSubtopic")}
          </option>
          {subSubtopics.map((subsubtopic) => (
            <option key={subsubtopic._id} value={subsubtopic.title}>
              {subsubtopic.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseDetail;
