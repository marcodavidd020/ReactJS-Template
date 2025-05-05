import React, { createContext, ReactNode, useState, useCallback } from "react";

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

interface TableProviderProps {
  children: ReactNode;
  striped?: boolean;
  hover?: boolean;
}

export const TableProvider: React.FC<TableProviderProps> = ({
  children,
  striped = true,
  hover = true,
}) => {
  const [rowCount, setRowCount] = useState(0);

  const incrementRow = useCallback(() => {
    setRowCount((prevCount) => prevCount + 1);
  }, []);

  const resetRowCount = useCallback(() => {
    setRowCount(0);
  }, []);

  const isEven = rowCount % 2 === 0;

  return (
    <TableContext.Provider
      value={{
        striped,
        hover,
        isEven,
        incrementRow,
        resetRowCount,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
