"use client";

import { formatNumber } from "@/lib/format-number";
import { 
  ShoppingBagIcon, 
  BanknotesIcon, 
  ClockIcon, 
  TruckIcon 
} from "@heroicons/react/24/outline";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "purple";
  subtitle?: string;
  isLoading?: boolean;
}

const colorClasses = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  purple: "bg-purple-50 text-purple-600",
};

export function StatCard({ 
  title, 
  value, 
  icon, 
  color, 
  subtitle,
  isLoading = false 
}: StatCardProps) {
  return (
    <div className="rounded-lg border border-stroke bg-white px-6 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-black dark:text-white mb-2">
            {title}
          </h4>
          {isLoading ? (
            <div className="h-8 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          ) : (
            <div className="text-2xl font-bold text-black dark:text-white">
              {typeof value === 'number' ? formatNumber(value) : value}
            </div>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-bodydark">{subtitle}</p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface DashboardStatsProps {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  activeShipments: number;
  isLoading?: boolean;
}

export function DashboardStats({
  totalOrders,
  totalRevenue,
  pendingOrders,
  activeShipments,
  isLoading = false,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <StatCard
        title="Total Orders"
        value={totalOrders}
        icon={<ShoppingBagIcon className="h-6 w-6" />}
        color="blue"
        subtitle="All time orders"
        isLoading={isLoading}
      />
      
      <StatCard
        title="Total Revenue"
        value={`${formatNumber(totalRevenue)} ₫`}
        icon={<BanknotesIcon className="h-6 w-6" />}
        color="green"
        subtitle="All time revenue"
        isLoading={isLoading}
      />
      
      <StatCard
        title="Pending Orders"
        value={pendingOrders}
        icon={<ClockIcon className="h-6 w-6" />}
        color="yellow"
        subtitle="Need attention"
        isLoading={isLoading}
      />
      
      <StatCard
        title="Active Shipments"
        value={activeShipments}
        icon={<TruckIcon className="h-6 w-6" />}
        color="purple"
        subtitle="In delivery"
        isLoading={isLoading}
      />
    </div>
  );
}
