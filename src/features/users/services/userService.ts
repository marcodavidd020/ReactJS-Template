/**
 * Servicio de Usuarios
 *
 * Implementa la lógica de negocio relacionada con usuarios.
 * Utiliza el repositorio para acceder a los datos y aplica reglas de negocio.
 */

import {
  userRepository,
  IUserRepository,
} from "../api/repositories/userRepository";
import { UserProfile, UserUpdateData } from "../types/userTypes";
import { PaginatedResponse } from "../../../core/api/types/responses";
import { handleError } from "../../../core/utils/errors/errorHandler";
import { validateUserUpdate } from "../../../core/utils/validation";
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
  updateUser(id: string, data: UserUpdateData): Promise<UserProfile>;
  deleteUser(id: string): Promise<void>;
}

/**
 * Implementación del servicio de usuarios
 */
class UserService implements IUserService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  /**
   * Obtener perfil del usuario actual
   */
  async getProfile(): Promise<UserProfile> {
    try {
      return await this.repository.getProfile();
    } catch (error) {
      throw handleError(error, {
        context: "userService.getProfile",
        userMessage: "Error al obtener el perfil de usuario.",
      });
    }
  }

  /**
   * Obtener un usuario por su ID
   */
  async getUserById(id: string): Promise<UserProfile> {
    try {
      return await this.repository.getUserById(id);
    } catch (error) {
      throw handleError(error, {
        context: "userService.getUserById",
        userMessage: "Error al obtener el usuario solicitado.",
      });
    }
  }

  /**
   * Obtener lista paginada de usuarios
   */
  async getUsers(
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<UserProfile>> {
    try {
      return await this.repository.getUsers(page, limit);
    } catch (error) {
      throw handleError(error, {
        context: "userService.getUsers",
        userMessage: "Error al obtener la lista de usuarios.",
      });
    }
  }

  /**
   * Actualizar datos de un usuario
   */
  async updateUser(id: string, data: UserUpdateData): Promise<UserProfile> {
    try {
      // Validar datos antes de enviar al repositorio
      try {
        validateUserUpdate(data);
      } catch (validationError) {
        throw new ValidationError(
          validationError instanceof Error
            ? validationError.message
            : "Datos de usuario inválidos"
        );
      }

      return await this.repository.updateUser(id, data);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }

      throw handleError(error, {
        context: "userService.updateUser",
        userMessage: "Error al actualizar el usuario.",
      });
    }
  }

  /**
   * Eliminar un usuario
   */
  async deleteUser(id: string): Promise<void> {
    try {
      await this.repository.deleteUser(id);
    } catch (error) {
      throw handleError(error, {
        context: "userService.deleteUser",
        userMessage: "Error al eliminar el usuario.",
      });
    }
  }
}

// Exportar una instancia única del servicio
export const userService = new UserService(userRepository);
export default userService;
