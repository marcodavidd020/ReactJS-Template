import React from "react";
import { BrowserRouter } from "react-router-dom";

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Componente que agrupa todos los providers de la aplicación
 * para evitar anidar múltiples providers en el componente principal
 */
const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      {/* Aquí se pueden añadir más providers a medida que sean necesarios, por ejemplo:
          - ThemeProvider (para temas personalizados)
          - ErrorBoundary (para manejo de errores)
          - ReactQueryProvider (para manejo de datos y caché)
          - NotificationsProvider (para notificaciones globales)
          - etc.
      */}
      {children}
    </BrowserRouter>
  );
};

export default AppProviders;
