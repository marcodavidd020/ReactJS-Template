import React, { useState, useEffect } from "react";
import Button from "../../../common/components/Button";
import Input from "../../../common/components/Input";
import { UpdateProfileRequest } from "../types/userTypes";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializar el formulario con los datos
  useEffect(() => {
    setFirstName(initialData.firstName || "");
    setLastName(initialData.lastName || "");
    setBio(initialData.bio || "");
    setPhoneNumber(initialData.phoneNumber || "");
    setGithub(initialData.socialLinks?.github || "");
    setLinkedin(initialData.socialLinks?.linkedin || "");
    setWebsite(initialData.socialLinks?.website || "");
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        firstName,
        lastName,
        bio,
        phoneNumber: phoneNumber || undefined,
        socialLinks: {
          github,
          linkedin,
          website,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <Input
          label="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      <Input
        label="Teléfono"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Opcional"
        disabled={isSubmitting}
      />

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Biografía
        </label>
        <textarea
          className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-3">Enlaces</h3>
        <div className="space-y-3">
          <Input
            label="GitHub"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/username"
            disabled={isSubmitting}
          />
          <Input
            label="LinkedIn"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            disabled={isSubmitting}
          />
          <Input
            label="Sitio web"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://ejemplo.com"
            disabled={isSubmitting}
          />
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
