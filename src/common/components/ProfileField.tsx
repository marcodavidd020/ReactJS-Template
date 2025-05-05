import React from 'react';

interface ProfileFieldProps {
  label: string;
  value?: string | null;
}

/**
 * Componente para mostrar un campo de información en el perfil
 */
const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => {
  if (!value) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-400">
        {label}
      </h3>
      <p className="text-white mt-1">{value}</p>
    </div>
  );
};

export default ProfileField; 