import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AUTH_CONFIG } from "../../config/constants";
import { AUTH_ENDPOINTS } from "./endpoints";
import interceptors from "./interceptors";
import API_CONFIG from "../../config/apiConfig";
import { formatApiError } from "../../common/utils/errorHandling";

/**
 * Interfaz para operaciones HTTP básicas
 */
export interface IHttpClient {
  get<T>(url: string, config?: any): Promise<T>;
  post<T>(url: string, data?: any, config?: any): Promise<T>;
  put<T>(url: string, data?: any, config?: any): Promise<T>;
  delete<T>(url: string, config?: any): Promise<T>;
  patch<T>(url: string, data?: any, config?: any): Promise<T>;
}

/**
 * Implementación basada en Axios del cliente HTTP
 */
class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.DEFAULT_HEADERS,
    });
    this.initializeInterceptors();
  }

  /**
   * Inicializa los interceptores para peticiones y respuestas
   */
  private initializeInterceptors() {
    // Interceptor de peticiones para añadir token de autenticación
    this.instance.interceptors.request.use(
      interceptors.requestInterceptor,
      interceptors.requestErrorHandler
    );

    // Interceptor de respuestas para manejo de errores y refresh token
    this.instance.interceptors.response.use(
      interceptors.responseInterceptor,
      async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Si es error 401 (Unauthorized) y no se ha intentado revalidar el token
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Intentar refresh token
            const refreshToken = localStorage.getItem(
              AUTH_CONFIG.refreshTokenKey
            );
            if (!refreshToken) {
              throw new Error("No refresh token available");
            }

            const response = await this.instance.post(
              AUTH_ENDPOINTS.REFRESH_TOKEN,
              {
                refreshToken,
              }
            );

            if (response.data && response.data.success) {
              // Guardar nuevos tokens
              const {
                accessToken,
                refreshToken: newRefreshToken,
                expiresIn,
              } = response.data.data;
              this.saveTokens(accessToken, newRefreshToken, expiresIn);

              // Reintentar la petición original con el nuevo token
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${accessToken}`,
              };

              return this.instance(originalRequest);
            } else {
              // Error en la respuesta del refresh token
              this.clearAuthData();
              return Promise.reject(error);
            }
          } catch (refreshError) {
            // Error al refrescar token, logout
            this.clearAuthData();
            const formattedError = formatApiError(
              refreshError,
              "apiClient.refreshToken"
            );
            return Promise.reject(formattedError);
          }
        }

        return interceptors.responseErrorHandler(error);
      }
    );
  }

  /**
   * Guarda los tokens y tiempo de expiración
   */
  private saveTokens(
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ) {
    localStorage.setItem(AUTH_CONFIG.tokenKey, accessToken);
    localStorage.setItem(AUTH_CONFIG.refreshTokenKey, refreshToken);

    // Calcular y guardar tiempo de expiración
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(AUTH_CONFIG.expirationKey, expirationTime.toString());
  }

  /**
   * Limpia datos de autenticación (logout)
   */
  private clearAuthData() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
    localStorage.removeItem(AUTH_CONFIG.expirationKey);
    // Emitir evento para redirigir al login
    window.dispatchEvent(new CustomEvent("auth:logout"));
  }

  /**
   * Implementación de métodos HTTP
   */
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.instance.get<T, AxiosResponse<T>>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.post<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.put<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    const response = await this.instance.delete<T, AxiosResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  async patch<T>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.instance.patch<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }
}

// Se exporta la instancia del cliente HTTP como el cliente API por defecto
export const apiClient: IHttpClient = new AxiosHttpClient();
export default apiClient;
