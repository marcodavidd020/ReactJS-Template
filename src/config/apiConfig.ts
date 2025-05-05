/**
 * Configuración global para la API
 */
export const API_CONFIG = {
  // Base URL de la API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "/api",

  // Timeout en milisegundos para las peticiones
  TIMEOUT: 30000,

  // Headers por defecto para las peticiones
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Opciones de cache
  CACHE: {
    // Duración en milisegundos para diferentes niveles de caché
    SHORT: 5 * 60 * 1000, // 5 minutos
    MEDIUM: 30 * 60 * 1000, // 30 minutos
    LONG: 24 * 60 * 60 * 1000, // 24 horas
  },

  // Opciones de paginación por defecto
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  },

  // Opciones para retry de peticiones
  RETRY: {
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // Milisegundos
    RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504],
  },
};

/**
 * Definición de status codes para errores comunes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Configuración del interceptor de autenticación
 */
export const AUTH_INTERCEPTOR_CONFIG = {
  // URL para excluir del interceptor de autenticación
  EXCLUDED_URLS: [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/refresh-token",
  ],

  // Número máximo de intentos de refresh
  MAX_REFRESH_ATTEMPTS: 3,
};

export default API_CONFIG;
