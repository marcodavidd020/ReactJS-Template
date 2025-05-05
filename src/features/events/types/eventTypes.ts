/**
 * Tipos relacionados con eventos
 * 
 * Define las interfaces y tipos utilizados en la característica de eventos.
 */

/**
 * Evento
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  organizerId: string;
  maxAttendees?: number;
  currentAttendees: number;
  status: EventStatus;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Categorías de eventos
 */
export enum EventCategory {
  WORKSHOP = 'workshop',
  CONFERENCE = 'conference',
  MEETUP = 'meetup',
  WEBINAR = 'webinar',
  HACKATHON = 'hackathon',
  OTHER = 'other',
}

/**
 * Estados de eventos
 */
export enum EventStatus {
  UPCOMING = 'upcoming',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

/**
 * Datos para crear un evento
 */
export interface EventCreateData {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  category: EventCategory;
  maxAttendees?: number;
  imageUrl?: string;
}

/**
 * Datos para actualizar un evento
 */
export interface EventUpdateData {
  title?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  category?: EventCategory;
  maxAttendees?: number;
  status?: EventStatus;
  imageUrl?: string;
}

/**
 * Parámetros para búsqueda de eventos
 */
export interface EventSearchParams {
  query?: string;
  category?: EventCategory;
  status?: EventStatus;
  startDateFrom?: string;
  startDateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Asistente a un evento
 */
export interface EventAttendee {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  status: AttendeeStatus;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Estados de asistentes
 */
export enum AttendeeStatus {
  REGISTERED = 'registered',
  ATTENDED = 'attended',
  CANCELLED = 'cancelled',
} 