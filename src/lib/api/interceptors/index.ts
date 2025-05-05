import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { AUTH_CONFIG } from "../../../config/constants";

/**
 * Interceptor de solicitudes para añadir token de autenticación y otros headers
 */
export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // Agregar token de autenticación si existe
  const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Aquí se pueden añadir otros headers globales si son necesarios

  return config;
};

/**
 * Manejador de errores para el interceptor de solicitudes
 */
export const requestErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  // Loguear o manejar errores en las solicitudes antes de enviarlas
  console.error("Error en la solicitud:", error);
  return Promise.reject(error);
};

/**
 * Interceptor de respuestas para transformar datos y manejar respuestas comunes
 */
export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Transformar o procesar respuestas exitosas antes de devolverlas
  return response;
};

/**
 * Manejador de errores para el interceptor de respuestas
 * Maneja casos como tokens expirados, errores de servidor, etc.
 */
export const responseErrorHandler = async (
  error: AxiosError
): Promise<AxiosError> => {
  // Manejar errores comunes como 500, 404, etc.
  if (error.response?.status === 500) {
    console.error("Error del servidor:", error);
    // Aquí se podría disparar una notificación global
  }

  if (error.response?.status === 404) {
    console.error("Recurso no encontrado:", error);
  }

  if (error.response?.status === 403) {
    console.error("Acceso prohibido:", error);
    // Aquí se podría redirigir a una página de acceso denegado
  }

  return Promise.reject(error);
};

export default {
  requestInterceptor,
  requestErrorHandler,
  responseInterceptor,
  responseErrorHandler,
};
