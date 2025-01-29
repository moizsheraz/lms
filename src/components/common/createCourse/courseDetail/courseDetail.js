"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { createCourse, updateCourse } from "@/app/utils/teacher/courses/api";
import {
  fetchSubSubtopics,
  fetchSubtopics,
  fetchTopics,
} from "@/app/utils/common/topics/api";
import { useRouter } from "next/navigation";

const CourseDetail = ({ isAdmin, isEdit, courseData }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [imgUrl, setImgUrl] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [auxiliaryName, setAuxiliaryName] = useState("");
  const [auxiliaryLink, setAuxiliaryLink] = useState("");
  const [links, setLinks] = useState(courseData?.theoreticalMaterial || []);
  const [auxiliaryLinks, setAuxiliaryLinks] = useState(
    courseData?.auxiliaryMaterial || []
  );
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [subSubtopics, setSubSubtopics] = useState([]);
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState(courseData?.topic || "");
  const [selectedSubtopic, setSelectedSubtopic] = useState(
    courseData?.subtopics?.[0] || ""
  );
  const [selectedSubSubtopic, setSelectedSubSubtopic] = useState(
    courseData?.subsubtopics?.[0] || ""
  );

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
        setValue("courseImage", reader.result); // Set courseImage in form
      };
      reader.readAsDataURL(file);
    }
  };

  // Add link (theoretical or auxiliary)
  const handleAddLink = (type, name, link) => {
    if (name && link) {
      const newLink = { name, link };
      if (type === "theoretical") {
        setLinks((prevLinks) => [...prevLinks, newLink]); // Add to theoretical links
      } else if (type === "auxiliary") {
        setAuxiliaryLinks((prevLinks) => [...prevLinks, newLink]); // Add to auxiliary links
      }
    } else {
      alert("Please provide both name and link.");
    }
  };

  // Add theoretical material link
  const handleAddTheoreticalLink = () => {
    handleAddLink("theoretical", name, link);
    setName(""); // Clear the input fields
    setLink("");
  };

  // Add auxiliary material link
  const handleAddAuxiliaryLink = () => {
    handleAddLink("auxiliary", auxiliaryName, auxiliaryLink);
    setAuxiliaryName(""); // Clear the input fields
    setAuxiliaryLink("");
  };

  // Delete link from the list
  const handleDeleteLink = (type, index) => {
    if (type === "theoretical") {
      setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    } else if (type === "auxiliary") {
      setAuxiliaryLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    }
  };

  // Submit form data
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = {
      ...data,
      theoreticalMaterial: links,
      auxiliaryMaterial: auxiliaryLinks,
    };

    try {
      let response;

      // Check if we are editing an existing course
      if (isEdit) {
        response = await updateCourse(courseData._id, formData); // Update the course
      } else {
        response = await createCourse(formData); // Create a new course
      }

      // Handle success
      console.log("API Response:", response);
      setLoading(false);
      alert(
        isEdit
          ? "Course updated successfully!"
          : "Course submitted successfully!"
      );

      if (isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/teacher/dashboard");
      }
    } catch (error) {
      setLoading(false);
      // Handle errors
      console.error("Error submitting course:", error);
      alert("Failed to submit the course. Please try again.");
    }
  };

  // for topics and subtopics and sub sub topics
  useEffect(() => {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Course Image */}
      <div>
        <label>{t("teacherCreateCourseStep1.uploadTopicImage")}</label>
        <div
          className="relative w-full h-28 mt-1 mb-4 border rounded-md cursor-pointer"
          onClick={() => document.getElementById("uploadImageInput").click()}
        >
          <input
            id="uploadImageInput"
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
              <FaCamera className="text-gray-500 w-10 h-10 mx-auto mt-6" />
              <p className="text-gray-500 text-xs text-center">
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
              <p className="text-xs mt-2 text-gray-500">Image Selected</p>
            </div>
          )}
        </div>
        {errors.courseImage && (
          <p className="text-red-500 text-xs">{errors.courseImage.message}</p>
        )}
      </div>

      {/* Course Name */}
      <div>
        <label>
          {t("teacherCreateCourseStep1.courseName")}
          <span className="text-red-500">*</span>
        </label>
        <input
          defaultValue={courseData?.name || ""}
          {...register("name", { required: "Course name is required" })}
          className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
          placeholder={t("teacherCreateCourseStep1.courseName")}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label>
          {t("teacherCreateCourseStep1.price")}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          defaultValue={courseData?.price || ""}
          {...register("price", {
            required: "Price is required",
            pattern: { value: /^[0-9]+$/, message: "Price must be a number" },
            validate: (value) => {
              if (!isAdmin && (value < 50 || value > 200)) {
                return t("teacherCreateCourseStep2.message");
              }
              return true;
            },
          })}
          className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
          placeholder={t("teacherCreateCourseStep1.price")}
        />
        {errors.price && (
          <p className="text-red-500 text-xs">{errors.price.message}</p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label>
          {t("teacherCreateCourseStep1.shortDescription")}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          defaultValue={courseData?.description || ""}
          rows={4}
          {...register("description", {
            required: "Description is required",
            maxLength: {
              value: 400,
              message: "Maximum 400 characters allowed",
            },
          })}
          className="outline-none w-full border rounded-md p-3 mt-1 mb-4"
          placeholder={t("teacherCreateCourseStep1.shortDescription")}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
      </div>

      {/* Topic Dropdown */}
      <div className="flex items-center justify-between gap-4 w-full">
        <div className="w-full">
          <label htmlFor="selectTopic">
            {t("teacherCreateCourseStep1.selectTopic")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>

          <select
            {...register("topic")}
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
            {...register("subtopics")}
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
          {...register("subsubtopics")}
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

      {/* Theoretical Material Links */}
      <div className="space-y-4">
        <div className="flex items-center">
          <label
            htmlFor="theoreticalMaterialLinkName"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.theoreticalMaterialLink")}
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm"
            placeholder={t("teacherCreateCourseStep2.name")}
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm"
            placeholder={t("teacherCreateCourseStep2.link")}
          />
        </div>
        <button
          type="button"
          onClick={handleAddTheoreticalLink}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {t("teacherCreateCourseStep2.add")}
        </button>
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="mt-3 flex flex-wrap gap-2">
            {links.map((material, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full shadow-sm hover:bg-blue-200 transition-all"
              >
                <span className="text-sm">
                  {material.name}: {material.link}
                </span>
                <AiOutlineClose
                  onClick={() => handleDeleteLink("theoretical", index)}
                  className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auxiliary Material Links */}
      <div className="space-y-4 my-4">
        <div className="flex items-center">
          <label
            htmlFor="auxiliaryMaterialLinkName"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.auxiliaryMaterialLink")}
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={auxiliaryName}
            onChange={(e) => setAuxiliaryName(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm"
            placeholder={t("teacherCreateCourseStep2.name")}
          />
          <input
            type="text"
            value={auxiliaryLink}
            onChange={(e) => setAuxiliaryLink(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm"
            placeholder={t("teacherCreateCourseStep2.link")}
          />
        </div>
        <button
          type="button"
          onClick={handleAddAuxiliaryLink}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          {t("teacherCreateCourseStep2.add")}
        </button>
        <div className="mt-3 flex flex-wrap gap-2">
          <div className="mt-3 flex flex-wrap gap-2">
            {auxiliaryLinks.map((material, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm hover:bg-green-200 transition-all"
              >
                <span className="text-sm">
                  {material.name}: {material.link}
                </span>
                <AiOutlineClose
                  onClick={() => handleDeleteLink("auxiliary", index)}
                  className="cursor-pointer text-green-500 hover:text-green-700 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`px-4 py-2 rounded ${
          loading
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        disabled={loading}
      >
        {loading
          ? t("addCategory.loading")
          : t("teacherCreateCourseStep2.submit")}
      </button>
    </form>
  );
};

export default CourseDetail;
