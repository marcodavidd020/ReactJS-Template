/**
 * Servicio de Eventos
 * 
 * Implementa la lógica de negocio relacionada con eventos.
 * Utiliza el repositorio para acceder a los datos y aplica reglas de negocio.
 */

import { eventRepository, IEventRepository } from '../api/repositories/eventRepository';
import { 
  Event, 
  EventCreateData, 
  EventUpdateData, 
  EventSearchParams,
  EventAttendee
} from '../types/eventTypes';
import { PaginatedResponse } from '../../../core/api/types/responses';
import { handleError } from '../../../core/utils/errors/errorHandler';
import { 
  validateEventCreate, 
  validateEventUpdate 
} from '../../../core/utils/validation';
import { ValidationError } from '../../../core/api/types/errors';

/**
 * Interfaz del servicio de eventos
 */
export interface IEventService {
  getEvents(page?: number, limit?: number): Promise<PaginatedResponse<Event>>;
  getEventById(id: string): Promise<Event>;
  createEvent(data: EventCreateData): Promise<Event>;
  updateEvent(id: string, data: EventUpdateData): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
  getEventAttendees(eventId: string): Promise<EventAttendee[]>;
  joinEvent(eventId: string): Promise<void>;
  leaveEvent(eventId: string): Promise<void>;
  searchEvents(params: EventSearchParams): Promise<PaginatedResponse<Event>>;
}

/**
 * Implementación del servicio de eventos
 */
class EventService implements IEventService {
  private repository: IEventRepository;

  constructor(repository: IEventRepository) {
    this.repository = repository;
  }

  /**
   * Obtener lista paginada de eventos
   */
  async getEvents(page = 1, limit = 10): Promise<PaginatedResponse<Event>> {
    try {
      return await this.repository.getEvents(page, limit);
    } catch (error) {
      throw handleError(error, {
        context: "eventService.getEvents",
        userMessage: "Error al obtener la lista de eventos."
      });
    }
  }

  /**
   * Buscar eventos con filtros
   */
  async searchEvents(params: EventSearchParams): Promise<PaginatedResponse<Event>> {
    try {
      return await this.repository.searchEvents(params);
    } catch (error) {
      throw handleError(error, {
        context: "eventService.searchEvents",
        userMessage: "Error al buscar eventos."
      });
    }
  }

  /**
   * Obtener un evento por su ID
   */
  async getEventById(id: string): Promise<Event> {
    try {
      if (!id || id.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }
      
      return await this.repository.getEventById(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.getEventById",
        userMessage: "Error al obtener el evento solicitado."
      });
    }
  }

  /**
   * Crear un nuevo evento
   */
  async createEvent(data: EventCreateData): Promise<Event> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateEventCreate(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error ? validationError.message : "Datos de evento inválidos"
        );
      }

      return await this.repository.createEvent(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.createEvent",
        userMessage: "Error al crear el evento."
      });
    }
  }

  /**
   * Actualizar un evento existente
   */
  async updateEvent(id: string, data: EventUpdateData): Promise<Event> {
    try {
      if (!id || id.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }

      // Validar datos antes de enviar al repositorio
      try {
        validateEventUpdate(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error ? validationError.message : "Datos de evento inválidos"
        );
      }

      return await this.repository.updateEvent(id, data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.updateEvent",
        userMessage: "Error al actualizar el evento."
      });
    }
  }

  /**
   * Eliminar un evento
   */
  async deleteEvent(id: string): Promise<void> {
    try {
      if (!id || id.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }

      await this.repository.deleteEvent(id);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.deleteEvent",
        userMessage: "Error al eliminar el evento."
      });
    }
  }

  /**
   * Obtener lista de asistentes a un evento
   */
  async getEventAttendees(eventId: string): Promise<EventAttendee[]> {
    try {
      if (!eventId || eventId.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }

      return await this.repository.getEventAttendees(eventId);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.getEventAttendees",
        userMessage: "Error al obtener la lista de asistentes."
      });
    }
  }

  /**
   * Unirse a un evento
   */
  async joinEvent(eventId: string): Promise<void> {
    try {
      if (!eventId || eventId.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }

      await this.repository.joinEvent(eventId);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.joinEvent",
        userMessage: "Error al unirse al evento."
      });
    }
  }

  /**
   * Abandonar un evento
   */
  async leaveEvent(eventId: string): Promise<void> {
    try {
      if (!eventId || eventId.trim() === "") {
        throw new ValidationError("El ID del evento es requerido");
      }

      await this.repository.leaveEvent(eventId);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "eventService.leaveEvent",
        userMessage: "Error al abandonar el evento."
      });
    }
  }
}

// Exportar una instancia única del servicio
export const eventService = new EventService(eventRepository);
export default eventService; 