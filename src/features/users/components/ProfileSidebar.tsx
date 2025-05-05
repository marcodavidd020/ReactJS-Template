import React, { useState } from "react";
import Card from "../../../common/components/Card";
import { UserProfile } from "../types/userTypes";
import UserAvatar from "../../../common/components/UserAvatar";

interface ProfileSidebarProps {
  user: UserProfile;
}

/**
 * Componente de barra lateral para el perfil
 */
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user }) => {
  // Estado para controlar si la imagen del avatar falló al cargar
  const [imageError, setImageError] = useState(false);

  // Generar nombre completo desde firstName y lastName
  const fullName = user.displayName || `${user.firstName} ${user.lastName}`;

  // Manejar error de carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card>
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gray-700 mb-3 overflow-hidden">
          {user.avatar && !imageError ? (
            <img
              src={user.avatar}
              alt={fullName}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <UserAvatar
              firstName={user.firstName}
              lastName={user.lastName}
              size="lg"
            />
          )}
        </div>

        {/* Información básica */}
        <h3 className="text-lg font-medium text-white">{fullName}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
        {/* <p className="text-xs text-gray-500 mt-1 capitalize">{user.role}</p> */}
        <p className="text-xs text-gray-500 mt-1 capitalize">
          {user.roles.join(", ")}
        </p>

        {/* Estado de cuenta */}
        <div className="mt-4 w-full pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">Estado</span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                user.isActive
                  ? "bg-green-900/30 text-green-500"
                  : "bg-red-900/30 text-red-500"
              }`}
            >
              {user.isActive ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSidebar;
