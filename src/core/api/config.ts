/**
 * Configuración global centralizada para la API
 *
 * Este archivo contiene todas las configuraciones relacionadas con la API,
 * facilitando su mantenimiento y actualización.
 */

/**
 * Configuración global del cliente API
 */

// Configuración básica de la API
export const API_CONFIG = {
  // URL base para todas las peticiones
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Timeout por defecto para peticiones (15 segundos)
  TIMEOUT: 15000,
  
  // Cabeceras por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Prefijos para endpoints
  ENDPOINTS: {
    AUTH: '/auth',
    USERS: '/users',
    EVENTS: '/events',
    PROJECTS: '/projects',
  },
  
  // Configuración de retry
  RETRY: {
    ATTEMPTS: 2,
    DELAY: 1000,
  },
  
  // Configuración de caché
  CACHE: {
    ENABLED: true,
    MAX_AGE: 5 * 60 * 1000, // 5 minutos en milisegundos
  },
};

/**
 * Códigos de estado HTTP estándar con tipado
 */
export enum HttpStatus {
  // Respuestas informativas (100–199)
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,

  // Respuestas satisfactorias (200–299)
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  // Redirecciones (300–399)
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  NOT_MODIFIED = 304,

  // Errores de cliente (400–499)
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // Errores de servidor (500–599)
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

/**
 * Configuración del interceptor de autenticación
 */
export const AUTH_INTERCEPTOR_CONFIG = {
  // Endpoints que no requieren autenticación
  PUBLIC_ENDPOINTS: [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/refresh-token",
  ],

  // Número máximo de intentos de refresh
  MAX_REFRESH_ATTEMPTS: 3,

  // Márgenes de tiempo para prevenir problemas de expiración (en ms)
  TOKEN_REFRESH_MARGIN: 60 * 1000, // 1 minuto antes de expirar
};

/**
 * Configuración para endpoints base de la API
 */
export const API_ENDPOINTS = {
  BASE: "/api",

  // Auth endpoints
  AUTH: {
    BASE: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    PROFILE: "/auth/profile",
  },

  // User endpoints
  USERS: {
    BASE: "/users",
    PROFILE: "/auth/profile",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },

  // Events endpoints
  EVENTS: {
    BASE: "/events",
    GET: (id: string) => `/events/${id}`,
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
    REGISTER: (id: string) => `/events/${id}/register`,
    UNREGISTER: (id: string) => `/events/${id}/unregister`,
    ATTENDEES: (id: string) => `/events/${id}/attendees`,
  },

  // Projects endpoints
  PROJECTS: {
    BASE: "/projects",
    GET: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    JOIN: (id: string) => `/projects/${id}/join`,
    LEAVE: (id: string) => `/projects/${id}/leave`,
    MEMBERS: (id: string) => `/projects/${id}/members`,
  },
};

export default API_CONFIG;
