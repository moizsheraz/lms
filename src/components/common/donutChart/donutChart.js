"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const DonutChart = ({ averageRating, ratingCounts }) => {
  const [options, setOptions] = useState(null);
  const ratingValues = Object.values(ratingCounts);
  const { t } = useTranslation();

  useEffect(() => {
    const chartOptions = {
      chart: {
        width: 250,
        type: "donut",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: `${averageRating} Average`, // Display average rating
                fontSize: "14px",
                color: "#333",
              },
            },
          },
        },
      },
      labels: ["1 star", "2 stars", "3 stars", "4 stars", "5 stars"],
      colors: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#bae6fd", "#e0f2fe"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
    setOptions(chartOptions);
  }, [averageRating]);

  const progressColors = [
    "bg-sky-500",
    "bg-sky-400",
    "bg-sky-300",
    "bg-sky-200",
    "bg-sky-100",
  ];

  return (
    <div className="flex flex-col items-center w-full h-full lg:h-[250px]">
      <div className="w-full p-4 border rounded-md lg:h-[250px] bg-white">
        <p className="text-headingColor font-bold text-xl mb-4">
          {t("averageRatings")}
        </p>
        <div className="lg:flex block justify-between items-center">
          <div className="lg:w-[25%] w-full flex items-center justify-center">
            {options && (
              <ApexCharts
                options={options}
                series={ratingValues}
                type="donut"
                width="100%"
              />
            )}
          </div>

          <div className="lg:w-[75%] w-full">
            {ratingValues.map((value, index) => (
              <div key={index} className="flex items-center mb-2">
                <span className="w-8 text-left">{index + 1}</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                  <div
                    className={`${progressColors[index]} h-2 rounded-full`}
                    style={{
                      width: `${(value / Math.max(...ratingValues)) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="w-10 text-right">({value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
