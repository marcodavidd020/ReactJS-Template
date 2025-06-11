/**
 * Implementación del cliente HTTP basada en Axios
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IHttpClient } from "../types";
import { API_CONFIG } from "../config";
import { setupInterceptors } from "../interceptors";

/**
 * Cliente HTTP implementado con Axios
 */
export class AxiosHttpClient implements IHttpClient {
  private instance: AxiosInstance;

  /**
   * Constructor del cliente Axios
   * @param config Configuración opcional para personalizar la instancia
   */
  constructor(config?: Partial<AxiosRequestConfig>) {
    // Crear instancia con configuración predeterminada y personalizada
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.DEFAULT_HEADERS,
      ...config,
    });

    // Configurar interceptores
    setupInterceptors(this.instance);
  }

  /**
   * Realiza una petición GET
   * @param url URL de la petición
   * @param config Configuración adicional
   * @returns Datos de la respuesta
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T, AxiosResponse<T>>(url, config);
    return response.data;
  }

  /**
   * Realiza una petición POST
   * @param url URL de la petición
   * @param data Datos a enviar
   * @param config Configuración adicional
   * @returns Datos de la respuesta
   */
  async post<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Realiza una petición PUT
   * @param url URL de la petición
   * @param data Datos a enviar
   * @param config Configuración adicional
   * @returns Datos de la respuesta
   */
  async put<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Realiza una petición DELETE
   * @param url URL de la petición
   * @param config Configuración adicional
   * @returns Datos de la respuesta
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T, AxiosResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  /**
   * Realiza una petición PATCH
   * @param url URL de la petición
   * @param data Datos a enviar
   * @param config Configuración adicional
   * @returns Datos de la respuesta
   */
  async patch<T>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<T, AxiosResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  /**
   * Obtiene la instancia Axios subyacente
   * Útil para casos donde se necesita acceso directo a Axios
   */
  getInstance(): AxiosInstance {
    return this.instance;
  }
}
