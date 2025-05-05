/**
 * Endpoints específicos para la autenticación
 *
 * Este archivo contiene constantes con las URLs específicas para las operaciones
 * de autenticación, separándolas del resto de endpoints de la API.
 */

import { API_CONFIG } from "../../../../core/api/config";

// Base URL para endpoints de autenticación
export const AUTH_BASE_PATH = `${API_CONFIG.BASE_URL}/auth`;

// Endpoints de autenticación
export const AUTH_ENDPOINTS = {
  LOGIN: `${AUTH_BASE_PATH}/login`,
  REGISTER: `${AUTH_BASE_PATH}/register`,
  LOGOUT: `${AUTH_BASE_PATH}/logout`,
  REFRESH_TOKEN: `${AUTH_BASE_PATH}/refresh-token`,
  FORGOT_PASSWORD: `${AUTH_BASE_PATH}/forgot-password`,
  RESET_PASSWORD: `${AUTH_BASE_PATH}/reset-password`,
  VERIFY_EMAIL: `${AUTH_BASE_PATH}/verify-email`,
  PROFILE: `${AUTH_BASE_PATH}/profile`,
};
