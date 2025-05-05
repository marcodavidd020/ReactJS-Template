import React, { ReactNode } from "react";

interface TableEmptyProps {
  colSpan: number;
  message?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Componente para mostrar cuando no hay datos en la tabla
 */
const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = "No hay elementos para mostrar",
  className = "",
  children,
}) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={`px-6 py-10 text-center text-gray-400 ${className}`}
      >
        {children || message}
      </td>
    </tr>
  );
};

export default TableEmpty;
