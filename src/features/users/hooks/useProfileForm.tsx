import { useState, useEffect } from "react";
import { UpdateProfileRequest } from "../types/userTypes";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  bio?: string;
  phoneNumber?: string | null;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

/**
 * Hook personalizado para el formulario de edición de perfil
 */
export const useProfileForm = (
  initialData: ProfileFormData,
  onSubmit: (data: UpdateProfileRequest) => Promise<void>
) => {
  // Estados para cada campo del formulario
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

  // Manejar cambios en los campos (podría expandirse para manejar todos los tipos de inputs)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "github":
        setGithub(value);
        break;
      case "linkedin":
        setLinkedin(value);
        break;
      case "website":
        setWebsite(value);
        break;
    }
  };

  // Enviar el formulario
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
      return true;
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values: {
      firstName,
      lastName,
      bio,
      phoneNumber,
      github,
      linkedin,
      website,
    },
    handlers: {
      setFirstName,
      setLastName,
      setBio,
      setPhoneNumber,
      setGithub,
      setLinkedin,
      setWebsite,
      handleChange,
    },
    isSubmitting,
    handleSubmit,
  };
};

export default useProfileForm;
