/**
 * Punto de entrada para el cliente HTTP
 *
 * Este archivo centraliza las exportaciones del cliente HTTP
 * y proporciona la instancia predeterminada para toda la aplicación.
 */

import { IHttpClient } from "../types";
import { AxiosHttpClient } from "./axios";

// Crear y exportar una instancia predeterminada del cliente HTTP
export const apiClient: IHttpClient = new AxiosHttpClient();

// Exportar las clases para permitir instancias personalizadas
export { AxiosHttpClient };

// Exportar por defecto el cliente HTTP
export default apiClient;
