/**
 * Funciones de validación para datos de eventos
 *
 * Define esquemas y funciones de validación específicas para eventos
 */

import { z } from "zod";
import {
  EventCreateData,
  EventUpdateData,
} from "../../../features/events/types/eventTypes";
import { validateWithSchema } from "./zodValidation";

// Esquema para creación de eventos
export const eventCreateSchema = z
  .object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    description: z
      .string()
      .min(10, "La descripción debe tener al menos 10 caracteres"),
    location: z.string().min(3, "La ubicación debe ser especificada"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha de inicio debe ser válida",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha de fin debe ser válida",
    }),
    category: z.string().min(1, "La categoría es obligatoria"),
    maxAttendees: z.number().positive().optional(),
    imageUrl: z.string().url("URL de imagen inválida").optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return start < end;
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inicio",
      path: ["endDate"],
    }
  );

// Esquema para actualización de eventos
export const eventUpdateSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .optional(),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .optional(),
  location: z.string().min(3, "La ubicación debe ser especificada").optional(),
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha de inicio debe ser válida",
    })
    .optional(),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "La fecha de fin debe ser válida",
    })
    .optional(),
  category: z.string().min(1, "La categoría es obligatoria").optional(),
  maxAttendees: z.number().positive().optional(),
  status: z.string().optional(),
  imageUrl: z.string().url("URL de imagen inválida").optional(),
});

/**
 * Valida creación de eventos
 * @param data Datos para crear evento
 */
export function validateEventCreate(data: EventCreateData) {
  return validateWithSchema(eventCreateSchema, data);
}

/**
 * Valida actualización de eventos
 * @param data Datos para actualizar evento
 */
export function validateEventUpdate(data: EventUpdateData) {
  return validateWithSchema(eventUpdateSchema, data);
}
