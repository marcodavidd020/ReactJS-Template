/**
 * Funciones de validación para datos de usuarios
 *
 * Define esquemas y funciones de validación específicas para usuarios
 */

import { z } from "zod";
import { UserUpdateData } from "../../../features/users/types/userTypes";
import { validateWithSchema, email, name } from "./zodValidation";

// Esquema de perfil de usuario
export const userProfileSchema = z.object({
  firstName: name,
  lastName: name,
  email,
  phoneNumber: z.string().optional().nullable(),
  bio: z
    .string()
    .max(500, "La biografía no puede exceder los 500 caracteres")
    .optional(),
  socialLinks: z
    .object({
      github: z.string().url("URL inválida").optional().or(z.literal("")),
      linkedin: z.string().url("URL inválida").optional().or(z.literal("")),
      twitter: z.string().url("URL inválida").optional().or(z.literal("")),
      website: z.string().url("URL inválida").optional().or(z.literal("")),
    })
    .optional(),
});

// Esquema para actualización de usuario
export const userUpdateSchema = z.object({
  firstName: name.optional(),
  lastName: name.optional(),
  displayName: z.string().optional(),
  avatar: z.string().optional(),
});

/**
 * Valida actualización de perfil
 * @param data Datos de perfil
 */
export function validateUserProfile(data: unknown) {
  return validateWithSchema(userProfileSchema, data);
}

/**
 * Valida actualización de usuario
 * @param data Datos para actualización de usuario
 */
export function validateUserUpdate(data: UserUpdateData) {
  return validateWithSchema(userUpdateSchema, data);
}
