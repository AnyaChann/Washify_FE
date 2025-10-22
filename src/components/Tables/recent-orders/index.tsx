"use client";

import { Order, OrderStatus } from "@/types/api.types";
import { formatCurrency } from "@/lib/format-number";
import { 
  EyeIcon, 
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface RecentOrdersTableProps {
  orders: Order[];
  isLoading?: boolean;
  onViewOrder?: (orderId: number) => void;
  onUpdateStatus?: (orderId: number) => void;
}

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PICKED_UP: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  IN_PROGRESS: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  READY: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  DELIVERING: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  COMPLETED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PICKED_UP: "Picked Up",
  IN_PROGRESS: "In Progress",
  READY: "Ready",
  DELIVERING: "Delivering",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function RecentOrdersTable({ 
  orders, 
  isLoading = false,
  onViewOrder,
  onUpdateStatus,
}: Readonly<RecentOrdersTableProps>) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Recent Orders
        </h4>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-stroke bg-white px-5 pb-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Recent Orders
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Order Code
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Customer
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Amount
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-bodydark">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-stroke dark:border-strokedark">
                  <td className="px-4 py-4">
                    <p className="font-medium text-black dark:text-white">
                      {order.orderCode}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {order.userName || 'N/A'}
                      </p>
                      <p className="text-xs text-bodydark">
                        User ID: {order.userId}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-black dark:text-white">
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </p>
                    <p className="text-xs text-bodydark">
                      {new Date(order.orderDate).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-black dark:text-white">
                      {formatCurrency(order.totalAmount)}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewOrder?.(order.id)}
                        className="hover:text-primary"
                        title="View Details"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      {order.status === 'PENDING' && (
                        <button
                          onClick={() => onUpdateStatus?.(order.id)}
                          className="hover:text-success"
                          title="Confirm Order"
                        >
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      )}
                      <button
                        onClick={() => onViewOrder?.(order.id)}
                        className="hover:text-warning"
                        title="Edit Order"
                      >
                        <PencilSquareIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
