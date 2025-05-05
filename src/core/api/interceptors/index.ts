/**
 * Interceptores para el cliente HTTP
 * 
 * Maneja autenticación, tokens, errores, etc.
 */

import { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { AUTH_CONFIG } from '../../../config/constants';
import useAuthStore from '../../../features/auth/store/authStore';

// Extender la configuración de Axios para permitir propiedad _retry
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

/**
 * Configura todos los interceptores para una instancia de Axios
 * @param instance Instancia de Axios a configurar
 */
export const setupInterceptors = (instance: AxiosInstance): void => {
  // Interceptor de peticiones (se ejecuta antes de cada petición)
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Obtener token del localStorage
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
      
      // Si hay token, añadirlo al header Authorization
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuestas (se ejecuta después de cada respuesta)
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Si la respuesta es exitosa, devolver los datos
      return response;
    },
    async (error: AxiosError) => {
      // Obtener la configuración original de la petición para posible retry
      const originalConfig = error.config as InternalAxiosRequestConfig;
      
      if (!originalConfig) {
        return Promise.reject(error);
      }

      // Si el error es 401 (Unauthorized) y no es una petición de refresh
      if (
        error.response?.status === 401 &&
        !originalConfig._retry &&
        !originalConfig.url?.includes('/auth/refresh-token')
      ) {
        originalConfig._retry = true;

        try {
          // Intentar refrescar el token
          const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
          
          if (!refreshToken) {
            // Si no hay refresh token, forzar logout
            useAuthStore.getState().logout();
            return Promise.reject(error);
          }

          // Llamar al endpoint de refresh token
          const response = await instance.post('/auth/refresh-token', {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          // Guardar los nuevos tokens
          localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
          localStorage.setItem(AUTH_CONFIG.refreshTokenKey, newRefreshToken);
          
          // Actualizar el header y reintentar la petición original
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          
          return instance(originalConfig);
        } catch (refreshError) {
          // Si falla el refresh, forzar logout
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }

      // Para errores distintos a 401 o si ya se intentó refresh
      return Promise.reject(error);
    }
  );
};
