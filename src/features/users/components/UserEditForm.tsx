import React from "react";
import Modal, { ModalFooter } from "../../../common/components/Modal";
import Input from "../../../common/components/Input";
import Form, { FormField } from "../../../common/components/Form";
import useUserEditForm from "../hooks/useUserEditForm";

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
  // Usar el hook personalizado para manejar toda la lógica
  const {
    formData,
    isLoading,
    error,
    fieldErrors,
    availableRoles,
    handleInputChange,
    handleRoleToggle,
    handleSubmit,
  } = useUserEditForm(userId, isOpen, onClose);

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
