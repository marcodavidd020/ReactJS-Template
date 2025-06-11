/**
 * Funciones de validación para datos de usuarios
 *
 * Define esquemas y funciones de validación específicas para usuarios
 */

import { z } from "zod";
import { UserUpdateData, CreateUserData, UpdateProfileRequest } from "../../../features/users/types/userTypes";
import { validateWithSchema, email, name, password } from "./zodValidation";

// Esquema de perfil de usuario para actualización
export const userProfileSchema = z.object({
  firstName: name.optional(),
  lastName: name.optional(),
  phoneNumber: z.string().optional().nullable(),
  bio: z
    .string()
    .max(500, "La biografía no puede exceder los 500 caracteres")
    .optional(),
  avatar: z.string().url("URL inválida").optional(),
  socialLinks: z
    .object({
      github: z.string().url("URL inválida").optional().or(z.literal("")),
      linkedin: z.string().url("URL inválida").optional().or(z.literal("")),
      twitter: z.string().url("URL inválida").optional().or(z.literal("")),
      website: z.string().url("URL inválida").optional().or(z.literal("")),
    })
    .optional(),
  skills: z.array(z.string()).optional(),
});

// Esquema para actualización de usuario
export const userUpdateSchema = z.object({
  firstName: name.optional(),
  lastName: name.optional(),
  displayName: z.string().optional(),
  avatar: z.string().optional(),
});

// Esquema para creación de usuario
export const userCreateSchema = z.object({
  email: email,
  firstName: name,
  lastName: name,
  password: password,
  avatar: z.string().url("URL inválida").optional(),
  roles: z.array(z.string()),
});

/**
 * Valida actualización de perfil
 * @param data Datos de perfil
 */
export function validateUserProfile(data: UpdateProfileRequest) {
  return validateWithSchema(userProfileSchema, data);
}

/**
 * Valida actualización de usuario
 * @param data Datos para actualización de usuario
 */
export function validateUserUpdate(data: UserUpdateData) {
  return validateWithSchema(userUpdateSchema, data);
}

/**
 * Valida creación de usuario
 * @param data Datos para crear un nuevo usuario
 */
export function validateUserCreate(data: CreateUserData) {
  return validateWithSchema(userCreateSchema, data);
}
