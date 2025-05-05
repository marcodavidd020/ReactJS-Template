import apiClient from "../../../lib/api/apiClient";
import { AUTH_ENDPOINTS } from "../../../lib/api/endpoints";
import { AUTH_CONFIG } from "../../../config/constants";
import {
  LoginResponse,
  ProfileResponse,
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  User,
  RefreshTokenRequest,
  AuthTokens,
  ApiResponse
} from "../types";
import { formatApiError } from "../../../common/utils/errorHandling";

/**
 * Servicio para gestionar las operaciones de autenticación
 */
const authApi = {
  /**
   * Iniciar sesión con email y contraseña
   * @param credentials Credenciales de inicio de sesión
   * @returns Tokens de autenticación
   */
  login: async (
    credentials: LoginCredentials
  ): Promise<AuthTokens> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );

      // Guardar tokens en localStorage
      const { accessToken, refreshToken, expiresIn } = response.data;
      localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);

      // Calcular y guardar tiempo de expiración
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(
        AUTH_CONFIG.expirationKey,
        expirationTime.toString()
      );

      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "auth.login");
      throw formattedError;
    }
  },

  /**
   * Obtener perfil de usuario
   * @returns Datos del perfil del usuario actual
   */
  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get<ProfileResponse>(
        AUTH_ENDPOINTS.PROFILE
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "auth.getProfile");
      throw formattedError;
    }
  },

  /**
   * Registrar un nuevo usuario
   * @param data Datos de registro
   * @returns Tokens de autenticación
   */
  register: async (
    data: RegisterData
  ): Promise<AuthTokens> => {
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.REGISTER,
        data
      );

      // Guardar tokens en localStorage
      const { accessToken, refreshToken, expiresIn } = response.data;
      localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);

      // Calcular y guardar tiempo de expiración
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(
        AUTH_CONFIG.expirationKey,
        expirationTime.toString()
      );

      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "auth.register");
      throw formattedError;
    }
  },

  /**
   * Solicitar recuperación de contraseña
   * @param data Datos para recuperación (email)
   * @returns Mensaje de confirmación
   */
  forgotPassword: async (
    data: ForgotPasswordData
  ): Promise<ApiResponse<void>> => {
    try {
      return await apiClient.post<ApiResponse<void>>(
        AUTH_ENDPOINTS.FORGOT_PASSWORD,
        data
      );
    } catch (error) {
      const formattedError = formatApiError(error, "auth.forgotPassword");
      throw formattedError;
    }
  },

  /**
   * Reiniciar contraseña con token
   * @param data Datos para el reinicio (nueva contraseña y token)
   * @returns Mensaje de confirmación
   */
  resetPassword: async (
    data: ResetPasswordData
  ): Promise<ApiResponse<void>> => {
    try {
      return await apiClient.post<ApiResponse<void>>(
        AUTH_ENDPOINTS.RESET_PASSWORD,
        data
      );
    } catch (error) {
      const formattedError = formatApiError(error, "auth.resetPassword");
      throw formattedError;
    }
  },

  /**
   * Cerrar sesión
   * @returns void
   */
  logout: async (): Promise<void> => {
    try {
      // Limpiar tokens locales
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.expirationKey);

      // Opcionalmente, hacer una petición al servidor para invalidar el token
      await apiClient.post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor", error);
      // No propagamos el error para asegurar que el logout local siempre funcione
    }
  },

  /**
   * Verificar si el usuario está autenticado mediante el token almacenado
   * @returns Estado de autenticación y usuario opcional
   */
  verifyAuth: async (): Promise<{
    isAuthenticated: boolean;
    user?: User;
  }> => {
    try {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
      const expirationTime = localStorage.getItem(AUTH_CONFIG.expirationKey);

      if (!token || !expirationTime) {
        return { isAuthenticated: false };
      }

      // Verificar si el token ha expirado
      if (new Date().getTime() > parseInt(expirationTime)) {
        // Token expirado, intentar refresh
        try {
          await authApi.refreshToken();
        } catch (error) {
          // Error en refresh, usuario no autenticado
          return { isAuthenticated: false };
        }
      }

      // Obtener perfil del usuario
      const user = await authApi.getProfile();
      return {
        isAuthenticated: true,
        user,
      };
    } catch (error) {
      const formattedError = formatApiError(error, "auth.verifyAuth");
      console.error(formattedError);
      return { isAuthenticated: false };
    }
  },

  /**
   * Refrescar token de acceso
   * @returns Nuevos tokens
   */
  refreshToken: async (): Promise<AuthTokens> => {
    try {
      const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);
      
      if (!refreshToken) {
        throw new Error("No hay refresh token disponible");
      }
      
      const refreshRequest: RefreshTokenRequest = { refreshToken };
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.REFRESH_TOKEN,
        refreshRequest
      );

      // Guardar tokens en localStorage
      const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data;
      localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
      localStorage.setItem(AUTH_CONFIG.refreshTokenKey, newRefreshToken);

      // Actualizar tiempo de expiración
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(
        AUTH_CONFIG.expirationKey,
        expirationTime.toString()
      );
      
      return response.data;
    } catch (error) {
      // Limpiar tokens en caso de error
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.expirationKey);

      const formattedError = formatApiError(error, "auth.refreshToken");
      throw formattedError;
    }
  },
};

export default authApi;
