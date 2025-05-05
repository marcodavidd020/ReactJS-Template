import React from 'react';

interface RoleBadgeProps {
  role: string;
}

/**
 * Componente para mostrar un rol de usuario como badge
 */
const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  return (
    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300">
      {role}
    </span>
  );
};

export default RoleBadge; 