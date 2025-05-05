import { useState, useEffect } from "react";
import {
  CreateUserData,
  UserUpdateData,
  UserProfile,
} from "../types/userTypes";
import useUsersStore from "../store/usersStore";

type FormType = "create" | "update";

/**
 * Hook para manejar formularios de usuario (creación o actualización)
 */
export const useUserForm = (type: FormType, initialData?: UserProfile) => {
  // Estado para el formulario
  const [formData, setFormData] = useState<Partial<CreateUserData>>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    avatar: "",
  });

  // Estado para los roles seleccionados
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["user"]);

  // Estado para controlar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtener funciones del store
  const { createUser, updateUser, isLoading, error, fieldErrors, clearError } =
    useUsersStore();

  // Cargar datos iniciales si los hay
  useEffect(() => {
    if (type === "update" && initialData) {
      setFormData({
        email: initialData.email || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        avatar: initialData.avatar || "",
      });

      if (initialData.roles && initialData.roles.length > 0) {
        setSelectedRoles(initialData.roles);
      }
    }
  }, [type, initialData]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en los checkboxes de roles
  const handleRolesChange = (roles: string[]) => {
    setSelectedRoles(roles);
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === "create") {
        await createUser({
          ...(formData as CreateUserData),
          roles: selectedRoles,
        });
      } else if (type === "update" && initialData?.id) {
        await updateUser(initialData.id, {
          ...(formData as UserUpdateData),
        });
      }

      setIsSubmitting(false);
      return true; // Éxito
    } catch (error) {
      setIsSubmitting(false);
      return false; // Error
    }
  };

  return {
    formData,
    selectedRoles,
    isSubmitting,
    isLoading,
    error,
    fieldErrors,
    clearError,
    handleChange,
    handleRolesChange,
    handleSubmit,
  };
};

export default useUserForm;
