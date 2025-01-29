"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi"; // Tick icon
import { FiX } from "react-icons/fi"; // Cross icon
import { useTranslation } from "react-i18next";
import ZoomableImage from "@/components/common/ZoomableImage/ZoomableImage";

const QuestionsCard = ({
  question,
  options,
  correctIndex,
  hint,
  isCreate,
  selectedIndex,
  hintImage,
  questionImage,
}) => {
  const [showHintModal, setShowHintModal] = useState(false);
  const { t } = useTranslation();

  const toggleHintModal = () => {
    setShowHintModal(!showHintModal);
  };

  return (
    <div
      className={`w-full ${isCreate ? "lg:w-full h-[300px]" : "lg:w-[30%] h-[450px]"
        } bg-white p-4 border rounded-lg overflow-y-auto`}
    >
      {!isCreate && questionImage && questionImage.trim() !== "" && (
        <div className="flex items-center justify-center">
          <ZoomableImage
            src={`/${questionImage.replace(/^public[\\/]/, "").trim()}`}
            alt="Question Image"
            className="w-44 h-32"
          />
        </div>
      )}

      <div className="flex items-center justify-between my-3">
        <div className="w-[220px]">
          <p className="text-headingColor font-bold break-words">
            {question} 
          </p>
        </div>
        <div className="relative">
          <Image
            className="w-4 h-4 cursor-pointer"
            src="/images/png/bulb.png"
            height={1000}
            width={1000}
            onClick={toggleHintModal}
          />
        </div>
      </div>

      {/* Options List */}
      {options.map((option, idx) => (
        <div
          key={idx}
          className={`border p-3 rounded-md my-2 flex justify-between items-center 
            ${idx === correctIndex
              ? "border-green-500 text-green-500 bg-green-100"
              : idx === selectedIndex
                ? "border-red-500 bg-red-100"
                : "border-gray-300"
            }
          `}
        >
          <div className="w-[300px]">
            <p className="text-sm text-headingColor break-words">{option}</p>
          </div>
          {idx === correctIndex && (
            <FiCheck className="text-white bg-green-500 w-4 h-4 p-0.5 rounded-full text-lg" />
          )}
          {idx === selectedIndex && idx !== correctIndex && (
            <FiX className="text-white bg-red-500 w-4 h-4 p-0.5 rounded-full text-lg" />
          )}
        </div>
      ))}

      {/* Hint Modal */}
      {showHintModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center">
            {hintImage && hintImage.trim() !== "" && (
              <div className="flex items-center justify-center">
                <ZoomableImage
                  src={`/${hintImage.replace(/^public[\\/]/, "").trim()}`}
                  alt="Hint Image"
                  className="w-44 h-32 mt-4"
                />
              </div>
            )}
            <h2 className="text-xl font-bold mb-4">{t("hint")}</h2>
            <p className="text-gray-700 mb-6">{hint}</p>
            <button
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded"
              onClick={toggleHintModal}
            >
              {t("closeBtn")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionsCard;
