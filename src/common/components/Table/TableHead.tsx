import React, { ReactNode } from "react";

interface TableHeadProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Componente para el encabezado de la tabla
 */
const TableHead: React.FC<TableHeadProps> = ({ children, className = "" }) => {
  return <thead className={`bg-gray-800 ${className}`}>{children}</thead>;
};

export default TableHead;
