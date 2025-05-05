/**
 * Tipos genéricos para peticiones a la API
 */

/**
 * Interfaz base para parámetros de paginación
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Opciones de ordenación
 */
export interface SortParams {
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

/**
 * Parámetros de búsqueda genéricos
 */
export interface SearchParams extends PaginationParams, SortParams {
  query?: string;
}

/**
 * Parámetros para filtrado de datos
 */
export interface FilterParams {
  [key: string]: string | number | boolean | string[] | undefined;
}

/**
 * Parámetros completos para listar recursos
 */
export interface ListParams
  extends PaginationParams,
    SortParams,
    FilterParams {}

/**
 * Opciones de configuración para peticiones HTTP
 */
export interface RequestOptions {
  /**
   * Si se debe omitir el manejo de errores global
   */
  skipErrorHandling?: boolean;

  /**
   * Si se debe omitir el token de autenticación para esta petición
   */
  skipAuth?: boolean;

  /**
   * Tiempo máximo para la petición en milisegundos
   */
  timeout?: number;

  /**
   * Headers adicionales para la petición
   */
  headers?: Record<string, string>;

  /**
   * Si se debe mostrar un indicador de carga global
   */
  showLoader?: boolean;

  /**
   * Funciones de transformación para la respuesta
   */
  transformResponse?: ((data: any) => any)[];

  /**
   * Opciones de caché
   */
  cache?: {
    /**
     * Tiempo de vida en milisegundos
     */
    ttl: number;

    /**
     * Clave de caché personalizada
     */
    key?: string;

    /**
     * Si se debe ignorar la caché y forzar la petición
     */
    forceRefresh?: boolean;
  };
}
