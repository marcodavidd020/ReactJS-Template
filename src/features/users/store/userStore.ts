import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { userApi } from "../api/userApi";
import { User, UpdateProfileRequest } from "../types/userTypes";
import { userMapper } from "../mappers/userMapper";

interface UserState {
  // Estado
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;

  // Acciones
  fetchUsers: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  updateUserProfile: (
    profileData: Partial<UpdateProfileRequest>
  ) => Promise<void>;
  clearError: () => void;
}

/**
 * Store global para la gestión de usuarios
 */
const useUserStore = create<UserState>()(
  immer((set) => ({
    // Estado inicial
    users: [],
    currentUser: null,
    isLoading: false,
    error: null,

    // Acciones
    fetchUsers: async () => {
      try {
        set({ isLoading: true, error: null });
        const usersDTO = await userApi.getUsers();
        const users = usersDTO.map(userMapper.toDomain);

        set((state) => {
          state.users = users;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener usuarios",
        });
      }
    },

    fetchUserProfile: async () => {
      try {
        set({ isLoading: true, error: null });
        const userDTO = await userApi.getUserProfile();
        const user = userMapper.toDomain(userDTO);

        set((state) => {
          state.currentUser = user;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al obtener perfil de usuario",
        });
      }
    },

    updateUserProfile: async (profileData) => {
      try {
        set({ isLoading: true, error: null });

        const updatedUserDTO = await userApi.updateUserProfile(profileData);
        const updatedUser = userMapper.toDomain(updatedUserDTO);

        set((state) => {
          state.currentUser = updatedUser;
          state.isLoading = false;
        });
      } catch (error) {
        set({
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Error al actualizar perfil",
        });
      }
    },

    clearError: () => set({ error: null }),
  }))
);

export default useUserStore;
