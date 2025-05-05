import React from "react";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

/**
 * Componente para mostrar avatar del usuario con sus iniciales
 */
const UserAvatar: React.FC<UserAvatarProps> = ({
  firstName,
  lastName,
  size = "md",
  onClick,
}) => {
  // Determinar el tamaño del avatar
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-24 h-24 text-2xl",
  };

  // Obtener iniciales del usuario
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

  return (
    <div
      className={`${
        sizeClasses[size]
      } rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-bold ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
