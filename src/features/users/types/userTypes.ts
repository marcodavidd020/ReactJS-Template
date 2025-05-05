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
 * Tipos relacionados con usuarios
 *
 * Define las interfaces y tipos utilizados en la característica de usuarios.
 */

/**
 * Perfil de usuario
 */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
  // role: UserRole;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Roles de usuario disponibles
 */
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

/**
 * Datos para actualización de usuario
 */
export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  email?: string;
  isActive?: boolean;
  roles?: string[];
}

/**
 * Datos para creación de nuevo usuario
 */
export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
  roles: string[];
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

/**
 * Parámetros para búsqueda de usuarios
 */
export interface UserSearchParams {
  query?: string;
  role?: UserRole;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}
