/**
 * API de Eventos
 * 
 * Exporta los endpoints, repositorios y servicios relacionados con eventos.
 */

// Exportar endpoints
export * from "./endpoints";

// Exportar repositorio
export { eventRepository } from "./repositories/eventRepository";
export type { IEventRepository } from "./repositories/eventRepository";

// En la nueva arquitectura usamos directamente eventService en lugar de eventApi
