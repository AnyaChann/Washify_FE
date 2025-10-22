"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface OrderStatusChartProps {
  data: {
    status: string;
    count: number;
  }[];
  title?: string;
  isLoading?: boolean;
}

const statusColors: Record<string, string> = {
  PENDING: "#FFA500",
  CONFIRMED: "#3B82F6",
  PICKED_UP: "#8B5CF6",
  IN_PROGRESS: "#6366F1",
  READY: "#10B981",
  DELIVERING: "#06B6D4",
  COMPLETED: "#22C55E",
  CANCELLED: "#EF4444",
};

export function OrderStatusChart({ 
  data, 
  title = "Order Status Distribution",
  isLoading = false 
}: Readonly<OrderStatusChartProps>) {
  // Ensure data is an array
  const chartData = Array.isArray(data) ? data : [];
  
  const labels = chartData.map((item) => item.status);
  const series = chartData.map((item) => item.count);
  const colors = chartData.map((item) => statusColors[item.status] || "#6B7280");

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: colors,
    labels: labels,
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Orders",
              fontSize: "16px",
              fontWeight: "600",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0).toString();
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="mb-3">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
      </div>

      {isLoading ? (
        <div className="flex h-[350px] items-center justify-center">
          <div className="h-64 w-64 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      ) : (
        <div className="mb-2">
          <div id="orderStatusChart" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
}
