import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES, ROUTES } from "../../../config/constants";
import useAuthStore from "../store/authStore";
import { LoginCredentials } from "../types";

/**
 * Hook personalizado para manejar la lógica del formulario de login
 */
export const useLoginForm = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError, fieldErrors } = useAuthStore();
  const formSubmittedRef = useRef(false);

  // Estado local para los campos del formulario
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  // Estado local para validación
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Efecto para sincronizar errores de campo del store global con el estado local
  useEffect(() => {
    if (fieldErrors && Object.keys(fieldErrors).length > 0) {
      setValidationErrors((prev) => ({
        ...prev,
        ...fieldErrors,
      }));
    }
  }, [fieldErrors]);

  // Manejar cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    // Solo limpiar errores específicos para este campo
    // pero mantener otros errores activos
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Limpiar error global solo si estamos modificando un campo
    // y se había enviado el formulario anteriormente
    if (error && formSubmittedRef.current) {
      clearError();
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    // Validar email
    if (!credentials.email) {
      errors.email = ERROR_MESSAGES.required;
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = ERROR_MESSAGES.invalidEmail;
    }

    // Validar contraseña
    if (!credentials.password) {
      errors.password = ERROR_MESSAGES.required;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    formSubmittedRef.current = true;

    if (!validateForm()) {
      return;
    }

    try {
      await login(credentials);
      navigate(ROUTES.dashboard);
    } catch (err) {
      // Los errores ya están manejados en el store y se mostrarán en la UI
      console.error("Error de inicio de sesión:", err);
    }
  };

  // Manejar opciones de login social
  const handleSocialLogin = (provider: string) => {
    // Implementación futura para login social
    console.log(`Iniciar sesión con ${provider}`);
  };

  return {
    credentials,
    isLoading,
    error,
    validationErrors,
    handleChange,
    handleSubmit,
    handleSocialLogin,
  };
};

export default useLoginForm;
