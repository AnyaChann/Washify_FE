// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Pagination
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// Order Types (match DB structure)
export type OrderStatus = 
  | 'PENDING' 
  | 'CONFIRMED' 
  | 'PICKED_UP' 
  | 'IN_PROGRESS' 
  | 'READY' 
  | 'DELIVERING' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface Order {
  id: number;
  orderCode: string; // Unique code like WF202510210001
  userId: number;
  branchId: number;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
  notes?: string;
  deletedAt?: string | null;
  
  // Populated fields (from joins or backend)
  userName?: string; // Backend returns userName instead of customerName
  customerName?: string;
  customerPhone?: string;
  branchName?: string;
  items?: OrderItem[];
  payment?: Payment;
  shipment?: Shipment;
  promotions?: Promotion[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  serviceId: number;
  quantity: number;
  price: number;
  
  // Populated fields
  serviceName?: string;
  serviceDescription?: string;
}

// Shipment Types (match DB structure)
export type DeliveryStatus = 
  | 'PENDING' 
  | 'ASSIGNED' 
  | 'PICKED_UP' 
  | 'DELIVERING' 
  | 'DELIVERED' 
  | 'FAILED';

export interface Shipment {
  id: number;
  orderId: number;
  userId: number;
  shipperId?: number;
  address: string;
  deliveryStatus: DeliveryStatus;
  deliveryDate?: string;
  shipperName?: string; // Cached from shipper
  shipperPhone?: string; // Cached from shipper
  createdAt: string;
  updatedAt: string;
  
  // Populated fields
  orderCode?: string;
}

// Payment Types (match DB structure)
export type PaymentMethod = 'CASH' | 'MOMO';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: number;
  orderId: number; // UNIQUE - one order has one payment
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentDate?: string;
  amount: number;
  transactionId?: string;
  paymentUrl?: string;
  qrCode?: string;
  gatewayResponse?: string;
}

// Promotion Types (match DB structure)
export type DiscountType = 'PERCENT' | 'FIXED';

export interface Promotion {
  id: number;
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Service Types (match DB structure)
export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  estimatedTime?: number; // in minutes
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Branch Types (match DB structure)
export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  managerName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Shipper Types (match DB structure)
export interface Shipper {
  id: number;
  name: string;
  phone: string;
  vehicleNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Review Types (match DB structure)
export interface Review {
  id: number;
  orderId: number;
  userId: number;
  rating: number; // 1-5 stars
  comment?: string;
  createdAt: string;
  
  // Populated fields
  userName?: string;
  orderCode?: string;
}

// Notification Types (match DB structure)
export type NotificationType = 
  | 'ORDER' 
  | 'PAYMENT' 
  | 'SHIPMENT' 
  | 'PROMOTION' 
  | 'SYSTEM';

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  relatedId?: number; // ID of related entity (order, payment, etc.)
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

// Statistics Types
export interface OrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

export interface RevenueStatistics {
  totalRevenue: number;
  orderCount: number;
  averageOrderValue: number;
  startDate: string;
  endDate: string;
}

export interface ShipmentStatistics {
  todayPickups: number;
  todayDeliveries: number;
  pendingPickups: number;
  pendingDeliveries: number;
  completedToday: number;
}
