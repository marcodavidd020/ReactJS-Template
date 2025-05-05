import React, { useEffect, useState } from "react";
import Container from "../../../common/components/Container";
import Card from "../../../common/components/Card";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import UsersList from "../components/UsersList";
import UserCreateForm from "../components/UserCreateForm";
import UserEditForm from "../components/UserEditForm";
import DeleteUserModal from "../components/DeleteUserModal";
import UserSearch from "../components/UserSearch";
import useUsersStore from "../store/usersStore";
import Button from "../../../common/components/Button";
import { UserProfile } from "../types/userTypes";

/**
 * Página para administración de usuarios
 */
const UsersPage: React.FC = () => {
  // Estados para modales
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);

  // Obtener el estado de usuarios
  const { users, pagination, isLoading, error, fetchUsers, searchUsers, deleteUser } =
    useUsersStore();

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manejadores
  const handleAddUser = () => {
    setShowCreateModal(true);
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowEditModal(true);
  };

  const handleDeleteUserClick = (user: UserProfile) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedUserId("");
    setUserToDelete(null);
  };

  const handleSearch = (term: string) => {
    searchUsers(term, 1, pagination.limit);
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page, pagination.limit);
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

      {/* Buscador */}
      <div className="mb-4">
        <UserSearch onSearch={handleSearch} />
      </div>

      <Card>
        <UsersList
          users={users}
          pagination={pagination}
          onPageChange={handlePageChange}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUserClick}
        />
      </Card>

      {/* Modales */}
      {showCreateModal && (
        <UserCreateForm isOpen={showCreateModal} onClose={handleCloseModals} />
      )}

      {showEditModal && selectedUserId && (
        <UserEditForm
          userId={selectedUserId}
          isOpen={showEditModal}
          onClose={handleCloseModals}
        />
      )}

      <DeleteUserModal
        user={userToDelete}
        isOpen={showDeleteModal}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default UsersPage;
