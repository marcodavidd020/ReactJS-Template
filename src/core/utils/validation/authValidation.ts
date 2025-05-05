/**
 * Funciones de validación para datos de autenticación
 *
 * Define esquemas y funciones de validación específicas para autenticación
 */

import { z } from "zod";
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../../../features/auth/types";
import { validateWithSchema, email, password, name } from "./zodValidation";

// Esquema de login
export const loginSchema = z.object({
  email,
  password,
});

// Esquema de registro
export const registerSchema = z
  .object({
    email,
    password,
    confirmPassword: z.string(),
    firstName: name,
    lastName: name,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Esquema de recuperación de contraseña
export const forgotPasswordSchema = z.object({
  email,
});

// Esquema de reinicio de contraseña
export const resetPasswordSchema = z
  .object({
    password,
    confirmPassword: z.string(),
    token: z.string().min(1, "El token es obligatorio"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

/**
 * Valida datos de inicio de sesión
 * @param data Credenciales de inicio de sesión
 */
export function validateLogin(data: LoginCredentials) {
  return validateWithSchema(loginSchema, data);
}

/**
 * Valida datos de registro
 * @param data Datos de registro
 */
export function validateRegister(data: RegisterData) {
  return validateWithSchema(registerSchema, data);
}

/**
 * Valida solicitud de recuperación de contraseña
 * @param data Datos para recuperación
 */
export function validateForgotPassword(data: ForgotPasswordRequest) {
  return validateWithSchema(forgotPasswordSchema, data);
}

/**
 * Valida reinicio de contraseña
 * @param data Datos para reinicio
 */
export function validateResetPassword(data: ResetPasswordRequest) {
  return validateWithSchema(resetPasswordSchema, data);
}
