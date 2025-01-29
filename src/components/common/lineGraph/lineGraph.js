"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AiOutlineLineChart } from "react-icons/ai";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineGraph = ({ earningsData,t }) => {
  // Calculate total earnings
  const totalEarnings = earningsData.reduce(
    (sum, item) => sum + item.totalEarnings,
    0
  );
  const formattedTotalEarnings = `₪${(totalEarnings / 1000).toFixed(1)}k`; // Format as ###.##k

  const [options, setOptions] = useState({
    chart: { type: "area", height: "100%", zoom: { enabled: false } },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: ["#01C2ED"] },
    xaxis: {
      type: "datetime",
      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      min: 0,
      max: 150,
      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    legend: { show: false },
    fill: { type: "solid", colors: ["#01C2ED"], opacity: 0.1 },
    markers: { size: 0 },
    grid: { show: false },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const formattedData = earningsData.map((item) => ({
      x: new Date(2024, item.month - 1),
      y: item.totalEarnings,
    }));

    setSeries([
      {
        name: "Earnings",
        data: formattedData,
      },
    ]);
  }, [earningsData]);

  return (
    <div className="w-full h-full p-2">
      <div className="flex items-center mb-4">
        <AiOutlineLineChart className="text-xl mr-2" />
        <h2 className="text-sm text-headingColor">{t("adminDashboard.overAllEarning")}</h2>
      </div>
      <h3 className="text-headingColor text-lg font-bold">
        {formattedTotalEarnings}
      </h3>
      <ApexCharts options={options} series={series} type="area" height="75%" />
    </div>
  );
};

export default LineGraph;
