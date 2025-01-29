"use client";
import React, { useState, useEffect } from "react";
import { FaLock, FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { checkLikeStatus, likeSummary } from "@/app/utils/student/summary/api";
import { useTranslation } from "react-i18next";

const SummariesCard = ({
  title,
  isPurchased,
  isSelected,
  summaryId,
  isStudent,
}) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [hasLiked, setHasLiked] = useState(false); // To track like status

  useEffect(() => {
    // Check if the user has liked this summary when the component is mounted
    const fetchLikeStatus = async () => {
      try {
        const response = await checkLikeStatus(summaryId);
        setHasLiked(response.hasLiked);
      } catch (error) {
        console.error("Failed to check like status:", error);
      }
    };

    if (isPurchased) {
      fetchLikeStatus(); // Only fetch like status if the summary is purchased
    }
  }, [summaryId, isPurchased]); // Re-run when summaryId or isPurchased changes

  // Handle like or unlike action
  const handleLike = async () => {
    try {
      const response = await likeSummary(summaryId);
      setHasLiked(response.message === "Summary liked"); // Update like status based on response
    } catch (error) {
      console.error("Error liking/unliking summary:", error);
    }
  };

  return (
    <>
      <div
        className="relative cursor-pointer w-full p-2 sm:p-3 border rounded-md my-2 flex items-center justify-between text-xs sm:text-sm font-bold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Change text color based on selection */}
        <p className={`${isSelected ? "text-btnColor" : "text-headingColor"}`}>
          {title}
        </p>

        {/* Conditional thumb icon */}
        {isPurchased && isStudent ? (
          hasLiked ? (
            <div>
              <FaThumbsUp
                className={`${
                  isSelected ? "text-btnColor" : "text-headingColor"
                }`}
                onClick={handleLike} // Toggle like/unlike when clicked
              />
            </div>
          ) : (
            <FaRegThumbsUp
              className={`${
                isSelected ? "text-btnColor" : "text-headingColor"
              }`}
              onClick={handleLike} // Toggle like/unlike when clicked
            />
          )
        ) : (
          <FaLock className="text-black" />
        )}

        {/* Tooltip when not purchased */}
        {!isPurchased && isHovered && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-50px] bg-lightCard text-headingColor border border-gray-300 rounded-md shadow-lg p-2 text-xs text-center">
            <p>You need to purchase this course to access the content.</p>
          </div>
        )}
      </div>
      {isPurchased && isStudent && (
        <div className="block w-full">
          <p className="block my-2 text-sky-400 text-sm">{t("summaryTxt")} </p>
        </div>
      )}
    </>
  );
};

export default SummariesCard;
