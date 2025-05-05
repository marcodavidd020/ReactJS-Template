/**
 * Tipos genéricos para respuestas de la API
 */

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
    details?: Record<string, any>;
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
export interface ActionResponse extends ApiResponse<{ success: boolean }> {}

/**
 * Respuesta con token para autenticación
 */
export interface TokenResponse
  extends ApiResponse<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  }> {}
