import { useMemo } from "react";

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

interface PaginationResult {
  pageNumbers: (number | null)[];
  hasPrevious: boolean;
  hasNext: boolean;
  goToPage: (page: number) => number;
  goToPreviousPage: (currentPage: number) => number;
  goToNextPage: (currentPage: number) => number;
}

/**
 * Hook para manejar la lógica de paginación
 */
export const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: PaginationConfig): PaginationResult => {
  // Calcular páginas a mostrar
  const pageNumbers = useMemo(() => {
    const pages: (number | null)[] = [];

    // Si hay menos páginas que el máximo visible, mostrar todas
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar primera página, última y las cercanas a la actual
      if (currentPage <= 3) {
        // Si estamos cerca del principio
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(null); // Indicador de "..."
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Si estamos cerca del final
        pages.push(1);
        pages.push(null); // Indicador de "..."
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Si estamos en medio
        pages.push(1);
        pages.push(null); // Indicador de "..."
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(null); // Indicador de "..."
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, maxVisiblePages]);

  // Funciones de navegación
  const goToPage = (page: number) => {
    return Math.min(Math.max(1, page), totalPages);
  };

  const goToPreviousPage = (page: number) => {
    return goToPage(page - 1);
  };

  const goToNextPage = (page: number) => {
    return goToPage(page + 1);
  };

  return {
    pageNumbers,
    hasPrevious: currentPage > 1,
    hasNext: currentPage < totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
};

export default usePagination;
