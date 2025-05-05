import React from "react";
import Input from "../../../common/components/Input";
import Modal, { ModalFooter } from "../../../common/components/Modal";
import CheckboxGroup from "../../../common/components/CheckboxGroup";
import { Form, FormField, FormRow } from "../../../common/components/Form";
import { UserRole } from "../types/userTypes";
import useUserForm from "../hooks/useUserForm";

interface UserCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente de modal para crear un nuevo usuario
 */
const UserCreateForm: React.FC<UserCreateFormProps> = ({ isOpen, onClose }) => {
  const {
    formData,
    selectedRoles,
    isLoading,
    error,
    fieldErrors,
    handleChange,
    handleRolesChange,
    handleSubmit,
  } = useUserForm("create");

  // Cuando el formulario se envía correctamente
  const onFormSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) onClose();
  };

  // Crear opciones de roles para el CheckboxGroup
  const roleOptions = Object.values(UserRole).map((role) => ({
    value: role,
    label: role,
  }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Añadir Nuevo Usuario"
      footer={
        <ModalFooter
          onCancel={onClose}
          formId="create-user-form"
          cancelText="Cancelar"
          confirmText="Crear Usuario"
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
      <Form id="create-user-form" onSubmit={onFormSubmit}>
        <FormField
          label="Correo Electrónico"
          name="email"
          error={fieldErrors?.email}
          required
        >
          <Input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </FormField>

        <FormRow cols={2}>
          <FormField
            label="Nombre"
            name="firstName"
            error={fieldErrors?.firstName}
            required
          >
            <Input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
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
              value={formData.lastName || ""}
              onChange={handleChange}
              placeholder="Pérez"
              required
            />
          </FormField>
        </FormRow>

        <FormField
          label="Contraseña"
          name="password"
          error={fieldErrors?.password}
          required
        >
          <Input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </FormField>

        <FormField
          label="URL del Avatar"
          name="avatar"
          error={fieldErrors?.avatar}
        >
          <Input
            type="url"
            name="avatar"
            value={formData.avatar || ""}
            onChange={handleChange}
            placeholder="https://ejemplo.com/avatar.jpg"
          />
        </FormField>

        {/* Selección de roles */}
        <FormField
          label="Roles"
          name="roles"
          error={fieldErrors?.roles}
          required
        >
          <CheckboxGroup
            options={roleOptions}
            selected={selectedRoles}
            onChange={handleRolesChange}
          />
        </FormField>
      </Form>
    </Modal>
  );
};

export default UserCreateForm;
