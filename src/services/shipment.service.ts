import { API_ENDPOINTS } from '@/config/api.config';
import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  Shipment,
  ShipmentStatistics,
} from '@/types/api.types';

export const shipmentService = {
  // Get all shipments
  getShipments: async (params?: PaginationParams): Promise<PaginatedResponse<Shipment>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Shipment>>>(
      API_ENDPOINTS.SHIPMENTS.BASE,
      { params }
    );
    return response.data.data;
  },

  // Get shipments by status
  getShipmentsByStatus: async (
    status: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Shipment>> => {
    const response = await axiosInstance.get<ApiResponse<PaginatedResponse<Shipment>>>(
      API_ENDPOINTS.SHIPMENTS.BY_STATUS(status),
      { params }
    );
    return response.data.data;
  },

  // Create shipment
  createShipment: async (data: {
    orderId: number;
    shipperId?: number;
    type: 'PICKUP' | 'DELIVERY';
    scheduledTime?: string;
  }): Promise<Shipment> => {
    const response = await axiosInstance.post<ApiResponse<Shipment>>(
      API_ENDPOINTS.SHIPMENTS.BASE,
      data
    );
    return response.data.data;
  },

  // Assign shipper
  assignShipper: async (id: number, shipperId: number): Promise<Shipment> => {
    const response = await axiosInstance.patch<ApiResponse<Shipment>>(
      API_ENDPOINTS.SHIPMENTS.ASSIGN(id),
      { shipperId }
    );
    return response.data.data;
  },

  // Update status
  updateStatus: async (id: number, status: string): Promise<Shipment> => {
    const response = await axiosInstance.patch<ApiResponse<Shipment>>(
      API_ENDPOINTS.SHIPMENTS.UPDATE_STATUS(id),
      { status }
    );
    return response.data.data;
  },

  // Get statistics
  getStatistics: async (): Promise<ShipmentStatistics> => {
    const response = await axiosInstance.get<ApiResponse<ShipmentStatistics>>(
      API_ENDPOINTS.SHIPMENTS.STATISTICS
    );
    return response.data.data;
  },
};
