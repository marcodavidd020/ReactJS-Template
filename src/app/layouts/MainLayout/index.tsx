import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/constants";
import { useUser } from "../../../features/users/hooks/useUser";
import UserAvatar from "../../../common/components/UserAvatar";

// Definimos los estilos directamente en el componente
const styles = {
  // Contenedor principal
  container: "min-h-screen flex flex-col bg-gray-900 text-white",

  // Header
  header: "bg-gray-800 border-b border-gray-700 sticky top-0 z-20",
  headerContent:
    "container mx-auto px-4 py-3 flex items-center justify-between",

  // Logo
  logo: "flex items-center",

  // Navegación
  navigation: "hidden md:block",
  navList: "flex space-x-6",
  navLink: "text-gray-300 hover:text-white hover:underline transition",

  // Área de usuario
  userArea: "flex items-center",
  profileButton:
    "flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 rounded-full",

  // Contenido principal
  main: "flex-grow container mx-auto px-4 py-6",

  // Footer
  footer: "bg-gray-800 border-t border-gray-700 py-6",
  footerContent: "container mx-auto px-4 text-center",
};

/**
 * Layout principal de la aplicación que contiene elementos comunes
 * para las diferentes páginas
 */
const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

  return (
    <div className={styles.container}>
      {/* Header podría implementarse como componente separado */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <img
              src="/src/assets/logo-cds.png"
              alt="CDS Logo"
              className="h-10 w-auto"
            />
            <span className="font-bold text-white ml-2">CDS</span>
          </div>

          {/* Este es un placeholder para la navegación */}
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              <li>
                <a href={ROUTES.home} className={styles.navLink}>
                  Inicio
                </a>
              </li>
              <li>
                <a href={ROUTES.events} className={styles.navLink}>
                  Eventos
                </a>
              </li>
              <li>
                <a href="#" className={styles.navLink}>
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#" className={styles.navLink}>
                  Comunidad
                </a>
              </li>
            </ul>
          </nav>

          {/* Área de usuario/perfil */}
          <div className={styles.userArea}>
            <button
              className={styles.profileButton}
              onClick={() => navigate(ROUTES.profile)}
            >
              <UserAvatar
                firstName={currentUser?.firstName || "U"}
                lastName={currentUser?.lastName || "U"}
                size="sm"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal - Outlet renderiza las rutas hijas */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer básico */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Comunidad de Desarrollo de
            Software (CDS). Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
