export type UserRole = 'ADMIN' | 'MANAGER'| 'STAFF' | 'CUSTOMER' | 'GUEST' ;

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string;
  address?: string;
  role: UserRole; // Primary role (backend might send single role)
  roles?: UserRole[]; // Multiple roles if user has many
  branchId?: number;
  isActive: boolean;
  requirePasswordChange?: boolean;
  requireEmailVerificationForPasswordChange?: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface LoginRequest {
  username: string; // Can be username, email, or phone
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data: {
    token: string;
    tokenType?: string;
    userId: number;
    username: string;
    email: string;
    fullName: string;
    phone: string;
    address?: string;
    role: UserRole;
    roles: string[];
    branchId?: number;
    isActive: boolean;
    requirePasswordChange?: boolean;
    requireEmailVerificationForPasswordChange?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}


export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  clearError: () => void;
}
