import React, { ReactNode } from "react";

interface TableHeadCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
  onSort?: () => void;
}

/**
 * Componente para las celdas del encabezado de la tabla
 */
const TableHeadCell: React.FC<TableHeadCellProps> = ({
  children,
  className = "",
  align = "left",
  sortable = false,
  sorted = null,
  onSort,
}) => {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const isClickable = sortable && onSort;

  // Iconos de ordenamiento
  const renderSortIcon = () => {
    if (!sortable) return null;

    if (sorted === "asc") {
      return <span className="ml-1">↑</span>;
    } else if (sorted === "desc") {
      return <span className="ml-1">↓</span>;
    } else {
      return <span className="ml-1 opacity-30">↕</span>;
    }
  };

  return (
    <th
      className={`
        px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider
        ${alignClass[align]}
        ${isClickable ? "cursor-pointer hover:text-gray-300" : ""}
        ${className}
      `}
      onClick={isClickable ? onSort : undefined}
    >
      <div className="flex items-center">
        <span>{children}</span>
        {renderSortIcon()}
      </div>
    </th>
  );
};

export default TableHeadCell;
