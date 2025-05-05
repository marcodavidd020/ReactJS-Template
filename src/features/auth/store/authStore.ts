import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "../types";
import { UserProfile } from "../../users/types/userTypes";
import { authService } from "../services/authService";
import { ValidationError } from "../../../core/api/types/errors";

// Estado de autenticación
interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
}

// Acciones disponibles en el store
interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  resetPassword: (data: ResetPasswordRequest) => Promise<void>;
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
        fieldErrors: null,

        // Acción: Iniciar sesión
        login: async (credentials: LoginCredentials) => {
          try {
            set({ isLoading: true, error: null, fieldErrors: null });

            // Obtener el token a través del servicio
            await authService.login(credentials);

            // Obtener el perfil del usuario
            const user = await authService.getProfile();

            set({
              isAuthenticated: true,
              user,
              isLoading: false,
            });
          } catch (error) {
            // Manejar errores de validación
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
                    : "Error al iniciar sesión",
                fieldErrors: null,
              });
            }
            throw error;
          }
        },

        // Acción: Registrar usuario
        register: async (data: RegisterData) => {
          try {
            set({ isLoading: true, error: null, fieldErrors: null });

            // Registrar y obtener token a través del servicio
            await authService.register(data);

            // Obtener el perfil del usuario
            const user = await authService.getProfile();

            set({
              isAuthenticated: true,
              user,
              isLoading: false,
            });
          } catch (error) {
            // Manejar errores de validación
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
                    : "Error al registrar usuario",
                fieldErrors: null,
              });
            }
            throw error;
          }
        },

        // Acción: Cerrar sesión
        logout: async () => {
          try {
            set({ isLoading: true });

            await authService.logout();

            set({
              isAuthenticated: false,
              user: null,
              isLoading: false,
              error: null,
              fieldErrors: null,
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

            const { isAuthenticated, user } = await authService.verifyAuth();

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

        // Acción: Solicitar recuperación de contraseña
        forgotPassword: async (data: ForgotPasswordRequest) => {
          try {
            set({ isLoading: true, error: null, fieldErrors: null });

            await authService.forgotPassword(data);

            set({ isLoading: false });
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
                    : "Error al solicitar recuperación de contraseña",
                fieldErrors: null,
              });
            }
            throw error;
          }
        },

        // Acción: Reiniciar contraseña
        resetPassword: async (data: ResetPasswordRequest) => {
          try {
            set({ isLoading: true, error: null, fieldErrors: null });

            await authService.resetPassword(data);

            set({ isLoading: false });
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
                    : "Error al reiniciar contraseña",
                fieldErrors: null,
              });
            }
            throw error;
          }
        },

        // Acción: Limpiar errores
        clearError: () => {
          set({ error: null, fieldErrors: null });
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
