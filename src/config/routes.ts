import { ROUTES } from "./constants";

// Tipo para las rutas de la aplicación
export interface RouteConfig {
  path: string;
  title: string;
  protected?: boolean;
  exact?: boolean;
}

// Rutas públicas (no requieren autenticación)
export const publicRoutes: Record<string, RouteConfig> = {
  home: {
    path: ROUTES.home,
    title: "Inicio",
    exact: true,
  },
  login: {
    path: ROUTES.login,
    title: "Iniciar Sesión",
  },
  profile: {
    path: ROUTES.profile,
    title: "Mi Perfil",
    protected: true,
  },
  register: {
    path: ROUTES.register,
    title: "Registro",
  },
  forgotPassword: {
    path: ROUTES.forgotPassword,
    title: "Recuperar Contraseña",
  },
};

// Rutas privadas (requieren autenticación)
export const privateRoutes: Record<string, RouteConfig> = {
  dashboard: {
    path: ROUTES.dashboard,
    title: "Panel Principal",
    protected: true,
  },
  profile: {
    path: ROUTES.profile,
    title: "Mi Perfil",
    protected: true,
  },
  events: {
    path: ROUTES.events,
    title: "Eventos",
    protected: true,
  },
  projects: {
    path: ROUTES.projects,
    title: "Proyectos",
    protected: true,
  },
  users: {
    path: ROUTES.users,
    title: "Usuarios",
    protected: true,
  },
  demo: {
    path: ROUTES.demo,
    title: "Demo",
    protected: true,
  },
};

// Todas las rutas combinadas
export const allRoutes = { ...publicRoutes, ...privateRoutes };
