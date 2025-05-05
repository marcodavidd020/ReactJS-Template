import React from "react";
import ProfileField from "../../../common/components/ProfileField";
import SocialLink from "../../../common/components/SocialLink";
import { User } from "../types/userTypes";

interface ProfileInfoProps {
  user: User;
}

/**
 * Componente para visualizar la información del perfil
 */
const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  return (
    <div>
      <ProfileField label="Nombre completo" value={user.fullName} />
      <ProfileField label="Email" value={user.email} />
      <ProfileField label="Teléfono" value={user.phoneNumber} />
      <ProfileField label="Biografía" value={user.bio} />

      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-lg font-medium text-white mb-3">Enlaces</h3>
        <div className="space-y-2">
          <SocialLink url={user.socialLinks?.github} label="GitHub" />
          <SocialLink url={user.socialLinks?.linkedin} label="LinkedIn" />
          <SocialLink url={user.socialLinks?.website} label="Sitio web" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
