import { AxiosError } from "axios";

/**
 * Tipo para errores API estandarizados
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  errorDetails?: unknown;
}

/**
 * Formatea los errores de Axios de manera consistente
 * @param error Error recibido
 * @param context Contexto donde ocurrió el error para mejor identificación
 * @returns Error formateado
 */
export const formatApiError = (error: unknown, context: string): ApiError => {
  // Si es un error de Axios, extraer la información relevante
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const apiErrorMessage = error.response?.data?.message || error.message;

    console.error(`Error API (${context}):`, {
      status,
      message: apiErrorMessage,
      details: error.response?.data,
    });

    return {
      message: apiErrorMessage,
      statusCode: status,
      errorDetails: error.response?.data,
    };
  }

  // Si es otro tipo de error
  const errorMessage =
    error instanceof Error ? error.message : "Error desconocido";
  console.error(`Error (${context}):`, errorMessage);

  return {
    message: errorMessage,
    errorDetails: error,
  };
};

/**
 * Mapea códigos HTTP a mensajes de error amigables
 * @param statusCode Código HTTP del error
 * @returns Mensaje de error amigable
 */
export const getErrorMessageByStatus = (statusCode?: number): string => {
  switch (statusCode) {
    case 400:
      return "Solicitud incorrecta. Por favor, revise los datos enviados.";
    case 401:
      return "No está autorizado para realizar esta acción. Por favor, inicie sesión nuevamente.";
    case 403:
      return "No tiene permisos suficientes para realizar esta acción.";
    case 404:
      return "El recurso solicitado no fue encontrado.";
    case 409:
      return "Hay un conflicto con el estado actual del recurso.";
    case 422:
      return "Los datos enviados no son válidos. Por favor, revise la información.";
    case 500:
      return "Ha ocurrido un error en el servidor. Por favor, inténtelo más tarde.";
    default:
      return "Ha ocurrido un error inesperado. Por favor, inténtelo nuevamente.";
  }
};

/**
 * Función para manejar errores en componentes React
 * @param error Error recibido
 * @param context Contexto donde ocurrió el error
 * @param fallbackMessage Mensaje alternativo si no se puede extraer uno del error
 * @returns Mensaje de error formateado para mostrar al usuario
 */
export const handleComponentError = (
  error: unknown,
  context: string,
  fallbackMessage = "Ha ocurrido un error inesperado"
): string => {
  const apiError = formatApiError(error, context);

  if (apiError.statusCode) {
    return apiError.message || getErrorMessageByStatus(apiError.statusCode);
  }

  return apiError.message || fallbackMessage;
};
