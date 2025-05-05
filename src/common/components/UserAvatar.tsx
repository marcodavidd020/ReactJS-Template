import React, { useState } from "react";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

/**
 * Componente para mostrar avatar del usuario con sus iniciales o imagen
 */
const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName,
  lastName,
  avatarUrl,
  size = "md",
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);

  // Determinar el tamaño del avatar
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-24 h-24 text-2xl",
  };

  // Obtener iniciales del usuario
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

  // Mostrar iniciales si no hay imagen o hubo error al cargarla
  const showInitials = !avatarUrl || imageError;

  return (
    <div
      className={`${
        sizeClasses[size]
      } rounded-full flex items-center justify-center text-white font-bold overflow-hidden ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {!showInitials ? (
        <img
          src={avatarUrl}
          alt={`${firstName} ${lastName}`}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
          {initials}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
