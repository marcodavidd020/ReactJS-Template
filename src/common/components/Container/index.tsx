import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  as?: React.ElementType;
}

/**
 * Componente Container responsivo para limitar el ancho del contenido
 */
const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  fluid = false,
  as: Component = "div",
}) => {
  const baseClasses = "mx-auto px-4 sm:px-6 lg:px-8";
  const widthClass = fluid ? "w-full" : "max-w-7xl";

  return (
    <Component className={`${baseClasses} ${widthClass} ${className}`}>
      {children}
    </Component>
  );
};

export default Container;
