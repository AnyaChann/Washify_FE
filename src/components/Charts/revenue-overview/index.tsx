"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { formatCurrency } from "@/lib/format-number";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface RevenueChartProps {
  data: {
    period: string;
    revenue: number;
    orderCount: number;
  }[];
  title?: string;
  isLoading?: boolean;
}

export function RevenueChart({ 
  data, 
  title = "Revenue Overview",
  isLoading = false 
}: Readonly<RevenueChartProps>) {
  // Ensure data is an array
  const chartData = Array.isArray(data) ? data : [];
  
  const categories = chartData.map((item) => item.period);
  const revenues = chartData.map((item) => item.revenue);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#3C50E0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return formatCurrency(value);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value, { dataPointIndex }) {
          const orders = chartData[dataPointIndex]?.orderCount || 0;
          return `${formatCurrency(value)} (${orders} orders)`;
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [
    {
      name: "Revenue",
      data: revenues,
    },
  ];

  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[350px] animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      ) : (
        <div id="revenueChart" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      )}
    </div>
  );
}
