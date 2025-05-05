import React, { useEffect, useState } from "react";
import Container from "../../../common/components/Container";
import Card from "../../../common/components/Card";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import UsersList from "../components/UsersList";
import UserCreateForm from "../components/UserCreateForm";
import useUsersStore from "../store/usersStore";
import Button from "../../../common/components/Button";

/**
 * Página para administración de usuarios
 */
const UsersPage: React.FC = () => {
  // Estado para mostrar/ocultar el modal de creación
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Obtener el estado de usuarios
  const { users, pagination, isLoading, error, fetchUsers, deleteUser } =
    useUsersStore();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manejadores
  const handleAddUser = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.limit);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("¿Está seguro que desea eliminar este usuario?")) {
      await deleteUser(userId);
    }
  };

  // Mostrar estado de carga
  if (isLoading && users.length === 0) {
    return (
      <Container>
        <LoadingSpinner fullPage />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
        <Button onClick={handleAddUser}>Añadir Usuario</Button>
      </div>

      {error && (
        <ErrorMessage message="Error al cargar los usuarios" details={error} />
      )}

      <Card>
        <UsersList
          users={users}
          pagination={pagination}
          onPageChange={handlePageChange}
          onDeleteUser={handleDeleteUser}
        />
      </Card>

      {showCreateModal && (
        <UserCreateForm isOpen={showCreateModal} onClose={handleCloseModal} />
      )}
    </Container>
  );
};

export default UsersPage;
