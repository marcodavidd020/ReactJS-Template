/**
 * Mappers para la característica de Usuarios
 *
 * Responsables de transformar datos entre los modelos de API y los modelos de dominio.
 * Esta capa asegura que cambios en la API no afecten directamente a la lógica de negocio.
 */

import { UserProfileDTO, UpdateProfileRequest, User } from "../types/userTypes";

/**
 * Objeto que contiene funciones para mapear entidades relacionadas con usuarios
 */
export const userMapper = {
  /**
   * Transforma un perfil de usuario recibido de la API al modelo de dominio
   */
  mapUserProfileFromApi(apiUser: UserProfileDTO): UserProfileDTO {
    return {
      ...apiUser,
      // Transformaciones específicas si son necesarias
      // Ejemplo: convertir fechas de string a Date
      createdAt: apiUser.createdAt,
      updatedAt: apiUser.updatedAt,
      // Asegurarse que estos campos siempre existan
      socialLinks: apiUser.socialLinks || {},
      skills: apiUser.skills || [],
    };
  },

  /**
   * Transforma un modelo de dominio a la estructura esperada por la API para actualización
   */
  mapUserProfileToApi(user: UpdateProfileRequest): UpdateProfileRequest {
    return {
      ...user,
      // Transformaciones específicas para la API
      // Ejemplo: eliminar campos no permitidos o formatear datos
    };
  },

  /**
   * Transforma un perfil de usuario al modelo de usuario para uso interno
   */
  mapUserProfileToUser(profile: UserProfileDTO): User {
    return {
      ...profile,
      // Convertir string dates a objetos Date
      createdAt: new Date(profile.createdAt),
      updatedAt: new Date(profile.updatedAt),
      // Asegurarse que estos campos siempre existan como objetos
      socialLinks: profile.socialLinks || {},
      skills: profile.skills || [],
    };
  },
};

export default userMapper;
