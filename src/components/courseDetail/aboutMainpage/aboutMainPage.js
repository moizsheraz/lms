import React, { useState } from "react";
import ReviewSection from "../reviewSection/reviewSection";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AboutMainPage = ({ courseData }) => {
  const { t } = useTranslation();

  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const toggleReviews = () => {
    setShowMoreReviews((prev) => !prev);
  };

  // Calculate the average rating if there are reviews
  const totalRatings = courseData.reviews.length > 0
    ? courseData.reviews.reduce((sum, review) => sum + review.rating, 0)
    : 0;
  const averageRating = courseData.reviews.length > 0
    ? totalRatings / courseData.reviews.length
    : 0;

  // Determine the number of filled, half, and empty stars
  const filledStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-headingColor text-lg font-bold mt-2">
            {t("adminCourseDetail.reviewsAboutCourse")}
          </p>
          {/* Keep the "More" button in its own position */}
          {!showMoreReviews && courseData.reviews.length > 0 && (
            <p
              onClick={toggleReviews}
              className="hidden md:block text-sm text-paraColor cursor-pointer"
            >
              {t("adminCourseDetail.more")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 mb-1">
          <div className="text-orange-400 flex items-center">
            {/* Render filled stars */}
            {[...Array(filledStars)].map((_, index) => (
              <FaStar key={`filled-${index}`} />
            ))}
            {/* Render half star if needed */}
            {hasHalfStar && <FaStarHalfAlt />}
            {/* Render empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
              <FaRegStar key={`empty-${index}`} />
            ))}
          </div>
          <p className="text-headingColor">{averageRating.toFixed(1)}</p>
        </div>
        <p className="text-paraColor text-xs">
          {courseData.reviews.length} reviews
        </p>

        {/* Conditional rendering for reviews */}
        {courseData.reviews.length === 0 ? (
          <p className="text-paraColor text-xs">No reviews found yet.</p>
        ) : (
          <ReviewSection showMore={showMoreReviews} courseData={courseData} />
        )}

        {/* Show "Show Less" button only when reviews are expanded */}
        {showMoreReviews && (
          <p
            onClick={toggleReviews}
            className="hidden md:block text-sm text-end mb-3 text-paraColor cursor-pointer mt-2"
          >
            Show Less
          </p>
        )}
      </div>
    </div>
  );
};

export default AboutMainPage;
