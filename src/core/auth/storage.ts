/**
 * Servicio para gestionar el almacenamiento de tokens y datos de autenticación
 */

import { IAuthHandler } from "../api/types";

/**
 * Claves para localStorage
 */
export const AUTH_STORAGE_KEYS = {
  ACCESS_TOKEN: "cds_auth_token",
  REFRESH_TOKEN: "cds_refresh_token",
  EXPIRATION_TIME: "cds_token_expiration",
  USER_DATA: "cds_user_data",
};

/**
 * Implementación de autenticación basada en localStorage
 */
export class LocalStorageAuthHandler implements IAuthHandler {
  /**
   * Almacena los tokens de autenticación y su tiempo de expiración
   */
  saveTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ): void {
    // Guardar tokens
    localStorage.setItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

    // Calcular y guardar tiempo de expiración absoluto (timestamp)
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(
      AUTH_STORAGE_KEYS.EXPIRATION_TIME,
      expirationTime.toString()
    );
  }

  /**
   * Elimina todos los datos de autenticación
   */
  clearAuthData(): void {
    localStorage.removeItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.EXPIRATION_TIME);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_DATA);

    // Disparar un evento global para que otros componentes respondan al logout
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  /**
   * Obtiene el token de refresco actual
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Obtiene el token de acceso actual
   */
  getAccessToken(): string | null {
    return localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Verifica si el token ha expirado
   * @param marginMs Margen de tiempo en ms para considerar el token como expirado
   * @returns true si el token ha expirado o está a punto de expirar
   */
  isTokenExpired(marginMs: number = 0): boolean {
    const expirationTime = localStorage.getItem(
      AUTH_STORAGE_KEYS.EXPIRATION_TIME
    );

    if (!expirationTime) {
      return true;
    }

    // Comprobar si el token ha expirado o está a punto de expirar (margen)
    return new Date().getTime() + marginMs > parseInt(expirationTime);
  }

  /**
   * Almacena los datos del usuario actual
   */
  saveUserData<T extends Record<string, unknown>>(userData: T): void {
    if (userData) {
      localStorage.setItem(
        AUTH_STORAGE_KEYS.USER_DATA,
        JSON.stringify(userData)
      );
    }
  }

  /**
   * Obtiene los datos del usuario actual
   */
  getUserData<T>(): T | null {
    const userData = localStorage.getItem(AUTH_STORAGE_KEYS.USER_DATA);

    if (!userData) {
      return null;
    }

    try {
      return JSON.parse(userData) as T;
    } catch (e) {
      console.error("Error al parsear datos de usuario:", e);
      return null;
    }
  }
}

// Exportar una instancia por defecto
export const authStorage = new LocalStorageAuthHandler();
export default authStorage;
