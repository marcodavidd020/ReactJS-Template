/**
 * Tipos de datos para la autenticación
 */

/**
 * Credenciales para iniciar sesión
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Datos para registro de usuario
 */
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

/**
 * Tokens de autenticación
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * Solicitud para refrescar token
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Datos para solicitud de recuperación de contraseña
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Datos para reinicio de contraseña
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Modelo de usuario autenticado
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  avatar?: string;
  roles: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Usuario con información adicional
 */
export interface UserProfile extends User {
  phoneNumber?: string;
  bio?: string;
  addresses?: unknown[];
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills?: string[];
}

/**
 * Estado actual de autenticación
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}
