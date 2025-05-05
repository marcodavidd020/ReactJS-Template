import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommunityInfo from "../components/CommunityInfo";
import LoginForm from "../components/LoginForm";
import useAuthStore from "../store/authStore";
import { ROUTES } from "../../../config/constants";

/**
 * Background decorativo con SVG y círculos con gradientes
 */
const LoginBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-950" />
    {/* Elementos decorativos similares al logo */}
    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-5 blur-xl" />
    <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 opacity-5 blur-xl" />
    <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-5 blur-xl" />
    <div className="absolute bottom-1/4 -left-10 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-5 blur-xl" />
    {/* Puntos y líneas decorativas */}
    <svg
      className="absolute top-0 left-0 w-full h-full opacity-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="smallGrid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </pattern>
        <pattern id="dots" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#smallGrid)" />
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  </div>
);

/**
 * Página de login que combina los componentes de información de la comunidad y formulario de login
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [checking, setChecking] = useState(true);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.dashboard, { replace: true });
    } else {
      // Solo mostrar el formulario cuando realmente sabemos que no está autenticado
      setChecking(false);
    }
  }, [isAuthenticated, navigate]);

  // Si estamos verificando la autenticación, no mostrar nada
  // Esto evita el flash del login antes de redireccionar
  if (checking || isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 relative overflow-hidden font-['Inter',sans-serif]">
      <LoginBackground />

      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl z-10">
        {/* Información de la comunidad */}
        <CommunityInfo />

        {/* Formulario de login */}
        <div className="w-full md:w-5/12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
