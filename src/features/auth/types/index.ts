/**
 * Tipos para autenticación
 */

// Credenciales de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Datos de registro
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

// Información del usuario autenticado
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  avatar?: string;
  roles: string[];
  addresses?: any[];
  phoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Datos de token de autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

// Solicitud para refresh token
export interface RefreshTokenRequest {
  refreshToken: string;
}

// Respuesta genérica de la API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Respuesta de login
export interface LoginResponse extends ApiResponse<AuthTokens> {}

// Respuesta del perfil
export interface ProfileResponse extends ApiResponse<User> {}

// Estado de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // Errores específicos por campo (para validación de formularios)
  fieldErrors: Record<string, string>;
}

// Datos para recuperación de contraseña
export interface ForgotPasswordData {
  email: string;
}

// Solicitud de recuperación de contraseña (para API)
export interface ForgotPasswordRequest {
  email: string;
}

// Datos para reinicio de contraseña
export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Solicitud de reinicio de contraseña (para API)
export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}
