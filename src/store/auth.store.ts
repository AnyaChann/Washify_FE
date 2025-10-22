import { API_ENDPOINTS } from '@/config/api.config';
import axiosInstance, { handleApiError } from '@/lib/axios';
import { AuthState, LoginRequest, LoginResponse, User, UserRole } from '@/types/auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await axiosInstance.post<LoginResponse>(
            API_ENDPOINTS.AUTH.LOGIN,
            credentials
          );

          console.log('Login response:', response.data);
          console.log('Response.data.data:', response.data.data);
          console.log('Response.data type:', typeof response.data);
          console.log('Has data property?', 'data' in response.data);

          // Backend returns nested structure: response.data.data contains all fields
          const responseData = response.data.data;
          console.log('ResponseData:', responseData);
          
          if (!responseData) {
            console.error('responseData is undefined! Full response:', response);
            throw new Error('Response data is missing');
          }

          const token = responseData.token;
          console.log('Token from responseData:', token);

          // Extract roles array and primary role
          const rolesArray = Array.isArray(responseData.roles) 
            ? responseData.roles.map((r: string) => r as UserRole)
            : [];
          const primaryRole = responseData.role || rolesArray[0]; // Use role if exists, else first from roles array

          console.log('Roles array:', rolesArray);
          console.log('Primary role:', primaryRole);

          // Build user object from response data
          const user: User = {
            id: responseData.userId,
            username: responseData.username,
            email: responseData.email,
            fullName: responseData.fullName,
            phone: responseData.phone || '',
            address: responseData.address || undefined,
            role: primaryRole as UserRole,
            roles: rolesArray,
            branchId: responseData.branchId || undefined,
            isActive: responseData.isActive !== false, // Default to true
            requirePasswordChange: responseData.requirePasswordChange || false,
            requireEmailVerificationForPasswordChange: responseData.requireEmailVerificationForPasswordChange || false,
            createdAt: responseData.createdAt || new Date().toISOString(),
            updatedAt: responseData.updatedAt || new Date().toISOString(),
          };

          console.log('Extracted token:', token ? 'Present' : 'Missing');
          console.log('Extracted user:', user);

          if (!token || !user?.role) {
            console.error('Validation failed - token:', token, 'user.role:', user?.role);
            throw new Error('Invalid response structure: missing token or user data');
          }

          // Check if user has admin/manager/staff role
          if (!['ADMIN', 'MANAGER', 'STAFF'].includes(user.role)) {
            throw new Error('Access denied. Admin/Manager/Staff only.');
          }

          // Save to localStorage
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(user));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          console.error('Login error:', error);
          const errorMessage = handleApiError(error);
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      logout: () => {
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        // Redirect to login
        if (globalThis.window !== undefined) {
          globalThis.window.location.href = '/auth/sign-in';
        }
      },

      setUser: (user: User) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
