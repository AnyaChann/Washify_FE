import { API_ENDPOINTS } from '@/config/api.config';
import axiosInstance from '@/lib/axios';
import { 
  OrderStatistics, 
  RevenueStatistics, 
  ShipmentStatistics 
} from '@/types/api.types';

export const dashboardService = {
  // Get order statistics
  getOrderStatistics: async (): Promise<OrderStatistics> => {
    const response = await axiosInstance.get<{ data: OrderStatistics }>(
      API_ENDPOINTS.ORDERS.STATISTICS
    );
    return response.data.data;
  },

  // Get revenue statistics by period
  getRevenueStatistics: async (params?: {
    startDate?: string;
    endDate?: string;
    groupBy?: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
  }): Promise<RevenueStatistics> => {
    // Default to last 30 days if not provided
    const endDate = params?.endDate || new Date().toISOString();
    const startDate = params?.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const groupBy = params?.groupBy || 'DAY';

    const response = await axiosInstance.get<{ data: RevenueStatistics }>(
      API_ENDPOINTS.ORDERS.REVENUE,
      { 
        params: {
          startDate,
          endDate,
          groupBy,
        }
      }
    );
    return response.data.data;
  },

  // Get shipment statistics
  getShipmentStatistics: async (): Promise<ShipmentStatistics> => {
    const response = await axiosInstance.get<{ data: ShipmentStatistics }>(
      API_ENDPOINTS.SHIPMENTS.STATISTICS
    );
    return response.data.data;
  },

  // Get total revenue from payments
  getTotalRevenue: async (): Promise<number> => {
    const response = await axiosInstance.get<{ data: { totalRevenue: number } }>(
      API_ENDPOINTS.PAYMENTS.TOTAL_REVENUE
    );
    return response.data.data.totalRevenue;
  },

  // Get all dashboard data at once
  getDashboardData: async () => {
    const [orders, revenue, shipments] = await Promise.all([
      dashboardService.getOrderStatistics(),
      dashboardService.getRevenueStatistics({ groupBy: 'DAY' }),
      dashboardService.getShipmentStatistics(),
    ]);

    return {
      orders,
      revenue,
      shipments,
    };
  },
};
