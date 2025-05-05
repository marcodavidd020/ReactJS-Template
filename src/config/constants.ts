// Constantes de la aplicación CDS

// Información de la comunidad
export const COMMUNITY_INFO = {
  name: "Comunidad de Desarrollo de Software",
  shortName: "CDS",
  description:
    "Únete a nuestra red de desarrolladores donde compartimos conocimiento, colaboramos en proyectos y crecemos juntos profesionalmente.",
  stats: {
    developers: "+2,500",
    projects: "+180",
    events: "+50",
    technologies: "+25",
  },
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: "cds_auth_token",
  refreshTokenKey: "cds_refresh_token",
  expirationKey: "cds_token_expiration",
};

// Rutas de la aplicación
export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  dashboard: "/dashboard",
  profile: "/profile",
  events: "/events",
  projects: "/projects",
};

// Mensajes de error
export const ERROR_MESSAGES = {
  required: "Este campo es obligatorio",
  invalidEmail: "Ingresa un correo electrónico válido",
  passwordLength: "La contraseña debe tener al menos 8 caracteres",
  passwordMismatch: "Las contraseñas no coinciden",
  loginFailed: "Credenciales incorrectas. Por favor, intenta nuevamente.",
  serverError: "Ha ocurrido un error en el servidor. Intenta más tarde.",
  networkError: "Error de conexión. Verifica tu conexión a internet.",
};

// Tiempos de caché (en milisegundos)
export const CACHE_TIMES = {
  short: 5 * 60 * 1000, // 5 minutos
  medium: 30 * 60 * 1000, // 30 minutos
  long: 24 * 60 * 60 * 1000, // 24 horas
};

// Redes sociales para autenticación
export const SOCIAL_AUTH = {
  github: {
    enabled: true,
    name: "GitHub",
  },
  google: {
    enabled: true,
    name: "Google",
  },
};
