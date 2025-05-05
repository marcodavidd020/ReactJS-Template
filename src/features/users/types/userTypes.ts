/**
 * Tipos para respuestas de la API
 */

// Respuesta genérica de la API
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Respuesta de perfil de usuario
export interface UserProfileResponse extends ApiResponse<UserProfileDTO> {}

// Respuesta de lista de usuarios
export interface UsersListResponse extends ApiResponse<UserProfileDTO[]> {}

// Respuesta de eliminación o acciones booleanas
export interface ActionResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * DTOs para transferencia de datos con la API
 */

// DTO para datos de usuario recibidos desde la API
export interface UserProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  avatar?: string;
  bio?: string;
  roles: string[];
  addresses?: any[];
  phoneNumber?: string | null;
  createdAt: string;
  updatedAt: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills?: string[];
}

/**
 * Modelos internos de la aplicación
 */

// Modelo de usuario para uso interno en la aplicación
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  avatar?: string;
  bio?: string;
  roles: string[];
  addresses?: any[];
  phoneNumber?: string | null;
  createdAt: Date;
  updatedAt: Date;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: string[];
}

/**
 * Roles de usuario disponibles
 */
export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  MODERATOR = 'moderator',
  GUEST = 'guest'
}

/**
 * Datos para peticiones a la API
 */

// Datos para actualización de perfil
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
  phoneNumber?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills?: string[];
}

// Búsqueda de usuarios
export interface UserSearchParams {
  query?: string;
  role?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
} 