import React from "react";
import Card from "../../../common/components/Card";
import RoleBadge from "../../../common/components/RoleBadge";
import UserAvatar from "../../../common/components/UserAvatar";
import { User } from "../types/userTypes";

interface ProfileSidebarProps {
  user: User;
}

/**
 * Componente lateral del perfil con resumen
 */
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user }) => {
  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <UserAvatar
          firstName={user.firstName}
          lastName={user.lastName}
          size="lg"
        />

        <h3 className="text-xl font-semibold text-white mt-4">
          {user.fullName}
        </h3>
        <p className="text-gray-400 mt-1">{user.email}</p>

        {user.roles.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-500 text-sm mb-2">Roles</p>
            <div className="flex flex-wrap justify-center gap-2">
              {user.roles.map((role) => (
                <RoleBadge key={role} role={role} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileSidebar;
