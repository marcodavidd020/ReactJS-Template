import React, { ReactNode } from "react";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
}

/**
 * Componente para las celdas de la tabla
 */
const TableCell: React.FC<TableCellProps> = ({
  children,
  className = "",
  align = "left",
  colSpan,
}) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      className={`
        px-6 py-4 whitespace-nowrap
        ${alignClass[align]}
        ${className}
      `}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default TableCell;
