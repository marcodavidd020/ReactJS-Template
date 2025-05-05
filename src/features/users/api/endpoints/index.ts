/**
 * Endpoints específicos para usuarios
 *
 * Este archivo contiene constantes con las URLs específicas para las operaciones
 * de usuarios, separándolas del resto de endpoints de la API.
 */

import { API_CONFIG } from "../../../../core/api/config";

// Base URL para endpoints de usuarios
export const USERS_BASE_PATH = `${API_CONFIG.BASE_URL}/users`;

// Endpoints de usuarios
export const USERS_ENDPOINTS = {
  BASE: USERS_BASE_PATH,
  PROFILE: `${API_CONFIG.BASE_URL}/auth/profile`, // El perfil suele estar en la ruta de auth
  GET: (id: string) => `${USERS_BASE_PATH}/${id}`,
  CREATE: USERS_BASE_PATH,
  UPDATE: (id: string) => `${USERS_BASE_PATH}/${id}`,
  DELETE: (id: string) => `${USERS_BASE_PATH}/${id}`,
  SEARCH: `${USERS_BASE_PATH}/search`,
};
