import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import { publicRoutes, privateRoutes } from "../../config/routes";
import useAuthStore from "../../features/auth/store/authStore";
import ProfilePage from "../../features/users/pages/ProfilePage";
import AuthChecker from "../../features/auth/components/AuthChecker";
import UsersPage from "../../features/users/pages/UsersPage";

/**
 * Componente para rutas protegidas que requieren autenticación
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    // Redirigir a login si no está autenticado
    return <Navigate to={publicRoutes.login.path} />;
  }

  return <>{children}</>;
};

/**
 * Dashboard placeholder temporal hasta implementar el componente real
 */
const DashboardPlaceholder: React.FC = () => (
  <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold text-white mb-4">Dashboard CDS</h1>
    <p className="text-gray-300 mb-6">
      Bienvenido al sistema de la Comunidad de Desarrollo de Software
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <h3 className="text-xl font-medium text-white mb-2">
          Eventos próximos
        </h3>
        <p className="text-gray-400">No hay eventos próximos</p>
      </div>
      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <h3 className="text-xl font-medium text-white mb-2">
          Proyectos activos
        </h3>
        <p className="text-gray-400">No hay proyectos activos</p>
      </div>
      <div className="bg-gray-700/50 p-4 rounded-xl border border-gray-600">
        <h3 className="text-xl font-medium text-white mb-2">Mi progreso</h3>
        <p className="text-gray-400">No hay datos de progreso</p>
      </div>
    </div>
    <div className="mt-6 text-center">
      <button
        onClick={() => useAuthStore.getState().logout()}
        className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
);

/**
 * Router principal de la aplicación
 */
const AppRouter: React.FC = () => {
  return (
    <AuthChecker>
      <Routes>
        {/* Rutas públicas */}
        <Route path={publicRoutes.login.path} element={<LoginPage />} />

        {/* Rutas privadas (dentro del layout principal) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path={privateRoutes.dashboard.path}
            element={<DashboardPlaceholder />}
          />
          <Route path={privateRoutes.profile.path} element={<ProfilePage />} />
          {/* Perfil de usuario */}
          <Route path={privateRoutes.profile.path} element={<ProfilePage />} />
          {/* Gestionar usuarios */}
          <Route path={privateRoutes.users.path} element={<UsersPage />} />
          {/* Aquí se añadirán más rutas privadas */}
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to={publicRoutes.login.path} />} />
      </Routes>
    </AuthChecker>
  );
};

export default AppRouter;
