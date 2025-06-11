/**
 * Tipos comunes utilizados en toda la aplicación
 */

/**
 * Tipo para valores primitivos seguros
 */
export type PrimitiveValue = string | number | boolean | null;

/**
 * Tipo para objetos genéricos de datos
 */
export type DataObject = Record<string, PrimitiveValue | PrimitiveValue[] | undefined>;

/**
 * Tipo para errores de API con detalles estructurados
 */
export interface ApiErrorDetails {
  field?: string;
  code?: string;
  message?: string;
  value?: PrimitiveValue;
  constraints?: Record<string, string>;
}

/**
 * Dirección postal
 */
export interface Address {
  id?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

/**
 * Enlaces sociales
 */
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  facebook?: string;
}

/**
 * Metadatos genéricos
 */
export interface Metadata extends DataObject {
  createdBy?: string;
  updatedBy?: string;
  version?: number;
  tags?: string[];
}

/**
 * Configuración de filtros para listas
 */
export interface FilterConfig {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'like';
  value: PrimitiveValue | PrimitiveValue[];
}

/**
 * Datos de auditoría
 */
export interface AuditData {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

/**
 * Respuesta de archivo subido
 */
export interface FileUploadResponse {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
} 