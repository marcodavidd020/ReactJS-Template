import { useEffect } from "react";
import useUserStore from "../store/userStore";

/**
 * Hook para acceder a los datos y funcionalidades de usuario
 * Encapsula la lógica de acceso al store y proporciona funciones útiles
 */
export const useUser = () => {
  const {
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserProfile,
    updateUserProfile,
    clearError,
  } = useUserStore();

  // Cargar el perfil del usuario al montar el componente
  useEffect(() => {
    if (!currentUser && !isLoading) {
      fetchUserProfile();
    }
  }, [currentUser, isLoading, fetchUserProfile]);

  /**
   * Encuentra un usuario por su ID
   */
  const findUserById = (userId: string) => {
    return users.find((user) => user.id === userId) || null;
  };

  /**
   * Obtiene los usuarios que coinciden con un término de búsqueda
   */
  const searchUsers = (searchTerm: string) => {
    if (!searchTerm.trim()) return users;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return users.filter(
      (user) =>
        user.email.toLowerCase().includes(lowerCaseSearch) ||
        user.fullName.toLowerCase().includes(lowerCaseSearch)
    );
  };

  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  const hasRole = (role: string) => {
    return currentUser?.roles.includes(role);
  };

  return {
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserProfile,
    updateUserProfile,
    clearError,
    findUserById,
    searchUsers,
    hasRole,
  };
};
