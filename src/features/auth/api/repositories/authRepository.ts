/**
 * Repositorio de Autenticación
 *
 * Encapsula todas las operaciones de acceso a datos relacionadas con autenticación.
 * Implementa el patrón repositorio para separar la lógica de negocio del acceso a datos.
 */

import { apiClient } from "../../../../core/api/client";
import { ApiResponse } from "../../../../core/api/types/responses";
import { AUTH_ENDPOINTS } from "../endpoints";
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  User,
  AuthTokens,
} from "../../types";

/**
 * Interfaz que define las operaciones disponibles en el repositorio de autenticación
 */
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(data: RegisterData): Promise<AuthTokens>;
  logout(): Promise<void>;
  forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>>;
  resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>>;
  getProfile(): Promise<User>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
}

/**
 * Implementación del repositorio de autenticación
 */
class AuthRepository implements IAuthRepository {
  /**
   * Iniciar sesión con credenciales
   */
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  }

  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthTokens> {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      AUTH_ENDPOINTS.REGISTER,
      data
    );
    return response.data;
  }

  /**
   * Cerrar sesión del usuario
   */
  async logout(): Promise<void> {
    await apiClient.post<ApiResponse<void>>(AUTH_ENDPOINTS.LOGOUT);
  }

  /**
   * Solicitar recuperación de contraseña
   */
  async forgotPassword(
    data: ForgotPasswordRequest
  ): Promise<ApiResponse<void>> {
    return await apiClient.post<ApiResponse<void>>(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      data
    );
  }

  /**
   * Reiniciar contraseña con token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return await apiClient.post<ApiResponse<void>>(
      AUTH_ENDPOINTS.RESET_PASSWORD,
      data
    );
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(
      AUTH_ENDPOINTS.PROFILE
    );
    return response.data;
  }

  /**
   * Refrescar token de acceso con refresh token
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const refreshRequest: RefreshTokenRequest = { refreshToken };
    const response = await apiClient.post<ApiResponse<AuthTokens>>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      refreshRequest
    );
    return response.data;
  }
}

// Exportar una instancia única del repositorio
export const authRepository = new AuthRepository();
export default authRepository;
