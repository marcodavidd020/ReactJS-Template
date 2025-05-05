import React, { ReactNode, useContext, useEffect } from "react";
import { TableContext, TableContextProps } from "./TableContext";

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
  disabled?: boolean;
  hover?: boolean;
}

/**
 * Componente para las filas de la tabla
 */
const TableRow: React.FC<TableRowProps> = ({
  children,
  className = "",
  onClick,
  isSelected = false,
  disabled = false,
  hover,
}) => {
  const tableContext = useContext<TableContextProps>(TableContext);
  const isClickable = onClick && !disabled;
  const shouldHover = hover !== undefined ? hover : tableContext.hover;
  
  // Incrementar el contador de filas cuando el componente se monta
  useEffect(() => {
    tableContext.incrementRow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar al montar el componente
  
  // Determinar si aplica el efecto striped
  const stripedClass = tableContext.striped && tableContext.isEven ? "bg-gray-800/40" : "";

  return (
    <tr
      className={`
        ${isClickable ? "cursor-pointer" : ""}
        ${isClickable && shouldHover ? "hover:bg-gray-750" : ""}
        ${shouldHover ? "hover:bg-gray-750/30" : ""}
        ${isSelected ? "bg-blue-900/20" : ""}
        ${disabled ? "opacity-60" : ""}
        ${stripedClass}
        ${className}
      `}
      onClick={isClickable ? onClick : undefined}
    >
      {children}
    </tr>
  );
};

export default TableRow;
