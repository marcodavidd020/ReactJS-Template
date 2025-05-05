import React, { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  withBorder?: boolean;
}

/**
 * Componente para los botones de acción de un formulario
 */
const FormActions: React.FC<FormActionsProps> = ({
  children,
  className = "",
  align = "right",
  withBorder = true,
}) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      className={`
        flex gap-3 pt-4 ${alignmentClasses[align]}
        ${withBorder ? "border-t border-gray-700" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default FormActions;
