import React, { ReactNode } from "react";

interface Action {
  label: string;
  onClick: () => void;
  color?: "blue" | "green" | "red" | "gray";
  disabled?: boolean;
}

interface TableActionsProps {
  actions: Action[];
  className?: string;
  children?: ReactNode;
}

/**
 * Componente para mostrar botones de acción en una celda de la tabla
 */
const TableActions: React.FC<TableActionsProps> = ({
  actions,
  className = "",
  children,
}) => {
  const getColorClass = (color: Action["color"] = "blue") => {
    const colorClasses = {
      blue: "text-blue-400 hover:text-blue-300",
      green: "text-green-400 hover:text-green-300",
      red: "text-red-400 hover:text-red-300",
      gray: "text-gray-400 hover:text-gray-300",
    };

    return colorClasses[color];
  };

  return (
    <div className={`flex items-center justify-end space-x-3 ${className}`}>
      {children}

      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          disabled={action.disabled}
          className={`
            ${getColorClass(action.color)}
            ${action.disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          type="button"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default TableActions;
