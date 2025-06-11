/**
 * Utilidades de validación para formularios y datos
 * Estas funciones se pueden usar independientemente o con bibliotecas como formik/yup
 */

/**
 * Verifica si un correo electrónico es válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Verifica si una contraseña cumple con los requisitos de seguridad
 * - Al menos 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Al menos un número
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUppercase && hasLowercase && hasNumber;
};

/**
 * Verifica si dos contraseñas coinciden
 */
export const passwordsMatch = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Verifica si una URL es válida
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_error) {
    return false;
  }
};

/**
 * Verifica si un string tiene una longitud mínima
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

/**
 * Verifica si un string tiene una longitud máxima
 */
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

/**
 * Verifica si un valor está dentro de un rango
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Objeto con mensajes comunes de error
 */
export const errorMessages = {
  required: "Este campo es obligatorio",
  email: "Por favor, introduce un correo electrónico válido",
  password:
    "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número",
  passwordsMatch: "Las contraseñas no coinciden",
  url: "Por favor, introduce una URL válida",
  minLength: (length: number) => `Debe tener al menos ${length} caracteres`,
  maxLength: (length: number) => `No puede tener más de ${length} caracteres`,
  range: (min: number, max: number) => `Debe estar entre ${min} y ${max}`,
};

/**
 * Validador genérico para campos de formulario
 */
export const validateField = (
  value: string,
  validations: {
    required?: boolean;
    email?: boolean;
    minLength?: number;
    maxLength?: number;
    isPassword?: boolean;
    matchWith?: string;
    url?: boolean;
  }
): string | null => {
  // Validación de campo requerido
  if (validations.required && !value.trim()) {
    return errorMessages.required;
  }

  // Validación de email
  if (validations.email && value && !isValidEmail(value)) {
    return errorMessages.email;
  }

  // Validación de longitud mínima
  if (
    validations.minLength &&
    value &&
    !hasMinLength(value, validations.minLength)
  ) {
    return errorMessages.minLength(validations.minLength);
  }

  // Validación de longitud máxima
  if (
    validations.maxLength &&
    value &&
    !hasMaxLength(value, validations.maxLength)
  ) {
    return errorMessages.maxLength(validations.maxLength);
  }

  // Validación de contraseña
  if (validations.isPassword && value && !isValidPassword(value)) {
    return errorMessages.password;
  }

  // Validación de coincidencia (ej. confirmación de contraseña)
  if (validations.matchWith !== undefined && value !== validations.matchWith) {
    return errorMessages.passwordsMatch;
  }

  // Validación de URL
  if (validations.url && value && !isValidUrl(value)) {
    return errorMessages.url;
  }

  // Si pasa todas las validaciones
  return null;
};
