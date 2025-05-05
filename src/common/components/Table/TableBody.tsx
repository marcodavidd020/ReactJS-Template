import React, { ReactNode, useContext, useEffect } from "react";
import { TableContext, TableContextProps } from "./TableContext";

interface TableBodyProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Componente para el cuerpo de la tabla
 */
const TableBody: React.FC<TableBodyProps> = ({
  children,
  className = "",
}) => {
  const { resetRowCount } = useContext<TableContextProps>(TableContext);
  
  // Resetear el contador de filas cuando el componente se monta
  useEffect(() => {
    resetRowCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar al montar el componente

  return (
    <tbody
      className={`
      bg-gray-800 divide-y divide-gray-700
      ${className}
    `}
    >
      {children}
    </tbody>
  );
};

export default TableBody;
