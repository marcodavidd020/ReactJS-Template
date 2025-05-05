/**
 * Declaraciones de tipos globales para la aplicación
 */

// Extender Window para añadir propiedades personalizadas
interface Window {
  // Ejemplo: añadir una variable global para configuración
  __APP_CONFIG__?: {
    apiUrl: string;
    environment: 'development' | 'staging' | 'production';
    version: string;
    features: Record<string, boolean>;
  };
}

// Declarar módulos para tipos de archivos que no tienen definiciones propias
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Declarar tipos para variables de entorno
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production';
  readonly VITE_ENABLE_MOCK_API: string;
  readonly VITE_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extender tipos de React
declare namespace React {
  // Ejemplo: tipo personalizado para props de componentes
  interface CDSComponentProps {
    className?: string;
    testId?: string;
  }
}

// Tipos globales para la aplicación
type UUID = string;
type ISO8601Date = string;
type Currency = 'USD' | 'EUR' | 'MXN';
type Status = 'idle' | 'loading' | 'success' | 'error';
type ThemeMode = 'light' | 'dark' | 'system';

// Extender tipos para eventos personalizados
declare global {
  interface WindowEventMap {
    'auth:logout': CustomEvent;
    'auth:login': CustomEvent<{ userId: string }>;
    'notification:show': CustomEvent<{ 
      message: string; 
      type: 'info' | 'success' | 'warning' | 'error';
      duration?: number;
    }>;
  }
} 