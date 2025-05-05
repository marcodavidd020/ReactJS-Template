/**
 * Repositorio de Usuarios
 *
 * Encapsula todas las operaciones de acceso a datos relacionadas con usuarios.
 * Implementa el patrón repositorio para separar la lógica de negocio del acceso a datos.
 */

import { apiClient } from "../../../../core/api/client";
import {
  ApiResponse,
  PaginatedResponse,
} from "../../../../core/api/types/responses";
import { USERS_ENDPOINTS } from "../endpoints";
import { UserProfile, UserUpdateData } from "../../types/userTypes";

/**
 * Interfaz que define las operaciones disponibles en el repositorio de usuarios
 */
export interface IUserRepository {
  getProfile(): Promise<UserProfile>;
  getUserById(id: string): Promise<UserProfile>;
  getUsers(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<UserProfile>>;
  updateUser(id: string, data: UserUpdateData): Promise<UserProfile>;
  deleteUser(id: string): Promise<void>;
}

/**
 * Implementación del repositorio de usuarios
 */
class UserRepository implements IUserRepository {
  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      USERS_ENDPOINTS.PROFILE
    );
    return response.data;
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(id: string): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      USERS_ENDPOINTS.GET(id)
    );
    return response.data;
  }

  /**
   * Obtener lista paginada de usuarios
   */
  async getUsers(
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<UserProfile>> {
    const response = await apiClient.get<PaginatedResponse<UserProfile>>(
      USERS_ENDPOINTS.BASE,
      {
        params: { page, limit },
      }
    );
    return response;
  }

  /**
   * Actualizar datos de un usuario
   */
  async updateUser(id: string, data: UserUpdateData): Promise<UserProfile> {
    const response = await apiClient.put<ApiResponse<UserProfile>>(
      USERS_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  }

  /**
   * Eliminar un usuario
   */
  async deleteUser(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(USERS_ENDPOINTS.DELETE(id));
  }
}

// Exportar una instancia única del repositorio
export const userRepository = new UserRepository();
export default userRepository;
