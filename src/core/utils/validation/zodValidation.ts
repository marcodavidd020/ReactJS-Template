/**
 * Utilidades de validación basadas en Zod
 *
 * Define esquemas y funciones de validación base usando la biblioteca Zod
 */

import { z } from "zod";
import { ValidationError } from "../../api/types/errors";

/**
 * Determina si estamos en modo desarrollo
 */
const isDevelopment = import.meta.env.MODE === "development";

/**
 * Esquemas Zod base para validación en tiempo de ejecución
 */

// Validaciones base reutilizables
export const email = z
  .string()
  .min(1, "El correo electrónico es obligatorio")
  .email("Formato de correo electrónico inválido");

// Validación de contraseña condicional según el entorno
export const password = isDevelopment
  ? z.string().min(1, "La contraseña es obligatoria")
  : z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "La contraseña debe tener al menos una letra mayúscula")
      .regex(/[a-z]/, "La contraseña debe tener al menos una letra minúscula")
      .regex(/[0-9]/, "La contraseña debe tener al menos un número");

export const name = z
  .string()
  .min(2, "El nombre debe tener al menos 2 caracteres")
  .max(50, "El nombre no puede exceder los 50 caracteres")
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/, "El nombre solo puede contener letras");

/**
 * Función genérica para validar datos con un esquema Zod
 * @param schema Esquema Zod a utilizar
 * @param data Datos a validar
 * @returns Los datos validados y transformados
 * @throws ValidationError si los datos no cumplen con el esquema
 */
export function validateWithSchema<T, U>(
  schema: z.ZodSchema<T, any, U>,
  data: U
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convertir errores de Zod al formato de nuestra aplicación
      const fieldErrors: Record<string, string> = {};

      error.errors.forEach((err) => {
        // Obtener la ruta del campo como string (ej: "user.email" -> "email")
        const path = err.path.join(".");
        fieldErrors[path] = err.message;
      });

      // Mensaje más descriptivo que incluya al menos el primer error
      const firstErrorMessage = error.errors[0]?.message || "Datos inválidos";
      const errorMessage = `Error de validación: ${firstErrorMessage}`;

      throw new ValidationError(errorMessage, fieldErrors);
    }
    throw error;
  }
}
