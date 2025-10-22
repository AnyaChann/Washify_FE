import { API_ENDPOINTS } from '@/config/api.config';
import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  Order,
  OrderStatistics,
  PaginatedResponse,
  PaginationParams,
  RevenueStatistics,
} from '@/types/api.types';

export const orderService = {
  // Get all orders
  getOrders: async (params?: PaginationParams): Promise<PaginatedResponse<Order>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Order>>>(
      API_ENDPOINTS.ORDERS.BASE,
      { params }
    );
    return response.data.data;
  },

  // Get order by ID
  getOrderById: async (id: number): Promise<Order> => {
    const response = await axiosInstance.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.BY_ID(id)
    );
    return response.data.data;
  },

  // Get orders by status
  getOrdersByStatus: async (
    status: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Order>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Order>>>(
      API_ENDPOINTS.ORDERS.BY_STATUS(status),
      { params }
    );
    return response.data.data;
  },

  // Update order status
  updateOrderStatus: async (id: number, status: string): Promise<Order> => {
    console.log('Updating order status:', { id, status, url: API_ENDPOINTS.ORDERS.UPDATE_STATUS(id) });
    
    try {
      const response = await axiosInstance.patch<ApiResponse<Order>>(
        API_ENDPOINTS.ORDERS.UPDATE_STATUS(id),
        { status }
      );
      console.log('Update success:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('Update failed:', error.response?.data || error);
      throw error;
    }
  },

  // Search orders
  searchOrders: async (
    keyword: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Order>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Order>>>(
      API_ENDPOINTS.ORDERS.SEARCH,
      { params: { keyword, ...params } }
    );
    return response.data.data;
  },

  // Get order statistics
  getStatistics: async (): Promise<OrderStatistics> => {
    const response = await axiosInstance.get<ApiResponse<OrderStatistics>>(
      API_ENDPOINTS.ORDERS.STATISTICS
    );
    return response.data.data;
  },

  // Get revenue statistics
  getRevenueStatistics: async (
    startDate: string,
    endDate: string,
    groupBy: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' = 'DAY'
  ): Promise<RevenueStatistics[]> => {
    const response = await axiosInstance.get<ApiResponse<RevenueStatistics[]>>(
      API_ENDPOINTS.ORDERS.REVENUE,
      { params: { startDate, endDate, groupBy } }
    );
    return response.data.data;
  },

  // Get top customers
  getTopCustomers: async (limit = 10) => {
    const response = await axiosInstance.get<ApiResponse<any>>(
      API_ENDPOINTS.ORDERS.TOP_CUSTOMERS,
      { params: { limit } }
    );
    return response.data.data;
  },

  // Get recent orders (for dashboard)
  getRecentOrders: async (limit = 10): Promise<Order[]> => {
    try {
      // Backend doesn't support pagination yet, so get all orders
      const response = await axiosInstance.get<ApiResponse<Order[]>>(
        API_ENDPOINTS.ORDERS.BASE
      );
      
      console.log('Orders response:', response.data.data);
      
      // Return latest orders (sort by id desc and limit)
      const orders = response.data.data || [];
      const sortedOrders = [...orders].sort((a, b) => b.id - a.id);
      return sortedOrders.slice(0, limit);
    } catch (error) {
      console.error('Failed to fetch recent orders:', error);
      // Return empty array on error instead of throwing
      return [];
    }
  },
};
