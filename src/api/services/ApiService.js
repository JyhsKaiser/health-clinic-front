// ============================================
// 4. API SERVICE - src/api/services/ApiService.js
// ============================================
// Servicios generales y utilidades de API

import ApiClient from '../ApiClient';
import {
    PATIENT_ENDPOINTS,
    USER_ENDPOINTS,

    // UPLOAD_ENDPOINTS
} from '../endpoints.js';

class ApiService {

    // ============ PATIENT SERVICES ============
    async getPatientData(patientId) {
        try {
            const response = await ApiClient.get(PATIENT_ENDPOINTS.GET_BY_ID(patientId));
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener datos del paciente',
            };
        }
    }

    // ============ SERVICIOS DE USUARIOS ============

    async getUserProfile(username) {
        try {
            const response = await ApiClient.get(USER_ENDPOINTS.GET_BY_USERNAME(username));
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener perfil',
            };
        }
    }

    async getUsersList() {
        try {
            const response = await ApiClient.get(USER_ENDPOINTS.GET_ALL);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al obtener lista de usuarios',
            };
        }
    }

    async updateUserProfile(userData) {
        try {
            const response = await ApiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, userData);
            return {
                success: true,
                data: response.data,
                message: 'Perfil actualizado exitosamente',
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al actualizar perfil',
            };
        }
    }

    // ============ SERVICIOS DE TO DOs ============
    // async getTodosByUserId(userId) {
    //     try {
    //         const response = await ApiClient.get(TODOS_ENDPOINTS.GET_BY_USERID(userId));
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener ToDos',
    //         };
    //     }
    // }

    // async getTodosByUsername(username) {
    //     try {
    //         const response = await ApiClient.get(TODOS_ENDPOINTS.GET_ALL_BY_USERNAME(username));
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener ToDos por usuario',
    //         };
    //     }
    // }

    // async getToDoById(toDoId) {
    //     try {
    //         const response = await ApiClient.get(TODOS_ENDPOINTS.GET_BY_ID(toDoId));
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener ToDo',
    //         };
    //     }
    // }

    // async createToDo(toDoData, username) {
    //     try {
    //         const response = await ApiClient.post(TODOS_ENDPOINTS.CREATE(username), toDoData);
    //         return {
    //             success: true,
    //             data: response.data,
    //             message: 'To Do creado exitosamente',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al crear pedido',
    //         };
    //     }
    // }

    // async updateToDo(toDoData) {
    //     try {
    //         const response = await ApiClient.put(TODOS_ENDPOINTS.UPDATE, toDoData);
    //         return {
    //             success: true,
    //             data: response.data,
    //             message: 'To Do actualizado exitosamente',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al actualizar perfil',
    //         };
    //     }
    // }

    // async deleteToDo(toDoId) {
    //     try {
    //         const response = await ApiClient.delete(TODOS_ENDPOINTS.DELETE(toDoId));
    //         return {
    //             success: true,
    //             data: response.data,
    //             message: 'To Do eliminado exitosamente',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al eliminar To Do',
    //         };
    //     }
    // }


    // ============ SERVICIOS DE PRODUCTOS ============

    // async getProducts(params = {}) {
    //     try {
    //         const response = await ApiClient.get(PRODUCT_ENDPOINTS.GET_ALL, params);
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener productos',
    //         };
    //     }
    // }

    // async getProductById(id) {
    //     try {
    //         const response = await ApiClient.get(PRODUCT_ENDPOINTS.GET_BY_ID(id));
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener producto',
    //         };
    //     }
    // }

    // async searchProducts(query, filters = {}) {
    //     try {
    //         const response = await ApiClient.get(PRODUCT_ENDPOINTS.SEARCH, {
    //             q: query,
    //             ...filters,
    //         });
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error en búsqueda',
    //         };
    //     }
    // }

    // ============ SERVICIOS DE PEDIDOS ============

    // async createOrder(orderData) {
    //     try {
    //         const response = await ApiClient.post(ORDER_ENDPOINTS.CREATE, orderData);
    //         return {
    //             success: true,
    //             data: response.data,
    //             message: 'Pedido creado exitosamente',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al crear pedido',
    //         };
    //     }
    // }

    // async getUserOrders() {
    //     try {
    //         const response = await ApiClient.get(ORDER_ENDPOINTS.GET_USER_ORDERS);
    //         return {
    //             success: true,
    //             data: response.data,
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al obtener pedidos',
    //         };
    //     }
    // }

    // ============ SERVICIOS DE UPLOAD ============

    // async uploadSingleFile(file, onUploadProgress) {
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', {
    //             uri: file.uri,
    //             type: file.type,
    //             name: file.name,
    //         });

    //         const response = await ApiClient.uploadFile(
    //             UPLOAD_ENDPOINTS.SINGLE_FILE,
    //             formData,
    //             onUploadProgress
    //         );

    //         return {
    //             success: true,
    //             data: response.data,
    //             message: 'Archivo subido exitosamente',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al subir archivo',
    //         };
    //     }
    // }

    // ============ UTILIDADES GENERALES ============

    // Método para hacer peticiones con retry automático
    async requestWithRetry(requestFn, maxRetries = 3) {
        let lastError;

        for (let i = 0; i < maxRetries; i++) {
            try {
                return await requestFn();
            } catch (error) {
                lastError = error;

                // No reintentar en errores 4xx (client errors)
                if (error.response?.status >= 400 && error.response?.status < 500) {
                    break;
                }

                // Esperar antes del siguiente intento
                if (i < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                }
            }
        }

        throw lastError;
    }

    // Método para cancelar peticiones
    createCancelToken() {
        return ApiClient.client.CancelToken.source();
    }
}

export default new ApiService();