"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";

const UploadMaterial = ({ register, courseData }) => {
  const { t } = useTranslation();
  // State for theoretical links
  const [links, setLinks] = useState(
    (courseData?.course?.theoreticalMaterial || "").split(",").filter(Boolean)
  );
  const [inputValue, setInputValue] = useState(links.join(", "));

  // State for auxiliary links
  const [auxiliaryLinks, setAuxiliaryLinks] = useState(
    (courseData?.course?.auxiliaryMaterial || "").split(",").filter(Boolean)
  );
  const [auxiliaryInputValue, setAuxiliaryInputValue] = useState(
    auxiliaryLinks.join(", ")
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.endsWith(",")) {
      const newLinks = value
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link);

      setLinks(newLinks);
      setInputValue(newLinks.join(", ") + ", ");
    }
  };

  const handleAuxiliaryInputChange = (e) => {
    const value = e.target.value;
    setAuxiliaryInputValue(value);

    if (value.endsWith(",")) {
      const newAuxiliaryLinks = value
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link);

      setAuxiliaryLinks(newAuxiliaryLinks);
      setAuxiliaryInputValue(newAuxiliaryLinks.join(", ") + ", ");
    }
  };

  // Handle the splitting of 'name|link' format
  const handleLinkInputChange = (e, setLinkState, setInputState) => {
    const value = e.target.value;
    setInputState(value);

    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    // Process 'name|link' format
    const newLinks = items.map((item) => {
      const [name, link] = item.split("|").map((part) => part.trim());
      return { name, link };
    });

    setLinkState(newLinks);
  };

  const handleDeleteLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleDeleteAuxiliaryLink = (index) => {
    const updatedAuxiliaryLinks = auxiliaryLinks.filter((_, i) => i !== index);
    setAuxiliaryLinks(updatedAuxiliaryLinks);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center">
          <label
            htmlFor="theoreticalMaterialLink"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.theoreticalMaterialLink")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>
        </div>
        <input
          type="text"
          {...register("theoreticalMaterialLink")}
          value={inputValue}
          onChange={(e) => handleLinkInputChange(e, setLinks, setInputValue)}
          className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={t(
            "teacherCreateCourseStep2.theoreticalMaterialLinkDescription"
          )}
          id="theoreticalMaterialLink"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t("teacherCreateCourseStep2.theoreticalMaterialLinkHint")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full shadow-sm hover:bg-blue-200 transition-all"
            >
              <span className="text-sm">
                {link.name}: {link.link}
              </span>
              {/* <AiOutlineClose
                onClick={() => handleDeleteLink(index)}
                className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
              /> */}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 my-4">
        <div className="flex items-center">
          <label
            htmlFor="auxiliaryMaterialLink"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.auxiliaryMaterialLink")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>
        </div>
        <input
          type="text"
          {...register("auxiliaryMaterialLink")}
          value={auxiliaryInputValue}
          onChange={(e) =>
            handleLinkInputChange(e, setAuxiliaryLinks, setAuxiliaryInputValue)
          }
          className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder={t(
            "teacherCreateCourseStep2.auxiliaryMaterialLinkDescription"
          )}
          id="auxiliaryMaterialLink"
        />
        <p className="text-xs text-gray-500 mt-1">
          {t("teacherCreateCourseStep2.auxiliaryMaterialLinkHint")}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {auxiliaryLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full shadow-sm hover:bg-green-200 transition-all"
            >
              <span className="text-sm">
                {link.name}: {link.link}
              </span>
              <AiOutlineClose
                onClick={() => handleDeleteAuxiliaryLink(index)}
                className="cursor-pointer text-green-500 hover:text-green-700 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UploadMaterial;
