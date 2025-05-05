import React from "react";
import { UserProfile } from "../types/userTypes";

interface ProfileInfoProps {
  user: UserProfile;
}

/**
 * Componente que muestra la información del perfil de usuario
 */
const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  // Generar nombre completo desde firstName y lastName
  const fullName = user.displayName || `${user.firstName} ${user.lastName}`;

  return (
    <div className="space-y-4">
      {/* Información básica */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Nombre</h3>
          <p className="mt-1 text-sm text-white">{fullName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400">
            Correo electrónico
          </h3>
          <p className="mt-1 text-sm text-white">{user.email}</p>
        </div>
      </div>

      {/* Rol de usuario */}
      <div>
        <h3 className="text-sm font-medium text-gray-400">Rol</h3>
        {/* <p className="mt-1 text-sm text-white capitalize">{user.role}</p> */}
        <p className="mt-1 text-sm text-white capitalize">
          {user.roles.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
