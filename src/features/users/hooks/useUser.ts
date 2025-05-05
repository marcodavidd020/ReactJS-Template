import { useEffect } from "react";
import useUsersStore from "../store/usersStore";
import { UserProfile } from "../types/userTypes";

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
    fetchUserById,
    getProfile,
    updateUser,
    clearError,
  } = useUsersStore();

  // Cargar el perfil del usuario al montar el componente
  useEffect(() => {
    if (!currentUser && !isLoading) {
      getProfile();
    }
  }, [currentUser, isLoading, getProfile]);

  /**
   * Encuentra un usuario por su ID
   */
  const findUserById = (userId: string) => {
    return users.find((user: UserProfile) => user.id === userId) || null;
  };

  /**
   * Obtiene los usuarios que coinciden con un término de búsqueda
   */
  const searchUsers = (searchTerm: string) => {
    if (!searchTerm.trim()) return users;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return users.filter(
      (user: UserProfile) =>
        user.email.toLowerCase().includes(lowerCaseSearch) ||
        (user.displayName || `${user.firstName} ${user.lastName}`).toLowerCase().includes(lowerCaseSearch)
    );
  };

  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  const hasRole = (roleName: string) => {
    // return currentUser?.role === roleName;
    return currentUser?.roles.includes(roleName);
  };

  return {
    users,
    currentUser,
    isLoading,
    error,
    fetchUsers,
    fetchUserById,
    getProfile,
    updateProfile: (data: any) => updateUser(currentUser?.id || "", data),
    clearError,
    findUserById,
    searchUsers,
    hasRole,
  };
};

export default useUser;
