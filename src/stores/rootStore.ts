import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import useAuthStore from "../features/auth/store/authStore";

/**
 * Tipo del estado global de la aplicación
 */
interface RootState {
  // Estado global de la aplicación
  appName: string;
  version: string;
  isLoading: boolean;
  isMenuOpen: boolean;
  themeMode: "light" | "dark";

  // Acciones globales
  setLoading: (isLoading: boolean) => void;
  toggleMenu: () => void;
  toggleTheme: () => void;
}

/**
 * Store global de la aplicación
 *
 * Este store puede acceder a otros stores más específicos
 * y proporciona un punto central para estado y acciones globales.
 */
const useRootStore = create<RootState>()(
  immer((set) => ({
    // Estado inicial
    appName: "CDS",
    version: "1.0.0",
    isLoading: false,
    isMenuOpen: false,
    themeMode: "dark",

    // Acciones
    setLoading: (isLoading) => set({ isLoading }),

    toggleMenu: () =>
      set((state) => {
        state.isMenuOpen = !state.isMenuOpen;
      }),

    toggleTheme: () =>
      set((state) => {
        state.themeMode = state.themeMode === "light" ? "dark" : "light";
        // Aplicar el tema a nivel de documento
        document.documentElement.classList.toggle(
          "light-theme",
          state.themeMode === "light"
        );
        document.documentElement.classList.toggle(
          "dark-theme",
          state.themeMode === "dark"
        );
      }),
  }))
);

/**
 * Función para verificar si el usuario está autenticado
 * Combina información del rootStore con el authStore
 */
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    await useAuthStore.getState().checkAuth();
    return useAuthStore.getState().isAuthenticated;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
};

export default useRootStore;
