/**
 * Exportaciones centralizadas de tipos para la API
 */

// Exportar tipos de respuestas
export * from "./responses";

// Exportar tipos de solicitudes
export * from "./requests";

// Exportar tipos de errores
export * from "./errors";

// Interfaces principales para HTTP client

/**
 * Interfaz para un cliente HTTP básico
 */
export interface IHttpClient {
  /**
   * Realiza una solicitud GET
   * @param url Ruta del recurso
   * @param config Configuración opcional
   */
  get<T>(url: string, config?: any): Promise<T>;

  /**
   * Realiza una solicitud POST
   * @param url Ruta del recurso
   * @param data Datos a enviar
   * @param config Configuración opcional
   */
  post<T>(url: string, data?: any, config?: any): Promise<T>;

  /**
   * Realiza una solicitud PUT
   * @param url Ruta del recurso
   * @param data Datos a enviar
   * @param config Configuración opcional
   */
  put<T>(url: string, data?: any, config?: any): Promise<T>;

  /**
   * Realiza una solicitud DELETE
   * @param url Ruta del recurso
   * @param config Configuración opcional
   */
  delete<T>(url: string, config?: any): Promise<T>;

  /**
   * Realiza una solicitud PATCH
   * @param url Ruta del recurso
   * @param data Datos a enviar
   * @param config Configuración opcional
   */
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
}

/**
 * Interfaz para gestión de autenticación del cliente HTTP
 */
export interface IAuthHandler {
  /**
   * Almacena tokens de autenticación
   * @param accessToken Token de acceso
   * @param refreshToken Token de refresco
   * @param expiresIn Tiempo de expiración en segundos
   */
  saveTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): void;

  /**
   * Limpia todos los datos de autenticación
   */
  clearAuthData(): void;

  /**
   * Obtiene el token de refresco actual
   */
  getRefreshToken(): string | null;

  /**
   * Obtiene el token de acceso actual
   */
  getAccessToken(): string | null;

  /**
   * Verifica si el token actual ha expirado
   */
  isTokenExpired(): boolean;
}
