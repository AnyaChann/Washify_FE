"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "./_components/dashboard-stats";
import { OrderStatusChart } from "@/components/Charts/order-status";
import { dashboardService } from "@/services/dashboard.service";
import type { OrderStatistics, RevenueStatistics, ShipmentStatistics } from "@/types/api.types";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [orderStats, setOrderStats] = useState<OrderStatistics | null>(null);
  const [revenueStats, setRevenueStats] = useState<RevenueStatistics | null>(null);
  const [shipmentStats, setShipmentStats] = useState<ShipmentStatistics | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await dashboardService.getDashboardData();
      
      setOrderStats(data.orders);
      setRevenueStats(data.revenue);
      setShipmentStats(data.shipments);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for order status distribution
  const orderStatusData = [
    { status: "PENDING", count: orderStats?.pendingOrders || 0 },
    { status: "COMPLETED", count: orderStats?.completedOrders || 0 },
    { status: "CANCELLED", count: orderStats?.cancelledOrders || 0 },
  ];

  return (
    <>
      <DashboardStats
        totalOrders={orderStats?.totalOrders || 0}
        totalRevenue={orderStats?.totalRevenue || 0}
        pendingOrders={orderStats?.pendingOrders || 0}
        activeShipments={(shipmentStats?.pendingPickups || 0) + (shipmentStats?.pendingDeliveries || 0)}
        isLoading={isLoading}
      />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-6">
          <OrderStatusChart
            data={orderStatusData}
            isLoading={isLoading}
          />
        </div>

        {/* Revenue Summary Card */}
        <div className="col-span-12 xl:col-span-6">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Revenue Summary
            </h4>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                  <span className="text-sm font-medium">Tổng trị giá các order</span>
                  <span className="text-lg font-bold text-meta-3">
                    {(revenueStats?.totalRevenue || 0).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                
                <div className="flex items-center justify-between border-b border-stroke pb-3 dark:border-strokedark">
                  <span className="text-sm font-medium">Order đã confirm</span>
                  <span className="text-lg font-bold">
                    {revenueStats?.orderCount || 0}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Trung bình giá các order</span>
                  <span className="text-lg font-bold text-meta-5">
                    {(revenueStats?.averageOrderValue || 0).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
                
                {revenueStats && (
                  <div className="mt-4 rounded bg-gray-50 p-3 dark:bg-meta-4">
                    <p className="text-xs text-bodydark">
                      Period: {new Date(revenueStats.startDate).toLocaleDateString('vi-VN')} - {new Date(revenueStats.endDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
