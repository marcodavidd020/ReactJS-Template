import React, { useState } from "react";
import useUsersStore from "../store/usersStore";
import Input from "../../../common/components/Input";
import Button from "../../../common/components/Button";
import { CreateUserData } from "../types/userTypes";
import { UserRole } from "../types/userTypes";

interface UserCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Componente de modal para crear un nuevo usuario
 */
const UserCreateForm: React.FC<UserCreateFormProps> = ({ isOpen, onClose }) => {
  // Estado para el formulario
  const [formData, setFormData] = useState<Omit<CreateUserData, "roles">>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    avatar: "",
  });

  // Estado para los roles seleccionados
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["user"]);

  // Obtener la función para crear usuarios del store
  const { createUser, isLoading, error, fieldErrors } = useUsersStore();

  // Manejar cambios en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar cambios en los checkboxes de roles
  const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      // Si ya está seleccionado, quitarlo (excepto si es el último)
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      // Si no está seleccionado, añadirlo
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUser({
        ...formData,
        roles: selectedRoles,
      });

      // Si todo va bien, cerrar el modal
      onClose();
    } catch (error) {
      // Los errores se manejan en el store
      console.error("Error al crear usuario", error);
    }
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-lg bg-gray-800 p-6 shadow-xl transition-all">
          {/* Título */}
          <h2 className="text-xl font-semibold text-white mb-6">
            Añadir Nuevo Usuario
          </h2>

          {/* Mensaje de error global */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-red-900/30 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Correo Electrónico *"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={fieldErrors?.email}
                placeholder="correo@ejemplo.com"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Nombre *"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={fieldErrors?.firstName}
                  placeholder="Juan"
                  required
                />

                <Input
                  label="Apellido *"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={fieldErrors?.lastName}
                  placeholder="Pérez"
                  required
                />
              </div>

              <Input
                label="Contraseña *"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors?.password}
                placeholder="••••••••"
                required
              />

              <Input
                label="URL del Avatar"
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                error={fieldErrors?.avatar}
                placeholder="https://ejemplo.com/avatar.jpg"
              />

              {/* Selección de roles */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Roles *
                </label>
                <div className="space-y-2">
                  {Object.values(UserRole).map((role) => (
                    <label key={role} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 rounded bg-gray-700 border-gray-600"
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                      />
                      <span className="ml-2 text-gray-300">{role}</span>
                    </label>
                  ))}
                </div>
                {fieldErrors?.roles && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.roles}
                  </p>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="secondary" onClick={onClose} type="button">
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  Crear Usuario
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserCreateForm;
