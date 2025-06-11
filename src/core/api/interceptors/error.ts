/**
 * Interceptor para manejar errores de forma estandarizada
 */

import { AxiosError, AxiosResponse } from "axios";
import { formatError } from "../../utils/errors/errorHandler";
import { createErrorFromStatus, ValidationError } from "../types/errors";
import { HttpStatus } from "../config";

/** Detalles que pueden venir en la respuesta de error de la API */
interface ApiFieldError {
  field: string;
  errors: string[];
}

interface ApiErrorData {
  message?: string;
  errors?: ApiFieldError[];
  fieldErrors?: Record<string, string>;
}

/**
 * Manejador de errores para peticiones
 * Se ejecuta cuando hay un error antes de enviar la petición
 */
export const requestErrorHandler = (error: AxiosError): Promise<never> => {
  // Formatear el error como ApiError
  const formattedError = formatError(error);

  // Rechazar con el error formateado
  return Promise.reject(formattedError);
};

/**
 * Interceptor de respuestas exitosas
 * Permite procesar y transformar todas las respuestas antes de devolverlas
 */
export const responseInterceptor = <T>(
  response: AxiosResponse<T>
): AxiosResponse<T> => {
  // Aquí podrías agregar lógica como:
  //  - Transformar fechas string a objetos Date
  //  - Normalizar datos
  //  - Agregar metadatos a la respuesta
  //  - Validar la estructura de datos recibida

  return response;
};

/**
 * Extraer errores específicos de campo del formato de API
 */
function extractFieldErrors(
  responseData: ApiErrorData
): Record<string, string> | undefined {
  const fieldErrors: Record<string, string> = {};

  // Formato 1: { errors: [{ field: string, errors: string[], value: any }] }
  if (Array.isArray(responseData.errors)) {
    responseData.errors.forEach((errorInfo) => {
      if (errorInfo.field && Array.isArray(errorInfo.errors)) {
        // Si el campo es 'general', asociarlo con un mensaje global
        if (errorInfo.field === "general" && errorInfo.errors.length > 0) {
          fieldErrors._general = errorInfo.errors[0];
        } else {
          // Para otros campos, usar el primer error como mensaje
          fieldErrors[errorInfo.field] = errorInfo.errors[0];
        }
      }
    });
  }

  // Formato 2: { fieldErrors: { [field]: string } }
  if (responseData.fieldErrors && typeof responseData.fieldErrors === 'object') {
    Object.entries(responseData.fieldErrors).forEach(([field, message]) => {
      fieldErrors[field] = message as string;
    });
  }

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

/**
 * Manejador general de errores para respuestas
 * Procesa todos los errores HTTP que no sean de autenticación (401)
 */
export const responseErrorHandler = (
  error: AxiosError<ApiErrorData>
): Promise<never> => {
  // Si no tiene respuesta, rechazar con el error formateado
  if (!error.response) {
    return Promise.reject(formatError(error));
  }

  // Procesar según código de estado
  const status = error.response.status;
  const responseData = error.response.data;

  // Extraer el mensaje del error del servidor
  const serverMessage =
    responseData?.message || error.message || "Error desconocido";

  // Extraer errores específicos de campo si existen
  const fieldErrors = extractFieldErrors(responseData);

  // Crear un error específico según el código de estado
  let apiError;

  // Para errores de validación o credenciales inválidas, usar ValidationError con los detalles de campo
  if (
    status === HttpStatus.UNPROCESSABLE_ENTITY ||
    (status === HttpStatus.UNAUTHORIZED && responseData?.errors)
  ) {
    apiError = new ValidationError(serverMessage, fieldErrors);
  } else {
    // Para otros tipos de errores, usar el creador estándar
    apiError = createErrorFromStatus(status, serverMessage, responseData);
  }

  // Agregar logs específicos para errores de servidor
  if (status >= 500) {
    console.error("[API Error]", error.config?.url, apiError);
  }

  return Promise.reject(apiError);
};
