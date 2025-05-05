import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { UserProfile, UserUpdateData } from "../types/userTypes";
import { userService } from "../services/userService";
import { ValidationError } from "../../../core/api/types/errors";
import { PaginatedResponse } from "../../../core/api/types/responses";

interface UsersState {
  // Estado
  users: UserProfile[];
  currentUser: UserProfile | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;

  // Acciones
  fetchUsers: (page?: number, limit?: number) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  getProfile: () => Promise<void>;
  updateUser: (id: string, data: UserUpdateData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Store global para la gestión de usuarios
 */
const useUsersStore = create<UsersState>()(
  immer((set) => ({
    // Estado inicial
    users: [],
    currentUser: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    isLoading: false,
    error: null,
    fieldErrors: null,

    // Acción: Obtener usuarios con paginación
    fetchUsers: async (page = 1, limit = 10) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const response: PaginatedResponse<UserProfile> =
          await userService.getUsers(page, limit);

        set({
          users: response.data,
          pagination: {
            page: response.pagination.currentPage,
            limit: response.pagination.pageSize,
            total: response.pagination.totalItems,
            totalPages: response.pagination.totalPages,
          },
          isLoading: false,
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener usuarios",
          fieldErrors: null,
        });
      }
    },

    // Acción: Obtener usuario por ID
    fetchUserById: async (id: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const user = await userService.getUserById(id);

        set((state) => {
          state.currentUser = user;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Error al obtener usuario",
          fieldErrors: null,
        });
      }
    },

    // Acción: Obtener perfil del usuario actual
    getProfile: async () => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const profile = await userService.getProfile();

        set((state) => {
          state.currentUser = profile;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener perfil de usuario",
          fieldErrors: null,
        });
      }
    },

    // Acción: Actualizar usuario
    updateUser: async (id: string, data: UserUpdateData) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        const updatedUser = await userService.updateUser(id, data);

        set((state) => {
          state.currentUser = updatedUser;

          // Actualizar usuario en la lista si existe
          const index = state.users.findIndex((user) => user.id === id);
          if (index !== -1) {
            state.users[index] = updatedUser;
          }

          state.isLoading = false;
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          set({
            isLoading: false,
            error: error.message,
            fieldErrors: error.fieldErrors || null,
          });
        } else {
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Error al actualizar usuario",
            fieldErrors: null,
          });
        }
      }
    },

    // Acción: Eliminar usuario
    deleteUser: async (id: string) => {
      try {
        set({ isLoading: true, error: null, fieldErrors: null });

        await userService.deleteUser(id);

        set((state) => {
          // Eliminar usuario de la lista
          state.users = state.users.filter((user) => user.id !== id);

          // Si el usuario actual es el eliminado, limpiarlo
          if (state.currentUser && state.currentUser.id === id) {
            state.currentUser = null;
          }

          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al eliminar usuario",
          fieldErrors: null,
        });
      }
    },

    // Acción: Limpiar errores
    clearError: () => set({ error: null, fieldErrors: null }),
  }))
);

export default useUsersStore;
