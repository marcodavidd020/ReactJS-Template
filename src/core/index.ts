/**
 * Módulo Core
 *
 * Exporta los servicios y utilidades fundamentales para toda la aplicación
 */

// Exportar cliente API
export { apiClient } from "./api/client";

// Exportar configuración de API
export * from "./api/config";

// Exportar tipos comunes de API
export * from "./api/types";

// Exportar módulo de autenticación
export * from "./auth";

// Exportar utilidades de errores
export * from "./utils/errors/errorHandler";

// Exportar utilidades de validación
export * from "./utils/validation";
