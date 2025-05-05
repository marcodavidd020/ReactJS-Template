/**
 * Característica de Autenticación
 * 
 * Exporta todos los componentes, hooks, servicios y tipos relacionados con la autenticación.
 */

// Exportar API
export * from "./api";

// Exportar servicios
export { authService } from "./services/authService";
export type { IAuthService } from "./services/authService";

// Exportar store de autenticación
export { default as useAuthStore } from "./store/authStore";
