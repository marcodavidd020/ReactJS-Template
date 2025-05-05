import React from "react";
import usePagination from "../hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

/**
 * Componente de paginación reutilizable
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const { pageNumbers, hasPrevious, hasNext, goToPreviousPage, goToNextPage } =
    usePagination({
      currentPage,
      totalPages,
      maxVisiblePages,
    });

  // Si no hay páginas o hay una sola, no mostrar paginación
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-2">
        {/* Botón "Anterior" */}
        <button
          onClick={() => onPageChange(goToPreviousPage(currentPage))}
          disabled={!hasPrevious}
          className={`px-3 py-1 rounded text-sm ${
            !hasPrevious
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          &laquo; Anterior
        </button>

        {/* Números de página */}
        {pageNumbers.map((page, index) =>
          page === null ? (
            // Renderizar "..." como indicador de páginas omitidas
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
              ...
            </span>
          ) : (
            // Renderizar botón de página
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Botón "Siguiente" */}
        <button
          onClick={() => onPageChange(goToNextPage(currentPage))}
          disabled={!hasNext}
          className={`px-3 py-1 rounded text-sm ${
            !hasNext
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Siguiente &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
