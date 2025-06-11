import { AxiosError } from "axios";
import { 
  ApiError as CoreApiError, 
  AuthenticationError, 
  ValidationError,
  ServerError,
  createErrorFromStatus
} from "../../core/api/types/errors";
import { handleError as coreHandleError } from "../../core/utils/errors/errorHandler";
import { PrimitiveValue } from "../../core/types/common";

/**
 * Tipo para errores API estandarizados (legacy)
 * @deprecated Use ApiError from core/api/types/errors instead
 */
export type ApiErrorPrimitive = PrimitiveValue;

export interface LegacyApiErrorDetails {
  message?: string;
  field?: string;
  code?: string;
  [key: string]: PrimitiveValue | PrimitiveValue[] | undefined;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  errorDetails?: LegacyApiErrorDetails;
}

/**
 * Formatea los errores de Axios de manera consistente
 * @deprecated Use handleError from core/utils/errors/errorHandler instead
 * @param error Error recibido
 * @param context Contexto donde ocurrió el error para mejor identificación
 * @returns Error formateado
 */
export type ErrorInput = Error | AxiosError | string | LegacyApiErrorDetails | null;

export const formatApiError = (
  error: ErrorInput,
  context: string
): ApiError => {
  console.warn('formatApiError is deprecated, use handleError from core/utils/errors/errorHandler instead');
  
  // Si es un error de Axios, extraer la información relevante
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const responseData = error.response?.data as LegacyApiErrorDetails;
    const apiErrorMessage = responseData?.message || error.message;

    console.error(`Error API (${context}):`, {
      status,
      message: apiErrorMessage,
      details: error.response?.data,
    });

    return {
      message: apiErrorMessage,
      statusCode: status,
      errorDetails: error.response?.data as LegacyApiErrorDetails,
    };
  }

  // Si es otro tipo de error
  const errorMessage =
    error instanceof Error ? error.message : String(error ?? "Error desconocido");
  console.error(`Error (${context}):`, errorMessage);

  return {
    message: errorMessage,
    errorDetails:
      typeof error === "object" && error !== null 
        ? (error as LegacyApiErrorDetails) 
        : { info: errorMessage },
  };
};

/**
 * Mapea códigos HTTP a mensajes de error amigables
 * @deprecated Use userMessage from ApiError classes in core/api/types/errors
 * @param statusCode Código HTTP del error
 * @returns Mensaje de error amigable
 */
export const getErrorMessageByStatus = (statusCode?: number): string => {
  console.warn('getErrorMessageByStatus is deprecated, use userMessage from ApiError classes');
  
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
 * @deprecated Use handleError from core/utils/errors/errorHandler instead
 * @param error Error recibido
 * @param context Contexto donde ocurrió el error
 * @param fallbackMessage Mensaje alternativo si no se puede extraer uno del error
 * @returns Mensaje de error formateado para mostrar al usuario
 */
export const handleComponentError = (
  error: ErrorInput,
  context: string,
  fallbackMessage = "Ha ocurrido un error inesperado"
): string => {
  console.warn('handleComponentError is deprecated, use handleError from core/utils/errors/errorHandler instead');
  
  // Delegamos al nuevo sistema de manejo de errores
  const coreError = coreHandleError(error, {
    context,
    showNotification: false, // No mostramos notificación aquí, solo devolvemos el mensaje
  });
  
  return coreError.userMessage || fallbackMessage;
};

// Re-exportar los tipos principales del core para facilitar la migración
export type { CoreApiError as ApiErrorType };
export { 
  AuthenticationError, 
  ValidationError, 
  ServerError,
  createErrorFromStatus,
  coreHandleError as handleError
};
