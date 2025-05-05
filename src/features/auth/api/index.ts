/**
 * API de Autenticación
 *
 * Exporta los endpoints, repositorios y servicios relacionados con la autenticación.
 */

// Exportar endpoints
export * from "./endpoints";

// Exportar repositorio
export { authRepository } from "./repositories/authRepository";
export type { IAuthRepository } from "./repositories/authRepository";

// En la nueva arquitectura usamos directamente authService en lugar de authApi
