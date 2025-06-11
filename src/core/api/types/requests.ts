/**
 * Tipos genéricos para peticiones a la API
 */

import { PrimitiveValue, DataObject } from "../../types/common";

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
  [key: string]: PrimitiveValue | PrimitiveValue[] | undefined;
}

/**
 * Parámetros completos para listar recursos
 */
export interface ListParams extends FilterParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  query?: string;
}

/**
 * Función de transformación de respuesta
 */
export type ResponseTransformer<T = DataObject, R = DataObject> = (data: T) => R;

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
  transformResponse?: ResponseTransformer[];

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

/**
 * Datos de formulario para subida de archivos
 */
export interface FileUploadData {
  file: File;
  fileName?: string;
  folder?: string;
  metadata?: DataObject;
}

/**
 * Parámetros para operaciones batch
 */
export interface BatchOperationParams<T = DataObject> {
  operations: Array<{
    method: 'create' | 'update' | 'delete';
    data: T;
    id?: string;
  }>;
  validateAll?: boolean;
  stopOnError?: boolean;
}
