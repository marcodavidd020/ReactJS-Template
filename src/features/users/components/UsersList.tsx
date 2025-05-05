import React from "react";
import { UserProfile } from "../types/userTypes";
import UserAvatar from "../../../common/components/UserAvatar";
import RoleBadge from "../../../common/components/RoleBadge";
import Pagination from "../../../common/components/Pagination";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  TableEmpty,
  TableActions,
} from "../../../common/components/Table";

interface UsersListProps {
  users: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onEditUser: (userId: string) => void;
  onDeleteUser: (user: UserProfile) => void;
}

/**
 * Componente principal para mostrar la lista de usuarios
 */
const UsersList: React.FC<UsersListProps> = ({
  users,
  pagination,
  onPageChange,
  onEditUser,
  onDeleteUser,
}) => {
  if (users.length === 0) {
    return (
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>Usuario</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Roles</TableHeadCell>
            <TableHeadCell>Estado</TableHeadCell>
            <TableHeadCell align="right">Acciones</TableHeadCell>
          </tr>
        </TableHead>
        <TableBody>
          <TableEmpty colSpan={5} />
        </TableBody>
      </Table>
    );
  }

  return (
    <div>
      <Table striped hover>
        <TableHead>
          <tr>
            <TableHeadCell>Usuario</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Roles</TableHeadCell>
            <TableHeadCell>Estado</TableHeadCell>
            <TableHeadCell align="right">Acciones</TableHeadCell>
          </tr>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <UserAvatar
                      firstName={user.firstName}
                      lastName={user.lastName}
                      avatarUrl={user.avatar}
                      size="sm"
                    />
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
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-300">{user.email}</div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role) => (
                    <RoleBadge key={role} role={role} />
                  ))}
                </div>
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell align="right">
                <TableActions
                  actions={[
                    {
                      label: "Editar",
                      onClick: () => onEditUser(user.id),
                      color: "blue",
                    },
                    {
                      label: "Eliminar",
                      onClick: () => onDeleteUser(user),
                      color: "red",
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
