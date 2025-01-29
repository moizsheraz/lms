"use client";

import React from 'react';
import { useTranslation } from "react-i18next";

const CircularScoreBar = ({ score, maxScore }) => {
    const { t } = useTranslation();
    const radius = 60; // Increased circle radius
    const stroke = 8;   // Stroke width for the circle
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI; // Circumference for the circle
    const progress = (score / maxScore) * 100; // Calculate progress
    const strokeDashoffset = circumference - (progress / 100) * circumference; // Offset for progress

    return (
        <div className="relative flex items-center justify-center bg-white h-32 w-32 rounded-full">
            {/* SVG for the circular progress */}
            <svg
                height={radius * 2}
                width={radius * 2}
                className="absolute"
            >

                {/* Blue Progress Circle */}
                <circle
                    stroke="#01C2ED" // Blue progress stroke
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round" // Rounded stroke ends
                    className="transition-all duration-500 ease-out"
                />
            </svg>

            {/* Centered text for the score */}
            <div className="absolute text-center">
                <span className="text-4xl font-bold text-btnColor">{score}</span> 
                <span className="text-sm font-bold text-paraColor">/ {maxScore}</span> <br/>
                <span className="text-md text-paraColor">{t("scoreTxt")}</span>
            </div>
        </div>
    );
};

export default CircularScoreBar;
