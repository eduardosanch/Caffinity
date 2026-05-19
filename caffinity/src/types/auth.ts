// Tipos para autenticación

export type UserRole = 'user' | 'cafeteria';

export interface RegisterUserData {
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  fullName: string;
}

export interface RegisterCafeteriaData extends RegisterUserData {
  cafeteriaName: string;
  address: string;
  description: string;
  city: string;
  zone: string;
}

export interface BaseUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseUser {
  role: 'user';
}

export interface CafeteriaUser extends BaseUser {
  role: 'cafeteria';
  cafeteriaName: string;
  address: string;
  description: string;
  city: string;
  zone: string;
  coverImage?: string;
  logo?: string;
}

export type AuthUser = User | CafeteriaUser;

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  registerUser: (data: RegisterUserData) => Promise<void>;
  registerCafeteria: (data: RegisterCafeteriaData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
