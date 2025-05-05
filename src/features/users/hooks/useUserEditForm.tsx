import { useState, useEffect } from "react";
import { UserUpdateData } from "../types/userTypes";
import useUsersStore from "../store/usersStore";

/**
 * Hook personalizado para manejar la edición de usuarios
 */
const useUserEditForm = (userId: string, isOpen: boolean, onClose: () => void) => {
  const {
    fetchUserById,
    updateUser,
    currentUser,
    isLoading,
    error,
    fieldErrors,
    clearError,
  } = useUsersStore();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState<UserUpdateData>({
    firstName: "",
    lastName: "",
    email: "",
    isActive: true,
    roles: [],
  });

  // Roles disponibles en el sistema
  const availableRoles = ["admin", "user", "editor"];

  // Cargar datos del usuario cuando se abre el modal
  useEffect(() => {
    if (isOpen && userId) {
      fetchUserById(userId);
    }
  }, [isOpen, userId, fetchUserById]);

  // Actualizar el formulario cuando se carga el usuario desde el store
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        isActive: currentUser.isActive,
        roles: [...currentUser.roles],
      });
    }
  }, [currentUser]);

  // Limpiar errores al cerrar el modal
  useEffect(() => {
    if (!isOpen) {
      clearError();
    }
  }, [isOpen, clearError]);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Para inputs checkbox, usar el valor de checked
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Manejar cambios en los checkboxes de roles
  const handleRoleToggle = (role: string) => {
    setFormData((prev) => {
      const roles = [...(prev.roles || [])];
      const index = roles.indexOf(role);

      if (index === -1) {
        roles.push(role);
      } else {
        roles.splice(index, 1);
      }

      return {
        ...prev,
        roles,
      };
    });
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    try {
      await updateUser(userId, formData);
      onClose();
      return true;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return false;
    }
  };

  return {
    formData,
    isLoading,
    error,
    fieldErrors,
    availableRoles,
    handleInputChange,
    handleRoleToggle,
    handleSubmit,
  };
};

export default useUserEditForm; 