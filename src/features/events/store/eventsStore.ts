/**
 * Store global para la gestión de eventos
 */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  Event,
  EventCreateData,
  EventUpdateData,
  EventSearchParams,
  EventAttendee
} from "../types/eventTypes";
import { eventService } from "../services/eventService";
import { ValidationError } from "../../../core/api/types/errors";
import { PaginatedResponse } from "../../../core/api/types/responses";

interface EventsState {
  // Estado
  events: Event[];
  currentEvent: Event | null;
  attendees: EventAttendee[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchParams: EventSearchParams;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;

  // Acciones
  fetchEvents: (page?: number, limit?: number) => Promise<void>;
  searchEvents: (params: EventSearchParams) => Promise<void>;
  fetchEventById: (id: string) => Promise<void>;
  createEvent: (data: EventCreateData) => Promise<Event>;
  updateEvent: (id: string, data: EventUpdateData) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;
  fetchEventAttendees: (eventId: string) => Promise<void>;
  joinEvent: (eventId: string) => Promise<void>;
  leaveEvent: (eventId: string) => Promise<void>;
  clearError: () => void;
  setSearchParams: (params: EventSearchParams) => void;
}

/**
 * Store global para la gestión de eventos
 */
const useEventsStore = create<EventsState>()(
  immer((set, get) => ({
    // Estado inicial
    events: [],
    currentEvent: null,
    attendees: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    searchParams: {},
    isLoading: false,
    error: null,
    fieldErrors: null,

    // Acción: Obtener eventos con paginación
    fetchEvents: async (page = 1, limit = 10) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const response: PaginatedResponse<Event> =
          await eventService.getEvents(page, limit);

        set({
          events: response.data,
          pagination: {
            page: response.pagination.currentPage,
            limit: response.pagination.pageSize,
            total: response.pagination.totalItems,
            totalPages: response.pagination.totalPages,
          },
          isLoading: false,
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener eventos",
          fieldErrors: null,
        });
      }
    },

    // Acción: Buscar eventos con filtros
    searchEvents: async (params: EventSearchParams) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null, searchParams: params });

        const response: PaginatedResponse<Event> =
          await eventService.searchEvents(params);

        set({
          events: response.data,
          pagination: {
            page: response.pagination.currentPage,
            limit: response.pagination.pageSize,
            total: response.pagination.totalItems,
            totalPages: response.pagination.totalPages,
          },
          isLoading: false,
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al buscar eventos",
          fieldErrors: null,
        });
      }
    },

    // Acción: Obtener evento por ID
    fetchEventById: async (id: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const event = await eventService.getEventById(id);

        set((state) => {
          state.currentEvent = event;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Error al obtener evento",
          fieldErrors: null,
        });
      }
    },

    // Acción: Crear evento
    createEvent: async (data: EventCreateData) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const event = await eventService.createEvent(data);

        set((state) => {
          state.events = [event, ...state.events];
          state.currentEvent = event;
          state.isLoading = false;
        });

        return event;
      } catch (error) {
        if (error instanceof ValidationError) {
          set({
            isLoading: false,
            error: error.message,
            fieldErrors: error.fieldErrors || null,
          });
        } else {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error al crear evento",
            fieldErrors: null,
          });
        }
        throw error;
      }
    },

    // Acción: Actualizar evento
    updateEvent: async (id: string, data: EventUpdateData) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const updatedEvent = await eventService.updateEvent(id, data);

        set((state) => {
          state.currentEvent = updatedEvent;

          // Actualizar evento en la lista si existe
          const index = state.events.findIndex((event) => event.id === id);
          if (index !== -1) {
            state.events[index] = updatedEvent;
          }

          state.isLoading = false;
        });

        return updatedEvent;
      } catch (error) {
        if (error instanceof ValidationError) {
          set({
            isLoading: false,
            error: error.message,
            fieldErrors: error.fieldErrors || null,
          });
        } else {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error al actualizar evento",
            fieldErrors: null,
          });
        }
        throw error;
      }
    },

    // Acción: Eliminar evento
    deleteEvent: async (id: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        await eventService.deleteEvent(id);

        set((state) => {
          // Eliminar evento de la lista
          state.events = state.events.filter((event) => event.id !== id);

          // Si el evento actual es el eliminado, limpiarlo
          if (state.currentEvent && state.currentEvent.id === id) {
            state.currentEvent = null;
          }

          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al eliminar evento",
          fieldErrors: null,
        });
        throw error;
      }
    },

    // Acción: Obtener asistentes a un evento
    fetchEventAttendees: async (eventId: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const attendees = await eventService.getEventAttendees(eventId);

        set((state) => {
          state.attendees = attendees;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener asistentes",
          fieldErrors: null,
        });
      }
    },

    // Acción: Unirse a un evento
    joinEvent: async (eventId: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        await eventService.joinEvent(eventId);
        
        // Recargar el evento para ver el cambio en asistentes
        const currentEvent = get().currentEvent;
        if (currentEvent && currentEvent.id === eventId) {
          const updatedEvent = await eventService.getEventById(eventId);
          set((state) => {
            state.currentEvent = updatedEvent;
            state.isLoading = false;
          });
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al unirse al evento",
          fieldErrors: null,
        });
        throw error;
      }
    },

    // Acción: Abandonar un evento
    leaveEvent: async (eventId: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        await eventService.leaveEvent(eventId);
        
        // Recargar el evento para ver el cambio en asistentes
        const currentEvent = get().currentEvent;
        if (currentEvent && currentEvent.id === eventId) {
          const updatedEvent = await eventService.getEventById(eventId);
          set((state) => {
            state.currentEvent = updatedEvent;
            state.isLoading = false;
          });
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al abandonar el evento",
          fieldErrors: null,
        });
        throw error;
      }
    },

    // Acción: Actualizar parámetros de búsqueda
    setSearchParams: (params: EventSearchParams) => {
      set((state) => {
        state.searchParams = params;
      });
    },

    // Acción: Limpiar errores
    clearError: () => set({ error: null, fieldErrors: null }),
  }))
);

export default useEventsStore; 