import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { AuthState, LoginCredentials, RegisterData } from "../types";
import authApi from "../api/authApi";

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Store de autenticación usando Zustand con immer para actualizaciones inmutables
// y persist para mantener el estado entre recargas
const useAuthStore = create<AuthState & AuthActions>()(
  immer(
    persist(
      (set) => ({
        // Estado inicial
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,

        // Acción: Iniciar sesión
        login: async (credentials: LoginCredentials) => {
          try {
            set({ isLoading: true, error: null });

            // Obtener el token
            await authApi.login(credentials);
            
            // Obtener el perfil del usuario
            const user = await authApi.getProfile();

            set({
              isAuthenticated: true,
              user,
              isLoading: false,
            });
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Error al iniciar sesión",
            });
            throw error;
          }
        },

        // Acción: Registrar usuario
        register: async (data: RegisterData) => {
          try {
            set({ isLoading: true, error: null });

            // Registrar y obtener token
            await authApi.register(data);
            
            // Obtener el perfil del usuario
            const user = await authApi.getProfile();

            set({
              isAuthenticated: true,
              user,
              isLoading: false,
            });
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Error al registrar usuario",
            });
            throw error;
          }
        },

        // Acción: Cerrar sesión
        logout: async () => {
          try {
            set({ isLoading: true });

            await authApi.logout();

            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Error al cerrar sesión",
            });
          }
        },

        // Acción: Verificar autenticación
        checkAuth: async () => {
          try {
            set({ isLoading: true });

            const { isAuthenticated, user } = await authApi.verifyAuth();

            set({
              isAuthenticated,
              user: user || null,
              isLoading: false,
            });
          } catch (error) {
            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Error al verificar autenticación",
            });
          }
        },

        // Acción: Limpiar errores
        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: "cds-auth-storage",
        storage: createJSONStorage(() => localStorage),
        // Sólo persistir estos campos
        partialize: (state) => ({
          isAuthenticated: state.isAuthenticated,
          user: state.user,
        }),
      }
    )
  )
);

export default useAuthStore;
