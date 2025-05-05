import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fullPage?: boolean;
}

/**
 * Componente de spinner para indicar carga
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'purple-500',
  fullPage = false
}) => {
  // Configurar clases según el tamaño
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4'
  };
  
  const spinner = (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-t-${color} border-${color}/25`}></div>
  );
  
  // Si es de página completa, centrar en el contenedor
  if (fullPage) {
    return (
      <div className="flex justify-center items-center h-64">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner; 