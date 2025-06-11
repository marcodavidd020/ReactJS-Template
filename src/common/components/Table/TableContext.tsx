import React, { ReactNode, useState, useCallback } from "react";
import { TableContext } from "./context";

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
