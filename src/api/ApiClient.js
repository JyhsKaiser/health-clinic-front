// ============================================
// 1. API CLIENT - src/api/client.js
// ============================================
// Configuración central del cliente HTTP (axios)

import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Ya no es necesario para web
// import { Alert } from 'react-native'; // Ya no es necesario para web

/**
 * Función para simular un Alert en un entorno web.
 * En una aplicación real, esto debería ser reemplazado por un componente de modal/notificación UI.
 * No usamos window.alert() directamente porque interrumpe el flujo y no es personalizable.
 */
const showCustomAlert = (title, message) => {
    console.error(`ALERTA: ${title} - ${message}`);
    // Aquí es donde integrarías un componente de modal o notificación (ej. de una librería UI como Shadcn/UI, Material-UI, o uno personalizado).
    // Ejemplo:
    // import { showNotification } from './path/to/notificationService';
    // showNotification({ type: 'error', title, message });
};

class ApiClient {
    /**
     * ApiClient es una clase que encapsula la configuración de axios
     * y maneja las peticiones HTTP, incluyendo interceptores para
     * autenticación, manejo de errores y logging.
     */
    constructor() {
        // Configuración base
        this.client = axios.create({
            baseURL: 'http://localhost:8080', // URL base de tu API (cambia a tu URL real, ej: https://api.tudominio.com)
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            timeout: 10000,
        });
        this.setupInterceptors();
    }

    setupInterceptors() {
        // INTERCEPTOR DE REQUEST - Se ejecuta antes de enviar la petición
        this.client.interceptors.request.use(
            async (config) => {
                // Agregar token de autenticación automáticamente
                // Usamos localStorage para web en lugar de AsyncStorage
                const token = localStorage.getItem('authToken');

                // console.log('Token de autenticación:', token);
                // Si hay un token, lo agregamos a los headers
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Logging para debug
                // console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
                //     params: config.params,
                //     data: config.data,
                // });

                return config;
            },
            (error) => {
                console.error('❌ Request Error:', error);
                return Promise.reject(error);
            }
        );

        // INTERCEPTOR DE RESPONSE - Se ejecuta después de recibir la respuesta
        this.client.interceptors.response.use(
            (response) => {
                // Logging para debug
                // console.log(`✅ ${response.status} ${response.config.url}`, response.data);
                // console.log(`✅ ${response.status} ${response.config.url}`);

                return response;
            },
            async (error) => {
                console.error('❌ Response Error:', error.response?.data || error.message);

                // Manejo de errores específicos
                if (error.response?.status === 401) {
                    // Token expirado o inválido
                    await this.handleUnauthorized();
                } else if (error.response?.status === 403) {
                    // Sin permisos
                    showCustomAlert('Error', 'No tienes permisos para realizar esta acción');
                } else if (error.response?.status >= 500) {
                    // Error del servidor
                    showCustomAlert('Error del servidor', 'Intenta nuevamente más tarde');
                } else if (!error.response) {
                    // Sin conexión a internet
                    showCustomAlert('Sin conexión', 'Verifica tu conexión a internet');
                }

                return Promise.reject(error);
            }
        );
    }

    async handleUnauthorized() {
        // Limpiar datos de sesión usando localStorage.removeItem para web
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('refreshToken');

        // Aquí podrías navegar al login. En React, esto se haría con un router (ej. react-router-dom)
        // Ejemplo: window.location.href = '/login'; o usar un hook de navegación si estás en un componente
        showCustomAlert('Sesión expirada', 'Por favor inicia sesión nuevamente');
    }

    // Métodos HTTP principales
    async get(url, params = {}, config = {}) {
        return this.client.get(url, { params, ...config });
    }

    async post(url, data = {}, config = {}) {
        return this.client.post(url, data, config);
    }

    async put(url, data = {}, config = {}) {
        return this.client.put(url, data, config);
    }

    async patch(url, data = {}, config = {}) {
        return this.client.patch(url, data, config);
    }

    async delete(url, config = {}) {
        return this.client.delete(url, config);
    }

    // Método para upload de archivos
    async uploadFile(url, formData, onUploadProgress) {
        return this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        });
    }

    // Método para descargar archivos
    async downloadFile(url, config = {}) {
        return this.client.get(url, {
            responseType: 'blob',
            ...config,
        });
    }
}

export default new ApiClient();
