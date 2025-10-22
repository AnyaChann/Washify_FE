import { API_ENDPOINTS } from '@/config/api.config';
import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/api.types';
import { LoginRequest, LoginResponse, User } from '@/types/auth.types';

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data;
  },

  // Get current user info
  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  // Verify token
  verifyToken: async (): Promise<boolean> => {
    try {
      await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
      return true;
    } catch {
      return false;
    }
  },
};
