import apiClient from "../../../lib/api/apiClient";
import { USER_ENDPOINTS } from "../../../lib/api/endpoints";
import {
  UserProfileDTO,
  UserProfileResponse,
  UsersListResponse,
  UpdateProfileRequest,
  UserSearchParams,
  ActionResponse,
} from "../types/userTypes";
import { formatApiError } from "../../../common/utils/errorHandling";

/**
 * Servicio para manejar las peticiones a la API relacionadas con usuarios
 */
export const userApi = {
  /**
   * Obtener el perfil del usuario actual
   * @returns El perfil del usuario logueado
   */
  getUserProfile: async (): Promise<UserProfileDTO> => {
    try {
      const response = await apiClient.get<UserProfileResponse>(
        USER_ENDPOINTS.GET_PROFILE
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "getUserProfile");
      throw formattedError;
    }
  },

  /**
   * Actualizar el perfil del usuario
   * @param profileData Datos actualizados del perfil
   * @returns El perfil actualizado
   */
  updateUserProfile: async (
    profileData: UpdateProfileRequest
  ): Promise<UserProfileDTO> => {
    try {
      const response = await apiClient.put<UserProfileResponse>(
        USER_ENDPOINTS.UPDATE_PROFILE,
        profileData
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "updateUserProfile");
      throw formattedError;
    }
  },

  /**
   * Obtener la lista de usuarios
   * @param params Parámetros opcionales de búsqueda y paginación
   * @returns Lista de usuarios
   */
  getUsers: async (params?: UserSearchParams): Promise<UserProfileDTO[]> => {
    try {
      const response = await apiClient.get<UsersListResponse>(
        USER_ENDPOINTS.GET_USERS,
        { params }
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, "getUsers");
      throw formattedError;
    }
  },

  /**
   * Obtener un usuario específico por ID
   * @param userId ID del usuario a obtener
   * @returns Datos del usuario solicitado
   */
  getUserById: async (userId: string): Promise<UserProfileDTO> => {
    try {
      const response = await apiClient.get<UserProfileResponse>(
        USER_ENDPOINTS.GET_USER(userId)
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, `getUserById(${userId})`);
      throw formattedError;
    }
  },

  /**
   * Eliminar un usuario por ID
   * @param userId ID del usuario a eliminar
   * @returns Confirmación de eliminación
   */
  deleteUser: async (userId: string): Promise<ActionResponse> => {
    try {
      return await apiClient.delete<ActionResponse>(
        USER_ENDPOINTS.DELETE_USER(userId)
      );
    } catch (error) {
      const formattedError = formatApiError(error, `deleteUser(${userId})`);
      throw formattedError;
    }
  },

  /**
   * Actualizar un usuario específico (para admin)
   * @param userId ID del usuario a actualizar
   * @param userData Datos actualizados del usuario
   * @returns El usuario actualizado
   */
  updateUser: async (
    userId: string,
    userData: UpdateProfileRequest
  ): Promise<UserProfileDTO> => {
    try {
      const response = await apiClient.put<UserProfileResponse>(
        USER_ENDPOINTS.UPDATE_USER(userId),
        userData
      );
      return response.data;
    } catch (error) {
      const formattedError = formatApiError(error, `updateUser(${userId})`);
      throw formattedError;
    }
  },
};
