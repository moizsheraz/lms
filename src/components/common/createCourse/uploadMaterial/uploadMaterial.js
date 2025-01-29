"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";

const UploadMaterial = () => {
  const { t } = useTranslation();

  // State for theoretical links (name|link format)
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  // State for auxiliary links (name|link format)
  const [auxiliaryLinks, setAuxiliaryLinks] = useState([]);
  const [auxiliaryName, setAuxiliaryName] = useState("");
  const [auxiliaryLink, setAuxiliaryLink] = useState("");

  const handleAddLink = () => {
    if (name && link) {
      setLinks([...links, { name, link }]);
      setName("");  // Clear the name input
      setLink("");  // Clear the link input
    }
  };

  const handleAddAuxiliaryLink = () => {
    if (auxiliaryName && auxiliaryLink) {
      setAuxiliaryLinks([...auxiliaryLinks, { name: auxiliaryName, link: auxiliaryLink }]);
      setAuxiliaryName("");  // Clear the auxiliary name input
      setAuxiliaryLink("");  // Clear the auxiliary link input
    }
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
            htmlFor="theoreticalMaterialLinkName"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.theoreticalMaterialLink")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>
        </div>
        {/* Name Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t("teacherCreateCourseStep2.name")}
          />
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t("teacherCreateCourseStep2.link")}
          />
        </div>
        <button
          onClick={handleAddLink}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {t("teacherCreateCourseStep2.add")}
        </button>

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
              <AiOutlineClose
                onClick={() => handleDeleteLink(index)}
                className="cursor-pointer text-blue-500 hover:text-blue-700 transition"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 my-4">
        <div className="flex items-center">
          <label
            htmlFor="auxiliaryMaterialLinkName"
            className="block text-gray-700 font-semibold"
          >
            {t("teacherCreateCourseStep2.auxiliaryMaterialLink")}
          </label>
          <span className="text-red-500 text-xs mx-1">*</span>
        </div>
        {/* Auxiliary Name and Link Inputs */}
        <div className="flex gap-2">
          <input
            type="text"
            value={auxiliaryName}
            onChange={(e) => setAuxiliaryName(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t("teacherCreateCourseStep2.name")}
          />
          <input
            type="text"
            value={auxiliaryLink}
            onChange={(e) => setAuxiliaryLink(e.target.value)}
            className="outline-none w-full border rounded-md p-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder={t("teacherCreateCourseStep2.link")}
          />
        </div>
        <button
          onClick={handleAddAuxiliaryLink}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          {t("teacherCreateCourseStep2.add")}
        </button>

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
