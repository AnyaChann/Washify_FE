"use client";

import { useEffect, useState } from "react";
import { orderService } from "@/services/order.service";
import { Order, OrderStatus } from "@/types/api.types";
import { 
  EyeIcon, 
  PencilSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getOrders();
      setOrders(data.content || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      loadOrders();
      return;
    }

    try {
      setIsLoading(true);
      const data = await orderService.searchOrders(searchKeyword);
      setOrders(data.content || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterStatus = async (status: OrderStatus | "ALL") => {
    setFilterStatus(status);
    
    if (status === "ALL") {
      loadOrders();
      return;
    }

    try {
      setIsLoading(true);
      const data = await orderService.getOrdersByStatus(status);
      setOrders(data.content || []);
    } catch (error) {
      console.error("Filter failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewOrder = (orderId: number) => {
    globalThis.window.location.href = `/orders/${orderId}`;
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Orders Management
        </h1>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Search */}
        <div className="md:col-span-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by order code, customer name..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none focus:border-primary dark:border-strokedark"
            />
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white hover:bg-opacity-90"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              Search
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="md:col-span-6">
          <select
            value={filterStatus}
            onChange={(e) => handleFilterStatus(e.target.value as OrderStatus | "ALL")}
            className="w-full rounded-lg border border-stroke bg-transparent px-5 py-3 outline-none focus:border-primary dark:border-strokedark"
          >
            <option value="ALL">All Status</option>
            {Object.keys(statusLabels).map((status) => (
              <option key={status} value={status}>
                {statusLabels[status as OrderStatus]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                  Branch
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
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-bodydark">
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
                          {order.userName || "N/A"}
                        </p>
                        <p className="text-xs text-bodydark">
                          ID: {order.userId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-black dark:text-white">
                        {order.branchName || `Branch #${order.branchId}`}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-black dark:text-white">
                        {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="text-xs text-bodydark">
                        {new Date(order.orderDate).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
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
                        {order.totalAmount.toLocaleString("vi-VN")} ₫
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="hover:text-primary"
                          title="View Details"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleViewOrder(order.id)}
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

        {/* Pagination - TODO: Implement when backend supports */}
        <div className="border-t border-stroke px-4 py-4 dark:border-strokedark">
          <p className="text-sm text-bodydark">
            Showing {orders.length} orders
          </p>
        </div>
      </div>
    </div>
  );
}
