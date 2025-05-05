import React from "react";
import Button from "../../../common/components/Button";
import Input from "../../../common/components/Input";
import { FormField } from "../../../common/components/Form";
import { UpdateProfileRequest } from "../types/userTypes";
import useProfileForm from "../hooks/useProfileForm";

interface ProfileFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    bio?: string;
    phoneNumber?: string | null;
    socialLinks?: {
      github?: string;
      linkedin?: string;
      website?: string;
    };
  };
  onSubmit: (data: UpdateProfileRequest) => Promise<void>;
  onCancel: () => void;
}

/**
 * Formulario para editar perfil de usuario
 */
const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const { values, handlers, isSubmitting, handleSubmit } = useProfileForm(
    initialData,
    onSubmit
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nombre" name="firstName" required>
          <Input
            name="firstName"
            value={values.firstName}
            onChange={handlers.handleChange}
            required
            disabled={isSubmitting}
          />
        </FormField>

        <FormField label="Apellido" name="lastName" required>
          <Input
            name="lastName"
            value={values.lastName}
            onChange={handlers.handleChange}
            required
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      <FormField label="Teléfono" name="phoneNumber">
        <Input
          name="phoneNumber"
          value={values.phoneNumber || ""}
          onChange={handlers.handleChange}
          placeholder="Opcional"
          disabled={isSubmitting}
        />
      </FormField>

      <FormField label="Biografía" name="bio">
        <textarea
          name="bio"
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          rows={4}
          value={values.bio}
          onChange={handlers.handleChange}
          disabled={isSubmitting}
        />
      </FormField>

      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-3">Enlaces</h3>
        <div className="space-y-3">
          <FormField label="GitHub" name="github">
            <Input
              name="github"
              value={values.github}
              onChange={handlers.handleChange}
              placeholder="https://github.com/username"
              disabled={isSubmitting}
            />
          </FormField>

          <FormField label="LinkedIn" name="linkedin">
            <Input
              name="linkedin"
              value={values.linkedin}
              onChange={handlers.handleChange}
              placeholder="https://linkedin.com/in/username"
              disabled={isSubmitting}
            />
          </FormField>

          <FormField label="Sitio web" name="website">
            <Input
              name="website"
              value={values.website}
              onChange={handlers.handleChange}
              placeholder="https://ejemplo.com"
              disabled={isSubmitting}
            />
          </FormField>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" size="sm" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
