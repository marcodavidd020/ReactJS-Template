import React from "react";
import Button from "../../../common/components/Button";

interface ProfileHeaderProps {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

/**
 * Encabezado del perfil con título y botones de acción
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  title,
  isEditing,
  onEdit,
  onCancel,
}) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>

      {isEditing ? (
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
      ) : (
        <Button type="button" variant="secondary" size="sm" onClick={onEdit}>
          Editar Perfil
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
