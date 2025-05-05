/**
 * Servicios para operaciones de usuario
 *
 * Implementa la lógica de negocio y validaciones para las operaciones de usuario,
 * separándolas del acceso a datos (repositorio) y la gestión de estado (store).
 */

import userRepository from "../api/repositories/userRepository";
import { CreateUserData, UserProfile, UserUpdateData } from "../types/userTypes";
import { PaginatedResponse } from "../../../core/api/types/responses";
import { handleError } from "../../../core/utils/errors/errorHandler";
import { validateUserUpdate, validateUserCreate } from "../../../core/utils/validation";
import { ValidationError } from "../../../core/api/types/errors";

/**
 * Interfaz del servicio de usuarios
 */
export interface IUserService {
  getProfile(): Promise<UserProfile>;
  getUserById(id: string): Promise<UserProfile>;
  getUsers(
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<UserProfile>>;
  searchUsers(
    term: string,
    page?: number,
    limit?: number
  ): Promise<PaginatedResponse<UserProfile>>;
  createUser(data: CreateUserData): Promise<UserProfile>;
  updateUser(id: string, data: UserUpdateData): Promise<UserProfile>;
  deleteUser(id: string): Promise<void>;
}

/**
 * Servicio para la gestión de usuarios
 */
export const userService = {
  /**
   * Obtener el perfil del usuario actual
   */
  getProfile: async (): Promise<UserProfile> => {
    try {
      return await userRepository.getProfile();
    } catch (error) {
      throw handleError(error, {
        context: "userService.getProfile",
        userMessage: "Error al obtener el perfil de usuario.",
      });
    }
  },

  /**
   * Obtener usuario por ID
   */
  getUserById: async (id: string): Promise<UserProfile> => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw handleError(error, {
        context: "userService.getUserById",
        userMessage: "Error al obtener el usuario solicitado.",
      });
    }
  },

  /**
   * Obtener lista paginada de usuarios
   */
  getUsers: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<UserProfile>> => {
    try {
      return await userRepository.getUsers(page, limit);
    } catch (error) {
      throw handleError(error, {
        context: "userService.getUsers",
        userMessage: "Error al obtener la lista de usuarios.",
      });
    }
  },

  /**
   * Buscar usuarios por término
   */
  searchUsers: async (
    term: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<UserProfile>> => {
    try {
      return await userRepository.searchUsers(term, page, limit);
    } catch (error) {
      throw handleError(error, {
        context: "userService.searchUsers",
        userMessage: "Error al buscar usuarios.",
      });
    }
  },

  /**
   * Crear un nuevo usuario
   */
  createUser: async (data: CreateUserData): Promise<UserProfile> => {
    // Validar datos
    const validData = await validateUserCreate(data);
    
    // Crear usuario
    return await userRepository.createUser(validData);
  },

  /**
   * Actualizar datos de un usuario
   */
  updateUser: async (id: string, data: UserUpdateData): Promise<UserProfile> => {
    try {
      // Validar datos
      const validData = await validateUserUpdate(data);

      // Actualizar usuario
      return await userRepository.updateUser(id, validData);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "userService.updateUser",
        userMessage: "Error al actualizar el usuario.",
      });
    }
  },

  /**
   * Eliminar un usuario
   */
  deleteUser: async (id: string): Promise<void> => {
    try {
      await userRepository.deleteUser(id);
    } catch (error) {
      throw handleError(error, {
        context: "userService.deleteUser",
        userMessage: "Error al eliminar el usuario.",
      });
    }
  },
};

export default userService;
