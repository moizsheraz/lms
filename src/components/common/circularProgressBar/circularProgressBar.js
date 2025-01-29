import React from "react";

const CircularProgressBar = ({
  totalQuestions,
  progress,
  score,
  isPurchased,
  isGrade,
  isTime,
  isAnswered,
  isSummary,
}) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = isSummary
    ? 0
    : circumference - (progress / 100) * circumference;

  const strokeWidthGrayColor = 2;
  const strokeWidth = isPurchased ? 6 : 2;

  // Round the score to the nearest integer
  const roundedScore = Math.round(score);

  return (
    <div className={`relative ${isPurchased ? "w-28 h-28" : "w-20 h-20"} `}>
      <svg className="rotate-[-90deg] w-full h-full" viewBox="0 0 40 40">
        {/* Background Circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          className="stroke-current text-slateColor"
          strokeWidth={strokeWidthGrayColor}
          strokeDasharray={circumference}
        />
        {/* Progress Circle */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          className="stroke-current text-blue-600"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {/* Display Progress Text */}
      {isAnswered ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-md font-bold text-blue-600">
            {roundedScore}
          </span>
        </div>
      ) : isGrade ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-md font-bold text-blue-600">
            {roundedScore} %
          </span>
        </div>
      ) : isTime ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-md font-bold text-blue-600">
            {(roundedScore / 60).toFixed(2)} min
          </span>
        </div>
      ) : isSummary ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-md font-bold text-blue-600">
            {progress}/{score}
          </span>
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-md font-bold text-blue-600">
            {roundedScore}%
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
