import Image from "next/image";
import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ZoomableImage from "@/components/common/ZoomableImage/ZoomableImage";

const SolveQuestionsCard = ({
  question,
  options,
  correctIndex,
  hint,
  selectedOption,
  onSelectOption,
  hintImage,
  questionImage,
}) => {
  const [isHintVisible, setIsHintVisible] = useState(false); // State to control modal visibility
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation

  const toggleHintModal = () => {
    setIsHintVisible(!isHintVisible);
  };

  const toggleAnimation = () => {
    setIsAnimating((prev) => !prev);
  };

  const { t } = useTranslation();

  return (
    <div className="w-full lg:w-[30%]">
      <style jsx>{`
        @keyframes borderAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-border {
          background: linear-gradient(270deg, #f43f5e, #16a34a, #3730a3);
          background-size: 400% 400%;
          animation: borderAnimation 6s ease infinite;
          border: 3px solid transparent;
          border-radius: 12px;
          padding: 2px; /* For border thickness */
        }
        .inner-content {
          background-color: white; /* Background for inner content */
          border-radius: 12px;
          overflow: hidden;
          height: 100%;
        }
      `}</style>
      <div className=" h-[450px] overflow-y-auto">
        <div
          className={`w-full transition-all duration-300 ${isAnimating ? "animate-border" : ""
            }`}
        >
          <div className="inner-content p-4">
            <div className="flex items-center justify-center">
              {questionImage && questionImage.trim() !== "" && (
                <ZoomableImage
                  src={`/${questionImage.replace(/^public[\\/]/, "").trim()}`}
                  alt="Question Image"
                  className="w-44 h-32"
                />
              )}
            </div>
            <div className="flex items-center justify-between my-3">
              <div className="w-[220px]">
                <p className="text-headingColor font-bold break-words">
                  {question} 
                </p>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAnimation}
                    className="text-xs border border-btnColor text-btnColor px-2 py-1 rounded-md"
                  >
                    {isAnimating ? t("btnTwo") : t("btnOne")}
                  </button>
                  <Image
                    className="w-4 h-4 cursor-pointer"
                    src="/images/png/bulb.png"
                    height={1000}
                    width={1000}
                    onClick={toggleHintModal} // Toggle modal on click
                  />
                </div>
              </div>
            </div>

            {/* Options List */}
            {options.map((option, idx) => (
              <div
                key={idx}
                onClick={() => onSelectOption(idx)}
                className={`border p-3 rounded-md my-2 flex justify-between items-center cursor-pointer
              ${idx === selectedOption
                    ? idx === correctIndex
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-gray-300"
                  }
            `}
              >
                <div className="w-[300px]">
                  <p className="text-sm text-headingColor break-words">{option} </p>
                </div>
                {selectedOption === idx &&
                  (idx === correctIndex ? (
                    <FiCheck className="text-white bg-green-500 w-4 h-4 p-0.5 rounded-full text-lg" />
                  ) : (
                    <FiX className="text-white bg-red-500 w-4 h-4 p-0.5 rounded-full text-lg" />
                  ))}
              </div>
            ))}

            {selectedOption !== null && (
              <p
                className={`mt-4 ${selectedOption === correctIndex
                    ? "text-green-500"
                    : "text-red-500"
                  }`}
              >
                {selectedOption === correctIndex
                  ? "Correct Answer!"
                  : "Incorrect Answer!"}
              </p>
            )}

            {/* Hint Modal */}
            {isHintVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-xl p-6 w-80 text-center">
                  <div className="flex items-center justify-center">
                    {hintImage && hintImage.trim() !== "" && (
                      <ZoomableImage
                        src={`/${hintImage.replace(/^public[\\/]/, "").trim()}`}
                        alt="Hint Image"
                        className="w-44 h-32 mt-4"
                      />
                    )}
                  </div>
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
        </div>
      </div>
    </div>
  );
};

export default SolveQuestionsCard;
