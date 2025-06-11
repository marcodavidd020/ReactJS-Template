import React, { useState } from "react";
import { H3 } from "../../../common/components/Typography";
import Pagination from "../../../common/components/Pagination";

const PaginationDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [smallCurrentPage, setSmallCurrentPage] = useState(1);
  const [largeCurrentPage, setLargeCurrentPage] = useState(25);

  return (
    <section className="space-y-6">
      <H3>Componente de Paginación</H3>
      
      <div className="space-y-8">
        {/* Paginación básica */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Paginación Básica (10 páginas)</h4>
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </div>
          <p className="text-center text-gray-400 mt-4">
            Página actual: {currentPage} de 10
          </p>
        </div>

        {/* Paginación pequeña */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Paginación Pequeña (3 páginas)</h4>
          <div className="flex justify-center">
            <Pagination
              currentPage={smallCurrentPage}
              totalPages={3}
              onPageChange={setSmallCurrentPage}
            />
          </div>
          <p className="text-center text-gray-400 mt-4">
            Página actual: {smallCurrentPage} de 3
          </p>
        </div>

        {/* Paginación grande */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Paginación Grande (100 páginas)</h4>
          <div className="flex justify-center">
            <Pagination
              currentPage={largeCurrentPage}
              totalPages={100}
              onPageChange={setLargeCurrentPage}
            />
          </div>
          <p className="text-center text-gray-400 mt-4">
            Página actual: {largeCurrentPage} de 100
          </p>
        </div>

        {/* Información de uso */}
        <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <h5 className="font-semibold text-blue-300 mb-2">💡 Consejos de Uso</h5>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• La paginación se adapta automáticamente al número de páginas</li>
            <li>• Muestra puntos suspensivos cuando hay muchas páginas</li>
            <li>• Incluye botones de "anterior" y "siguiente"</li>
            <li>• Deshabilita automáticamente los botones cuando no se pueden usar</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PaginationDemo; 