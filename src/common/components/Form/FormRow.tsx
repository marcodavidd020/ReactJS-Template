import React, { ReactNode } from "react";

interface FormRowProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

/**
 * Componente para organizar campos de formulario en filas con columnas
 */
const FormRow: React.FC<FormRowProps> = ({
  children,
  cols = 1,
  className = "",
}) => {
  const gridColsClass = {
    1: "",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={`
      ${cols > 1 ? `grid gap-4 ${gridColsClass[cols]}` : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export default FormRow;
