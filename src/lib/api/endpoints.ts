/**
 * Centralización de endpoints de API
 *
 * Este archivo define todos los endpoints usados en la aplicación
 * para facilitar su mantenimiento y actualización.
 */

// Base URLs
export const API_BASE = "/api";

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT: `${API_BASE}/auth/logout`,
  REFRESH_TOKEN: `${API_BASE}/auth/refresh-token`,
  FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  VERIFY_EMAIL: `${API_BASE}/auth/verify-email`,
  PROFILE: `${API_BASE}/auth/profile`,
};

// User endpoints
export const USER_ENDPOINTS = {
  GET_PROFILE: `${API_BASE}/auth/profile`,
  UPDATE_PROFILE: `${API_BASE}/users/profile`,
  GET_USERS: `${API_BASE}/users`,
  GET_USER: (userId: string) => `${API_BASE}/users/${userId}`,
  UPDATE_USER: (userId: string) => `${API_BASE}/users/${userId}`,
  DELETE_USER: (userId: string) => `${API_BASE}/users/${userId}`,
};

// Event endpoints
export const EVENT_ENDPOINTS = {
  GET_EVENTS: `${API_BASE}/events`,
  CREATE_EVENT: `${API_BASE}/events`,
  GET_EVENT: (eventId: string) => `${API_BASE}/events/${eventId}`,
  UPDATE_EVENT: (eventId: string) => `${API_BASE}/events/${eventId}`,
  DELETE_EVENT: (eventId: string) => `${API_BASE}/events/${eventId}`,
  REGISTER_TO_EVENT: (eventId: string) =>
    `${API_BASE}/events/${eventId}/register`,
  UNREGISTER_FROM_EVENT: (eventId: string) =>
    `${API_BASE}/events/${eventId}/unregister`,
  GET_EVENT_ATTENDEES: (eventId: string) =>
    `${API_BASE}/events/${eventId}/attendees`,
};

// Project endpoints
export const PROJECT_ENDPOINTS = {
  GET_PROJECTS: `${API_BASE}/projects`,
  CREATE_PROJECT: `${API_BASE}/projects`,
  GET_PROJECT: (projectId: string) => `${API_BASE}/projects/${projectId}`,
  UPDATE_PROJECT: (projectId: string) => `${API_BASE}/projects/${projectId}`,
  DELETE_PROJECT: (projectId: string) => `${API_BASE}/projects/${projectId}`,
  JOIN_PROJECT: (projectId: string) => `${API_BASE}/projects/${projectId}/join`,
  LEAVE_PROJECT: (projectId: string) =>
    `${API_BASE}/projects/${projectId}/leave`,
  GET_PROJECT_MEMBERS: (projectId: string) =>
    `${API_BASE}/projects/${projectId}/members`,
};
