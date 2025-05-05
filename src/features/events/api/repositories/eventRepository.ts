/**
 * Repositorio de Eventos
 * 
 * Encapsula todas las operaciones de acceso a datos relacionadas con eventos.
 * Implementa el patrón repositorio para separar la lógica de negocio del acceso a datos.
 */

import { apiClient } from '../../../../core/api/client';
import { ApiResponse, PaginatedResponse } from '../../../../core/api/types/responses';
import { EVENTS_ENDPOINTS } from "../endpoints";
import {
  Event,
  EventCreateData,
  EventUpdateData,
  EventSearchParams,
  EventAttendee,
} from "../../types/eventTypes";

/**
 * Interfaz que define las operaciones disponibles en el repositorio de eventos
 */
export interface IEventRepository {
  getEvents(page?: number, limit?: number): Promise<PaginatedResponse<Event>>;
  searchEvents(params: EventSearchParams): Promise<PaginatedResponse<Event>>;
  getEventById(id: string): Promise<Event>;
  createEvent(data: EventCreateData): Promise<Event>;
  updateEvent(id: string, data: EventUpdateData): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  getEventAttendees(eventId: string): Promise<EventAttendee[]>;
  joinEvent(eventId: string): Promise<void>;
  leaveEvent(eventId: string): Promise<void>;
}

/**
 * Implementación del repositorio de eventos
 */
class EventRepository implements IEventRepository {
  /**
   * Obtener lista paginada de eventos
   */
  async getEvents(page = 1, limit = 10): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      EVENTS_ENDPOINTS.BASE,
      {
        params: { page, limit }
      }
    );
    return response;
  }

  /**
   * Buscar eventos con filtros
   */
  async searchEvents(params: EventSearchParams): Promise<PaginatedResponse<Event>> {
    const response = await apiClient.get<PaginatedResponse<Event>>(
      EVENTS_ENDPOINTS.SEARCH,
      { params }
    );
    return response;
  }

  /**
   * Obtener evento por ID
   */
  async getEventById(id: string): Promise<Event> {
    const response = await apiClient.get<ApiResponse<Event>>(
      EVENTS_ENDPOINTS.GET(id)
    );
    return response.data;
  }

  /**
   * Crear un nuevo evento
   */
  async createEvent(data: EventCreateData): Promise<Event> {
    const response = await apiClient.post<ApiResponse<Event>>(
      EVENTS_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  }

  /**
   * Actualizar un evento existente
   */
  async updateEvent(id: string, data: EventUpdateData): Promise<Event> {
    const response = await apiClient.put<ApiResponse<Event>>(
      EVENTS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Eliminar un evento
   */
  async deleteEvent(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(
      EVENTS_ENDPOINTS.DELETE(id)
    );
  }

  /**
   * Obtener lista de asistentes a un evento
   */
  async getEventAttendees(eventId: string): Promise<EventAttendee[]> {
    const response = await apiClient.get<ApiResponse<EventAttendee[]>>(
      EVENTS_ENDPOINTS.ATTENDEES(eventId)
    );
    return response.data;
  }

  /**
   * Unirse a un evento
   */
  async joinEvent(eventId: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>(EVENTS_ENDPOINTS.JOIN(eventId));
  }

  /**
   * Abandonar un evento
   */
  async leaveEvent(eventId: string): Promise<void> {
    await apiClient.post<ApiResponse<void>>(EVENTS_ENDPOINTS.LEAVE(eventId));
  }
}

// Exportar una instancia única del repositorio
export const eventRepository = new EventRepository();
export default eventRepository; 