/**
 * Interceptor para gestionar la autenticación en peticiones HTTP
 */

import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { authStorage } from "../../auth/storage";
import { AUTH_INTERCEPTOR_CONFIG } from "../config";
import { AuthenticationError } from "../types/errors";
import { TokenResponse } from "../types/responses";

/**
 * Añade el token de autenticación a las peticiones salientes
 */
export const authRequestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // No añadir token a endpoints públicos
  const isPublicEndpoint = AUTH_INTERCEPTOR_CONFIG.PUBLIC_ENDPOINTS.some(
    (endpoint) => config.url?.includes(endpoint)
  );

  if (isPublicEndpoint) {
    return config;
  }

  // Obtener token de acceso
  const token = authStorage.getAccessToken();

  // Añadir token al header si existe
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

/**
 * Maneja errores de autenticación y realiza refresh de token cuando es necesario
 */
export const authResponseInterceptor = async (
  error: AxiosError,
  refreshTokenRequest: (
    refreshToken: string
  ) => Promise<AxiosResponse<TokenResponse>>,
  retryRequest: (config: InternalAxiosRequestConfig) => Promise<AxiosResponse>
): Promise<AxiosResponse | Promise<never>> => {
  // Solo procesar errores 401 (Unauthorized)
  if (!error.response || error.response.status !== 401) {
    return Promise.reject(error);
  }

  // No intentar refresh token en endpoints públicos (login, register, etc.)
  const isPublicEndpoint = AUTH_INTERCEPTOR_CONFIG.PUBLIC_ENDPOINTS.some(
    (endpoint) => error.config?.url?.includes(endpoint)
  );

  if (isPublicEndpoint) {
    // Simplemente rechazar el error original, manteniendo el mensaje del servidor
    return Promise.reject(error);
  }

  // Evitar bucles infinitos - no procesar si el request ya es un retry o es un refresh
  const config = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };
  if (config._retry || config.url?.includes("refresh-token")) {
    // Limpiar autenticación y rechazar el error
    authStorage.clearAuthData();
    return Promise.reject(new AuthenticationError());
  }

  try {
    const refreshToken = authStorage.getRefreshToken();

    // Si no hay refresh token, rechazar
    if (!refreshToken) {
      authStorage.clearAuthData();
      return Promise.reject(
        new AuthenticationError("No hay token de refresco disponible")
      );
    }

    // Marcar esta petición como retry
    config._retry = true;

    // Realizar petición de refresh token
    const response = await refreshTokenRequest(refreshToken);

    // Extraer y almacenar nuevos tokens
    const {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn,
    } = response.data.data;
    authStorage.saveTokens(accessToken, newRefreshToken, expiresIn);

    // Actualizar el token en la petición original
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;

    // Reintentar la petición original con el nuevo token
    return retryRequest(config);
  } catch (refreshError) {
    // Error al refrescar el token, limpiar datos de autenticación
    authStorage.clearAuthData();

    // Rechazar con error de autenticación
    return Promise.reject(
      new AuthenticationError(
        "Sesión expirada. Por favor, inicia sesión de nuevo."
      )
    );
  }
};
