/**
 * Tipos genéricos para respuestas de la API
 */

import { DataObject } from "../../types/common";

/**
 * Respuesta estándar de la API
 * Esta interfaz define el formato común que todas las respuestas de API deberían seguir
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * Respuesta de paginación estándar
 * Extiende ApiResponse para incluir metadatos de paginación
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Respuesta de error de API
 */
export interface ApiErrorResponse {
  success: boolean;
  message: string;
  error: {
    code: string;
    details?: DataObject;
    fieldErrors?: Record<string, string>;
  };
  timestamp: string;
}

/**
 * Respuesta vacía para operaciones que no devuelven datos
 */
export type EmptyResponse = ApiResponse<null>;

/**
 * Tipos específicos de respuestas comunes
 */

/**
 * Respuesta de acción simplificada (éxito/fallo)
 */
export type ActionResponse = ApiResponse<{ success: boolean }>;

/**
 * Respuesta con token para autenticación
 */
export type TokenResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}>;

/**
 * Respuesta de subida de archivo
 */
export type UploadResponse = ApiResponse<{
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}>;

/**
 * Respuesta de operación batch
 */
export interface BatchResponse<T> extends ApiResponse<T[]> {
  results: Array<{
    success: boolean;
    data?: T;
    error?: string;
    index: number;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}
