import React from 'react';

interface SocialLinkProps {
  url?: string;
  label: string;
}

/**
 * Componente para mostrar enlaces sociales
 */
const SocialLink: React.FC<SocialLinkProps> = ({ url, label }) => {
  if (!url) return null;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-400 hover:text-blue-300"
    >
      {label}
    </a>
  );
};

export default SocialLink; 