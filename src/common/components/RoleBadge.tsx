import React from 'react';

interface RoleBadgeProps {
  role: string;
}

/**
 * Componente para mostrar un badge con el rol del usuario
 */
const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const getColorClasses = () => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
      case 'moderator':
        return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
      case 'editor':
        return 'bg-teal-900/30 text-teal-400 border-teal-500/30';
      case 'user':
        return 'bg-green-900/30 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getColorClasses()}`}>
      {role}
    </span>
  );
};

export default RoleBadge; 