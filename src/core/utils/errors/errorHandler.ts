/**
 * Manejador centralizado de errores para la aplicación
 *
 * Proporciona funciones para procesar, formatear y mostrar errores
 * de manera consistente en toda la aplicación.
 */

import {
  ApiError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  createErrorFromStatus,
} from "../../api/types/errors";
import { DataObject } from "../../types/common";

interface ErrorHandlerOptions {
  /** Si se debe mostrar una notificación al usuario */
  showNotification?: boolean;

  /** Si se debe registrar el error en los servicios de monitoreo */
  logError?: boolean;

  /** Contexto donde ocurrió el error para mejor identificación */
  context?: string;

  /** Mensaje personalizado para mostrar al usuario */
  userMessage?: string;
}

/**
 * Datos de respuesta de error de axios
 */
interface AxiosErrorResponse {
  status?: number;
  data?: {
    message?: string;
    error?: string;
    [key: string]: unknown;
  };
  statusText?: string;
}

/**
 * Error de axios tipado
 */
interface AxiosError {
  response?: AxiosErrorResponse;
  request?: unknown;
  message?: string;
}

/**
 * Procesa un error de cualquier tipo, lo transforma en un ApiError
 * y ejecuta las acciones necesarias (logging, notificaciones, etc)
 */
export function handleError(
  error: unknown,
  options: ErrorHandlerOptions = {
    showNotification: true,
    logError: true,
  }
): ApiError {
  // Si ya es un ApiError, úsalo directamente
  const apiError = formatError(error);

  // Registrar el error si es necesario
  if (options.logError) {
    logError(apiError, options.context);
  }

  // Mostrar notificación si es necesario
  if (options.showNotification) {
    showErrorNotification(apiError, options.userMessage);
  }

  // Manejar casos especiales
  if (apiError instanceof AuthenticationError) {
    // Redirigir a login o disparar evento global
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  return apiError;
}

/**
 * Transforma cualquier tipo de error en un ApiError estructurado
 */
export function formatError(error: unknown): ApiError {
  // Si ya es un ApiError, devolverlo directamente
  if (error instanceof ApiError) {
    return error;
  }

  // Si es un error de Axios o similar con respuesta
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError;

    // Error con respuesta del servidor
    if (axiosError.response) {
      const status = axiosError.response.status || 500;
      const serverMessage =
        axiosError.response.data?.message ||
        axiosError.response.data?.error ||
        axiosError.response.statusText ||
        axiosError.message ||
        "Error del servidor";

      return createErrorFromStatus(
        status,
        serverMessage,
        axiosError.response.data as DataObject
      );
    }

    // Error de red (sin respuesta pero con request)
    if (axiosError.request) {
      return new NetworkError(
        axiosError.message || "Error de conexión al servidor"
      );
    }
  }

  // Si es un Error estándar
  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  // Para cualquier otro tipo de error
  const errorMessage = error ? String(error) : "Error desconocido";
  return new ApiError(errorMessage);
}

/**
 * Registra un error en la consola y potencialmente en servicios de monitoreo
 */
function logError(error: ApiError, context?: string): void {
  // Registrar en consola
  console.error(`[${context || "APP"}]`, error);

  // Aquí se podría integrar con servicios de monitoreo como Sentry
  // if (process.env.NODE_ENV === 'production') {
  //   // Sentry.captureException(error);
  // }
}

/**
 * Muestra una notificación de error al usuario
 */
function showErrorNotification(error: ApiError, customMessage?: string): void {
  const message = customMessage || error.userMessage;

  // Aquí se integraría con el sistema de notificaciones de la app
  // Por ejemplo, usando un estado global o un servicio de notificaciones
  console.warn("Error notification:", message);

  // Ejemplo de uso con un sistema de notificaciones:
  // notificationService.showError(message);
}

/**
 * Crea un manejador de error específico para componentes React
 */
export function createComponentErrorHandler(componentName: string) {
  return (error: unknown, userMessage?: string) => {
    return handleError(error, {
      context: `component:${componentName}`,
      userMessage,
      // Para errores de componentes, quizás no queremos hacer logout
      // automáticamente para errores de autenticación
      showNotification: true,
    });
  };
}

/**
 * Maneja errores específicamente para formularios, extrayendo errores de campos
 */
export function handleFormError(
  error: unknown,
  setErrors?: (errors: Record<string, string>) => void
): ApiError {
  const apiError = handleError(error, {
    showNotification: true,
    context: "form",
  });

  // Si es un error de validación con errores por campo y tenemos una función para establecer errores
  if (
    apiError instanceof ValidationError &&
    apiError.fieldErrors &&
    setErrors
  ) {
    setErrors(apiError.fieldErrors);
  }

  return apiError;
}
