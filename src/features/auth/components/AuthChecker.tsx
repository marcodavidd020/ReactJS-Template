import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';

interface AuthCheckerProps {
  children: React.ReactNode;
}

/**
 * Componente que verifica la autenticación al cargar la aplicación
 * y muestra un indicador de carga mientras se realiza la verificación
 */
const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const { checkAuth, isLoading } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } finally {
        // Indicar que la inicialización ha terminado
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [checkAuth]);

  // Mientras se verifica inicialmente la autenticación, mostrar un loader
  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  // Una vez verificado, renderizar los hijos
  return <>{children}</>;
};

export default AuthChecker; 