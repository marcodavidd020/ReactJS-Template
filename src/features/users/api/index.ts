/**
 * API de Usuarios
 * 
 * Exporta los endpoints, repositorios y servicios relacionados con usuarios.
 */

// Exportar endpoints
export * from './endpoints';

// Exportar repositorio
export { userRepository } from './repositories/userRepository';
export type { IUserRepository } from './repositories/userRepository';

// En la nueva arquitectura usamos directamente userService en lugar de userApi 