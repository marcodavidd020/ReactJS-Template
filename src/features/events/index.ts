/**
 * Característica de Eventos
 * 
 * Exporta todos los componentes, hooks, servicios y tipos relacionados con eventos.
 */

// Exportar API
export * from './api';

// Exportar servicios
export { eventService } from "./services/eventService";
export type { IEventService } from "./services/eventService";

// Exportar store de eventos
export { default as useEventsStore } from "./store/eventsStore";

// Exportar tipos
export * from "./types/eventTypes";

