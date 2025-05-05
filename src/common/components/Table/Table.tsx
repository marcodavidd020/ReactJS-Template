import React, { ReactNode } from "react";
import { TableProvider } from "./TableContext";

interface TableProps {
  children: ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
  responsive?: boolean;
  compact?: boolean;
}

/**
 * Componente de tabla reutilizable
 */
const Table: React.FC<TableProps> = ({
  children,
  className = "",
  striped = true,
  hover = true,
  responsive = true,
  compact = false,
}) => {
  return (
    <div className={`${responsive ? "overflow-x-auto" : ""} ${className}`}>
      <TableProvider striped={striped} hover={hover}>
        <table
          className={`
            min-w-full divide-y divide-gray-700
            ${compact ? "text-sm" : ""}
          `}
        >
          {children}
        </table>
      </TableProvider>
    </div>
  );
};

export default Table;
