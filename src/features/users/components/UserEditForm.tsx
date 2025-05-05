import React, { useEffect, useState } from "react";
import Modal, { ModalFooter } from "../../../common/components/Modal";
import Input from "../../../common/components/Input";
import Form, { FormField } from "../../../common/components/Form";
import useUsersStore from "../store/usersStore";
import { UserUpdateData } from "../types/userTypes";

interface UserEditFormProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Formulario para editar usuarios en un modal
 */
const UserEditForm: React.FC<UserEditFormProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const {
    fetchUserById,
    updateUser,
    currentUser,
    isLoading,
    error,
    fieldErrors,
    clearError,
  } = useUsersStore();

  const [formData, setFormData] = useState<UserUpdateData>({
    firstName: "",
    lastName: "",
    email: "",
    isActive: true,
    roles: [],
  });

  // Cargar datos del usuario al abrir el modal
  useEffect(() => {
    if (isOpen && userId) {
      fetchUserById(userId);
    }
  }, [isOpen, userId, fetchUserById]);

  // Actualizar el formulario cuando se carga el usuario
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    try {
      await updateUser(userId, formData);
      onClose();
    } catch (error) {
      // Error ya manejado por el store
      console.error("Error al actualizar usuario:", error);
    }
  };

  // Lista de roles disponibles
  const availableRoles = ["admin", "user", "editor"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Usuario"
      size="lg"
      footer={
        <ModalFooter
          onCancel={onClose}
          formId="edit-user-form"
          cancelText="Cancelar"
          confirmText="Guardar Cambios"
          isLoading={isLoading}
        />
      }
    >
      {/* Mensaje de error global */}
      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Formulario */}
      <Form id="edit-user-form" onSubmit={handleSubmit}>
        <FormField
          label="Nombre"
          name="firstName"
          error={fieldErrors?.firstName}
          required
        >
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Juan"
            required
          />
        </FormField>

        <FormField
          label="Apellido"
          name="lastName"
          error={fieldErrors?.lastName}
          required
        >
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Pérez"
            required
          />
        </FormField>

        <FormField
          label="Email"
          name="email"
          error={fieldErrors?.email}
          required
        >
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </FormField>

        {/* Estado */}
        <div className="mb-4">
          <label className="flex items-center text-gray-300">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="mr-2 rounded text-blue-600 focus:ring-blue-500"
            />
            Usuario activo
          </label>
        </div>

        {/* Roles */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Roles</label>
          <div className="space-y-2">
            {availableRoles.map((role) => (
              <label key={role} className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.roles?.includes(role) || false}
                  onChange={() => handleRoleToggle(role)}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
          {fieldErrors?.roles && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.roles}</p>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default UserEditForm;
