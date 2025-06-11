/**
 * Definiciones de errores específicos de la API
 */

import { HttpStatus } from "../config";
import { ApiErrorDetails, DataObject } from "../../types/common";

/**
 * Clase base para errores de API
 */
export class ApiError extends Error {
  /** Código HTTP asociado */
  statusCode: number;

  /** Mensaje para mostrar al usuario */
  userMessage: string;

  /** Detalles técnicos del error */
  details?: ApiErrorDetails | DataObject;

  /** Código de error para identificación programática */
  errorCode: string;

  constructor(
    message: string,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: string = "api_error"
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.userMessage = message;
    this.errorCode = errorCode;

    // Necesario para que instanceof funcione correctamente con clases que extienden Error
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Error de red (sin conexión, timeout)
 */
export class NetworkError extends ApiError {
  constructor(
    message: string = "Error de conexión. Por favor, verifica tu conexión a internet."
  ) {
    super(message, 0, "network_error");
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Error de servidor
 */
export class ServerError extends ApiError {
  constructor(
    message: string = "Error en el servidor. Por favor, inténtalo más tarde.",
    details?: DataObject
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, "server_error");
    this.details = details;
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

/**
 * Error de autenticación (sin token, token expirado)
 */
export class AuthenticationError extends ApiError {
  constructor(
    message: string = "Sesión expirada. Por favor, inicia sesión nuevamente.",
    details?: ApiErrorDetails
  ) {
    super(message, HttpStatus.UNAUTHORIZED, "authentication_error");
    this.details = details;
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Error de autorización (permisos insuficientes)
 */
export class AuthorizationError extends ApiError {
  constructor(
    message: string = "No tienes permisos para realizar esta acción.",
    details?: ApiErrorDetails
  ) {
    super(message, HttpStatus.FORBIDDEN, "authorization_error");
    this.details = details;
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

/**
 * Error de validación (datos incorrectos)
 */
export class ValidationError extends ApiError {
  /** Errores específicos por campo */
  fieldErrors?: Record<string, string>;

  constructor(
    message: string = "Los datos enviados no son válidos.",
    fieldErrors?: Record<string, string>
  ) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, "validation_error");
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Error de recurso no encontrado
 */
export class NotFoundError extends ApiError {
  constructor(resource: string = "recurso", details?: ApiErrorDetails) {
    const message = `El ${resource} solicitado no fue encontrado.`;
    super(message, HttpStatus.NOT_FOUND, "not_found_error");
    this.details = details;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error por conflicto (ej. duplicidad)
 */
export class ConflictError extends ApiError {
  constructor(
    message: string = "Hay un conflicto con el recurso actual.",
    details?: ApiErrorDetails
  ) {
    super(message, HttpStatus.CONFLICT, "conflict_error");
    this.details = details;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/**
 * Error por límite de peticiones excedido
 */
export class RateLimitError extends ApiError {
  constructor(
    message: string = "Has excedido el límite de peticiones. Por favor, inténtalo más tarde."
  ) {
    super(message, HttpStatus.TOO_MANY_REQUESTS, "rate_limit_error");
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Función para crear el error adecuado según el código de estado HTTP
 */
export function createErrorFromStatus(
  statusCode: number,
  message?: string,
  details?: ApiErrorDetails | DataObject
): ApiError {
  switch (statusCode) {
    case HttpStatus.BAD_REQUEST:
      return new ValidationError(message || "Solicitud incorrecta");

    case HttpStatus.UNAUTHORIZED:
      return new AuthenticationError(message, details as ApiErrorDetails);

    case HttpStatus.FORBIDDEN:
      return new AuthorizationError(message, details as ApiErrorDetails);

    case HttpStatus.NOT_FOUND:
      return new NotFoundError(message || "recurso", details as ApiErrorDetails);

    case HttpStatus.CONFLICT:
      return new ConflictError(message, details as ApiErrorDetails);

    case HttpStatus.UNPROCESSABLE_ENTITY:
      return new ValidationError(message);

    case HttpStatus.TOO_MANY_REQUESTS:
      return new RateLimitError(message);

    case HttpStatus.INTERNAL_SERVER_ERROR:
    case HttpStatus.BAD_GATEWAY:
    case HttpStatus.SERVICE_UNAVAILABLE:
    case HttpStatus.GATEWAY_TIMEOUT:
      return new ServerError(message, details as DataObject);

    default:
      return new ApiError(
        message || "Ha ocurrido un error inesperado",
        statusCode
      );
  }
}
