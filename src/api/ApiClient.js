// ============================================
// 1. API CLIENT - src/api/client.js
// ============================================
// Configuración central del cliente HTTP (axios)

import axios from 'axios';

/**
 * Función para simular un Alert en un entorno web.
 * En una aplicación real, esto debería ser reemplazado por un componente de modal/notificación UI.
 * No usamos window.alert() directamente porque interrumpe el flujo y no es personalizable.
 */
const showCustomAlert = (title, message) => {
    console.error(`ALERTA: ${title} - ${message}`);
    // Aquí es donde integrarías un componente de modal o notificación (ej. de una librería UI como Shadcn/UI, Material-UI, o uno personalizado).
};

class ApiClient {
    /**
     * ApiClient es una clase que encapsula la configuración de axios
     * y maneja las peticiones HTTP, incluyendo interceptores para
     * autenticación (ahora manejada por cookies HttpOnly), manejo de errores y logging.
     */
    constructor() {
        // Configuración base
        this.client = axios.create({
            baseURL: 'http://localhost:8080', // URL base de tu API (cambia a tu URL real, ej: https://api.tudominio.com)
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            withCredentials: true, // ¡IMPORTANTE! Esto permite que Axios envíe y reciba cookies
            timeout: 10000,
        });
        this.setupInterceptors();
    }

    setupInterceptors() {
        // INTERCEPTOR DE REQUEST - Se ejecuta antes de enviar la petición
        this.client.interceptors.request.use(
            async (config) => {
                // *** CAMBIO CLAVE AQUÍ: Ya no necesitamos leer el token de localStorage ***
                // El navegador enviará automáticamente la cookie 'jwt' HttpOnly
                // si la petición es al mismo dominio y cumple con las políticas de origen.

                // Logging para debug (opcional)
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

                return response;
            },
            async (error) => {
                console.error('❌ Response Error:', error.response?.data || error.message);

                // Manejo de errores específicos
                if (error.response?.status === 401) {
                    // Token expirado o inválido (el backend debería manejar esto si la cookie no es válida)
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
        // *** CAMBIO CLAVE AQUÍ: Ya no necesitamos remover 'authToken' de localStorage ***
        // El token no se almacena en localStorage.
        // Si el backend invalida la sesión (ej. al hacer logout),
        // puede enviar una cookie 'jwt' con maxAge=0 para eliminarla.
        localStorage.removeItem('currentUser'); // Esto sí lo puedes mantener si lo usas para datos del usuario
        localStorage.removeItem('refreshToken'); // Si usas refresh tokens, su manejo sería diferente

        // Aquí podrías navegar al login.

        showCustomAlert('Sesión expirada', 'Por favor inicia sesión nuevamente');
        // Ejemplo de redirección:
        window.location.href = '/login';
    }

    // Métodos HTTP principales (sin cambios)
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

    // Método para upload de archivos (sin cambios)
    async uploadFile(url, formData, onUploadProgress) {
        return this.client.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        });
    }

    // Método para descargar archivos (sin cambios)
    async downloadFile(url, config = {}) {
        return this.client.get(url, {
            responseType: 'blob',
            ...config,
        });
    }
}

export default new ApiClient();
