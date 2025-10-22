export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  
  // Orders
  ORDERS: {
    BASE: '/orders',
    STATISTICS: '/orders/statistics',
    REVENUE: '/orders/statistics/revenue',
    TOP_CUSTOMERS: '/orders/statistics/top-customers',
    BY_STATUS: (status: string) => `/orders/status/${status}`,
    BY_ID: (id: number) => `/orders/${id}`,
    UPDATE_STATUS: (id: number) => `/orders/${id}/status`,
    BY_BRANCH: (branchId: number) => `/orders/branch/${branchId}`,
    SEARCH: '/orders/search',
  },
  
  // Shipments
  SHIPMENTS: {
    BASE: '/shipments',
    BY_STATUS: (status: string) => `/shipments/status/${status}`,
    BY_SHIPPER: (shipperId: number) => `/shipments/shipper/${shipperId}`,
    ASSIGN: (id: number) => `/shipments/${id}/assign`,
    UPDATE_STATUS: (id: number) => `/shipments/${id}/status`,
    STATISTICS: '/shipments/statistics',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    BY_ID: (id: number) => `/users/${id}`,
    SEARCH: '/users/search',
    BY_ROLE: (roleId: number) => `/users/role/${roleId}`,
    ASSIGN_ROLE: (id: number, roleName: string) => `/users/${id}/roles/${roleName}`,
    BATCH_ACTIVATE: '/users/batch/activate',
    BATCH_DEACTIVATE: '/users/batch/deactivate',
  },
  
  // Branches
  BRANCHES: {
    BASE: '/branches',
    BY_ID: (id: number) => `/branches/${id}`,
    STATISTICS: (id: number) => `/branches/${id}/statistics`,
  },
  
  // Services
  SERVICES: {
    BASE: '/services',
    BY_ID: (id: number) => `/services/${id}`,
  },
  
  // Promotions
  PROMOTIONS: {
    BASE: '/promotions',
    BY_ID: (id: number) => `/promotions/${id}`,
    ACTIVATE: (id: number) => `/promotions/${id}/activate`,
    USAGE: (id: number) => `/promotions/${id}/usage`,
  },
  
  // Shippers
  SHIPPERS: {
    BASE: '/shippers',
    BY_ID: (id: number) => `/shippers/${id}`,
    STATISTICS: (id: number) => `/shippers/${id}/statistics`,
    ACTIVATE: (id: number) => `/shippers/${id}/activate`,
  },
  
  // Payments
  PAYMENTS: {
    BASE: '/payments',
    BY_STATUS: (status: string) => `/payments/status/${status}`,
    UPDATE_STATUS: (id: number) => `/payments/${id}/status`,
    REFUND: (id: number) => `/payments/${id}/refund`,
    TOTAL_REVENUE: '/payments/statistics/total-revenue',
    BY_METHOD: '/payments/statistics/by-method',
    BY_PAYMENT_STATUS: '/payments/statistics/by-status',
  },
  
  // Reviews
  REVIEWS: {
    BASE: '/reviews',
    BY_ID: (id: number) => `/reviews/${id}`,
    BY_USER: (userId: number) => `/reviews/user/${userId}`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    BASE: '/notifications',
  },
  
  // Audit Logs
  AUDIT_LOGS: {
    BASE: '/audit-logs',
    BY_USER: (userId: number) => `/audit-logs/user/${userId}`,
    BY_ENTITY: (entityType: string, entityId: number) => `/audit-logs/entity/${entityType}/${entityId}`,
  },
};
