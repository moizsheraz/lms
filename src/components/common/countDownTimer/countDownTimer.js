"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegClock } from "react-icons/fa";

const CountdownTimer = ({ purchaseDate }) => {
  const { t } = useTranslation();

  const [timeLeft, setTimeLeft] = useState({
    months: 3,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // If purchaseDate is null, set it to Date.now()
    const dateOfPurchase = purchaseDate ? new Date(purchaseDate) : new Date();

    // Calculate the target date as 3 months from the purchaseDate
    const targetDate = new Date(dateOfPurchase);
    targetDate.setMonth(targetDate.getMonth() + 3);

    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference <= 0) {
        setTimeLeft({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const totalSeconds = Math.floor(timeDifference / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;
      const totalDays = Math.floor(totalHours / 24);
      const days = totalDays % 30;
      const months = Math.floor(totalDays / 30);

      setTimeLeft({ months, days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval); // Clean up on component unmount
  }, [purchaseDate]); // Dependency array ensures that useEffect reruns if purchaseDate changes

  return (
    <div className="w-full  bg-lightCard rounded-lg border flex lg:flex-row flex-col text-center lg:text-left items-center justify-between p-3">
      <div>
        <p className="text-headingColor text-sm">
          {" "}
          {t("studentCourseDetail.remainingTime")}
        </p>
        <p className="text-headingColor my-1">
          {timeLeft.months} {t("studentCourseDetail.months")}, {timeLeft.days}{" "}
          {t("studentCourseDetail.days")}
        </p>
        <p className="text-headingColor text-xs">
          {timeLeft.hours} {t("studentCourseDetail.hours")}, {timeLeft.minutes}{" "}
          {t("studentCourseDetail.minutes")}, {timeLeft.seconds}{" "}
          {t("studentCourseDetail.seconds")}
        </p>
      </div>
      <div className="lg:my-0 my-2 w-24 h-24 bg-slateColor rounded-full p-2 text-btnColor text-6xl flex items-center justify-center">
        <FaRegClock />
      </div>
    </div>
  );
};

export default CountdownTimer;
