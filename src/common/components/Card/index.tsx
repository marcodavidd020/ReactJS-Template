import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Componente Card reutilizable que sigue el sistema de diseño de la aplicación
 */
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
}) => {
  // Clases base para todos los tipos de tarjeta
  const baseClasses = "rounded-2xl transition-all duration-200";

  // Clases específicas para cada variante
  const variantClasses = {
    default: "bg-gray-800 border border-gray-700",
    outlined: "bg-transparent border border-gray-600",
    elevated: "bg-gray-800 shadow-xl border border-gray-700/50",
  };

  // Clases para el padding
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-7",
  };

  // Combinación de todas las clases
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  return <div className={combinedClasses}>{children}</div>;
};

export default Card;
