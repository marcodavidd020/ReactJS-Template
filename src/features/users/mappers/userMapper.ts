import { User, UserProfileDTO, UpdateProfileRequest } from "../types/userTypes";

/**
 * Mapper para transformar datos entre DTO de API y modelos de dominio
 */
export const userMapper = {
  /**
   * Convierte un DTO de usuario de la API a un modelo de dominio
   */
  toDomain(userDTO: UserProfileDTO): User {
    return {
      id: userDTO.id,
      email: userDTO.email,
      firstName: userDTO.firstName,
      lastName: userDTO.lastName,
      fullName: userDTO.fullName,
      isActive: userDTO.isActive,
      avatar: userDTO.avatar,
      bio: userDTO.bio,
      roles: userDTO.roles,
      addresses: userDTO.addresses || [],
      phoneNumber: userDTO.phoneNumber,
      createdAt: new Date(userDTO.createdAt),
      updatedAt: new Date(userDTO.updatedAt),
      socialLinks: userDTO.socialLinks || {
        github: undefined,
        linkedin: undefined,
        twitter: undefined,
        website: undefined,
      },
      skills: userDTO.skills || [],
    };
  },

  /**
   * Convierte un modelo de dominio a DTO para enviar a la API
   */
  toDTO(user: Partial<User>): UpdateProfileRequest {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber === null ? undefined : user.phoneNumber,
      socialLinks: user.socialLinks,
      skills: user.skills,
    };
  },
};
