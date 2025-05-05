import React from "react";
import { UserProfile } from "../types/userTypes";
import UserAvatar from "../../../common/components/UserAvatar";
import RoleBadge from "../../../common/components/RoleBadge";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface UsersListProps {
  users: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onDeleteUser: (userId: string) => void;
}

/**
 * Componente de paginación para la lista de usuarios
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Crear un array con los números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    // Si hay menos páginas que el máximo, mostrar todas
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
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-2">
        {/* Botón "Anterior" */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === 1
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          &laquo; Anterior
        </button>

        {/* Números de página */}
        {getPageNumbers().map((page, index) =>
          page === null ? (
            // Renderizar "..." como indicador de páginas omitidas
            <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-500">
              ...
            </span>
          ) : (
            // Renderizar botón de página
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded text-sm ${
            currentPage === totalPages
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

/**
 * Componente principal para mostrar la lista de usuarios
 */
const UsersList: React.FC<UsersListProps> = ({
  users,
  pagination,
  onPageChange,
  onDeleteUser,
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No hay usuarios para mostrar
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Roles
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                      ) : null}
                      <div className={user.avatar ? "hidden" : ""}>
                        <UserAvatar
                          firstName={user.firstName}
                          lastName={user.lastName}
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-400">
                        Creado: {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <RoleBadge key={role} role={role} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        user.isActive
                          ? "bg-green-900/30 text-green-500"
                          : "bg-red-900/30 text-red-500"
                      }`}
                  >
                    {user.isActive ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-400 hover:text-blue-300 mr-3"
                    onClick={() => (window.location.href = `/users/${user.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => onDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UsersList;
