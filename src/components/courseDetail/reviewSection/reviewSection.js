import React, { useRef } from "react";
import ReviewCard from "../reviewCard/reviewCard";

const ReviewSection = ({ showMore, courseData }) => {
  const reviewsContainerRef = useRef(null);

  // Helper function to render ReviewCard with null-safe properties
  const renderReviewCard = (review) => {
    console.log("Review Data:", review);
    const student = review.student || {}; // Handle null student
    console.log("Student Data:", student);

    return (
      <ReviewCard
        key={review._id}
        img={student.profileImage || ""}
        description={review.reviewText || ""}
        name={`${student.firstName || "Anonymous"} ${
          student.lastName || ""
        }`.trim()}
        date={
          review.reviewDate
            ? new Date(review.reviewDate).toLocaleDateString()
            : "Unknown Date"
        }
        rating={review.rating || 0}
      />
    );
  };

  return (
    <>
      {/* Reviews for larger screens */}
      <div className="hidden md:block">
        {courseData?.reviews?.length > 0 &&
          courseData.reviews
            .slice(0, 2)
            .map((review) => renderReviewCard(review))}

        <div
          ref={reviewsContainerRef}
          style={{
            maxHeight: showMore
              ? `${reviewsContainerRef.current.scrollHeight}px`
              : "0",
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}
        >
          {courseData?.reviews?.length > 2 &&
            courseData.reviews
              .slice(2)
              .map((review) => renderReviewCard(review))}
        </div>
      </div>

      {/* Reviews for small screens */}
      <div className="p-2 block md:hidden">
        <div
          className="flex gap-4 overflow-x-auto lg:overflow-x-hidden lg:grid lg:grid-cols-3 xl:grid-cols-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {courseData?.reviews?.length > 0 ? (
            courseData.reviews.map((review) => (
              <div
                className="min-w-[70%] sm:min-w-[45%] md:min-w-[30%] lg:w-auto"
                key={review._id}
              >
                {renderReviewCard(review)}
              </div>
            ))
          ) : (
            <p>No Reviews found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
