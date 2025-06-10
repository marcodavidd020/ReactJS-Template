import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'red' | 'yellow';
  fullPage?: boolean;
  className?: string;
}

/**
 * Componente de spinner para indicar carga con animación suave
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'blue',
  fullPage = false,
  className = ''
}) => {
  // Configurar clases según el tamaño
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  // Configurar colores
  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500'
  };
  
  const spinner = (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          animate-spin 
          rounded-full 
          border-4 
          border-gray-600 
          ${colorClasses[color]} 
          border-t-transparent
        `}
      ></div>
    </div>
  );
  
  // Si es de página completa, centrar en el contenedor
  if (fullPage) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default LoadingSpinner; 