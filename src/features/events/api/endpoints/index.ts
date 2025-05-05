/**
 * Endpoints específicos para eventos
 *
 * Este archivo contiene constantes con las URLs específicas para las operaciones
 * de eventos, separándolas del resto de endpoints de la API.
 */

import { API_CONFIG } from "../../../../core/api/config";

// Base URL para endpoints de eventos
export const EVENTS_BASE_PATH = `${API_CONFIG.BASE_URL}/events`;

// Endpoints de eventos
export const EVENTS_ENDPOINTS = {
  BASE: EVENTS_BASE_PATH,
  GET: (id: string) => `${EVENTS_BASE_PATH}/${id}`,
  CREATE: EVENTS_BASE_PATH,
  UPDATE: (id: string) => `${EVENTS_BASE_PATH}/${id}`,
  DELETE: (id: string) => `${EVENTS_BASE_PATH}/${id}`,
  JOIN: (id: string) => `${EVENTS_BASE_PATH}/${id}/join`,
  LEAVE: (id: string) => `${EVENTS_BASE_PATH}/${id}/leave`,
  ATTENDEES: (id: string) => `${EVENTS_BASE_PATH}/${id}/attendees`,
  SEARCH: `${EVENTS_BASE_PATH}/search`,
};
