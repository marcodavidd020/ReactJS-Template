import { createContext } from "react";

export interface TableContextProps {
  striped: boolean;
  hover: boolean;
  isEven: boolean;
  incrementRow: () => void;
  resetRowCount: () => void;
}

// Valor por defecto del contexto
export const TableContext = createContext<TableContextProps>({
  striped: false,
  hover: false,
  isEven: false,
  incrementRow: () => {},
  resetRowCount: () => {},
}); 