/**
 * Servicio de Autenticación
 *
 * Implementa la lógica de negocio relacionada con autenticación.
 * Utiliza el repositorio para acceder a los datos y aplica reglas de negocio.
 */

import {
  authRepository,
  IAuthRepository,
} from "../api/repositories/authRepository";
import { AUTH_CONFIG } from "../../../config/constants";
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthTokens,
} from "../types";
import { UserProfile } from "../../users/types/userTypes";
// import { UserRole } from '../../users/types/userTypes';
import { ApiResponse } from "../../../core/api/types/responses";
import { handleError } from "../../../core/utils/errors/errorHandler";
import {
  validateLogin,
  validateRegister,
  validateForgotPassword,
  validateResetPassword,
} from "../../../core/utils/validation";
import { ValidationError } from "../../../core/api/types/errors";

/**
 * Interfaz del servicio de autenticación
 */
export interface IAuthService {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(data: RegisterData): Promise<AuthTokens>;
  logout(): Promise<void>;
  getProfile(): Promise<UserProfile>;
  forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>>;
  resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>>;
  refreshToken(): Promise<AuthTokens>;
  verifyAuth(): Promise<{ isAuthenticated: boolean; user?: UserProfile }>;
}

// Mapper para convertir el perfil de usuario del API al modelo interno UserProfile
const mapUserProfileFromApi = (apiData: any): UserProfile => {
  return {
    id: apiData.id,
    email: apiData.email,
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    displayName: apiData.fullName || `${apiData.firstName} ${apiData.lastName}`,
    avatar: apiData.avatar,
    // role: apiData.roles?.includes('admin') ? UserRole.ADMIN :
    //       apiData.roles?.includes('moderator') ? UserRole.MODERATOR :
    //       UserRole.USER,
    roles: apiData.roles,
    isActive: apiData.isActive,
    createdAt: apiData.createdAt,
    updatedAt: apiData.updatedAt,
  };
};

/**
 * Implementación del servicio de autenticación
 */
class AuthService implements IAuthService {
  private repository: IAuthRepository;

  constructor(repository: IAuthRepository) {
    this.repository = repository;
  }

  /**
   * Maneja el almacenamiento de tokens en el localStorage
   */
  private storeAuthTokens(tokens: AuthTokens): void {
    const { accessToken, refreshToken, expiresIn } = tokens;

    localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);

    // Calcular y guardar tiempo de expiración
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(AUTH_CONFIG.expirationKey, expirationTime.toString());
  }

  /**
   * Iniciar sesión con credenciales
   */
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateLogin(credentials);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error
            ? validationError.message
            : "Credenciales inválidas"
        );
      }

      const tokens = await this.repository.login(credentials);
      this.storeAuthTokens(tokens);
      return tokens;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "authService.login",
        userMessage: "Error al iniciar sesión. Verifica tus credenciales.",
      });
    }
  }

  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthTokens> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateRegister(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error
            ? validationError.message
            : "Datos de registro inválidos"
        );
      }

      const tokens = await this.repository.register(data);
      this.storeAuthTokens(tokens);
      return tokens;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "authService.register",
        userMessage:
          "Error al registrar usuario. Verifica los datos ingresados.",
      });
    }
  }

  /**
   * Cerrar sesión del usuario actual
   */
  async logout(): Promise<void> {
    try {
      // Primero, limpiar tokens locales
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.expirationKey);

      // Luego, informar al servidor (no importa si falla)
      try {
        // TODO: Implementar logout en el servidor
        // await this.repository.logout();
      } catch (serverError) {
        console.error("Error al cerrar sesión en el servidor:", serverError);
        // No propagamos este error para asegurar que el logout local siempre funcione
      }
    } catch (error) {
      console.error("Error al cerrar sesión localmente:", error);
    }
  }

  /**
   * Obtener perfil del usuario actual
   */
  async getProfile(): Promise<UserProfile> {
    try {
      const apiUserProfile = await this.repository.getProfile();
      return mapUserProfileFromApi(apiUserProfile);
    } catch (error) {
      throw handleError(error, {
        context: "authService.getProfile",
        userMessage: "Error al obtener el perfil de usuario.",
      });
    }
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ApiResponse<void>> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateForgotPassword(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error
            ? validationError.message
            : "Email inválido"
        );
      }

      return await this.repository.forgotPassword(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "authService.forgotPassword",
        userMessage: "Error al solicitar recuperación de contraseña.",
      });
    }
  }

  /**
   * Reiniciar contraseña con token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateResetPassword(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error
            ? validationError.message
            : "Datos para reinicio de contraseña inválidos"
        );
      }

      return await this.repository.resetPassword(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "authService.resetPassword",
        userMessage: "Error al reiniciar contraseña.",
      });
    }
  }

  /**
   * Refrescar token de acceso
   */
  async refreshToken(): Promise<AuthTokens> {
    try {
      const refreshToken = localStorage.getItem(AUTH_CONFIG.refreshTokenKey);

      if (!refreshToken) {
        throw new Error("No hay refresh token disponible");
      }

      const tokens = await this.repository.refreshToken(refreshToken);
      this.storeAuthTokens(tokens);
      return tokens;
    } catch (error) {
      // Limpiar tokens en caso de error
      localStorage.removeItem(AUTH_CONFIG.tokenKey);
      localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
      localStorage.removeItem(AUTH_CONFIG.expirationKey);

      throw handleError(error, {
        context: "authService.refreshToken",
        userMessage: "Sesión expirada. Por favor, inicia sesión nuevamente.",
      });
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  async verifyAuth(): Promise<{
    isAuthenticated: boolean;
    user?: UserProfile;
  }> {
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
          await this.refreshToken();
        } catch (error) {
          // Error en refresh, usuario no autenticado
          return { isAuthenticated: false };
        }
      }

      // Obtener perfil del usuario
      const user = await this.getProfile();
      return {
        isAuthenticated: true,
        user,
      };
    } catch (error) {
      const formattedError = handleError(error, {
        context: "authService.verifyAuth",
        userMessage: "Error al verificar autenticación.",
        showNotification: false,
      });

      console.error(formattedError);
      return { isAuthenticated: false };
    }
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService(authRepository);
export default authService;
