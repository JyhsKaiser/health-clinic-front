// ============================================
// 3. AUTH SERVICE - src/api/services/AuthService.js
// ============================================
// Servicios específicos de autenticación

import ApiClient from '../ApiClient';
import { AUTH_ENDPOINTS } from '../endpoints';

// NOTA: Para React web, usamos localStorage o sessionStorage en lugar de AsyncStorage.
// localStorage es persistente, ideal para tokens de sesión.

// Función auxiliar para decodificar un JWT y extraer su payload
// Esto es necesario porque el ID del usuario (o username) suele estar en la claim 'sub' del token.
function decodeJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error al decodificar JWT:", e);
        return null;
    }
}

class AuthService {
    // ============ SERVICIOS DE AUTENTICACIÓN ============
    async login(credentials) {
        try {
            const response = await ApiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);

            const { token } = response.data;

            // console.log('Datos de respuesta del login:', response.data);

            let email = null;
            let currentUserData = {};

            if (token) {
                const decodedToken = decodeJwt(token);
                // console.log('Token decodificado:', decodedToken);

                if (decodedToken && decodedToken.sub) {
                    email = decodedToken.sub;
                    currentUserData = {
                        email: email,
                    };
                }
            }

            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage en lugar de AsyncStorage ---
            if (token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('patientId', response.data.patientId);

                console.log('id del paciente guardado en localStorage:', localStorage.getItem('patientId'));
            }
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            // Importante: Si currentUserData es un objeto, debes serializarlo a JSON
            // localStorage.setItem('currentUser', JSON.stringify(currentUserData));


            console.log('Login exitoso. Email :', email);

            return {
                success: true,
                data: response.data,
                user: currentUserData,
                message: 'Login exitoso',
            };
        } catch (errorResponse) {
            return {
                success: false,
                error: errorResponse.response?.data?.message || 'Error al iniciar sesión',
                statusCode: errorResponse.status
            };
        }
    }

    // Registrar usuario (sin cambios aquí ya que no usa almacenamiento)
    async register(userData) {
        try {
            const response = await ApiClient.post(AUTH_ENDPOINTS.REGISTER, userData);

            return {
                success: true,
                data: response.data,
                message: 'Usuario registrado exitosamente',
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al registrar usuario',
            };
        }
    }

    // Cerrar sesión
    async logout() {
        try {
            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage.removeItem ---
            localStorage.removeItem('authToken');
            // localStorage.removeItem('refreshToken');
            localStorage.removeItem('patientId'); // Eliminar los datos del usuario
            localStorage.removeItem('email'); // Eliminar los datos del usuario
            localStorage.removeItem('patientName'); // Eliminar los datos del usuario
            return {
                success: true,
                message: 'Sesión cerrada exitosamente',
            };
        } catch (error) {
            // Asegúrate de limpiar siempre, incluso si hay un error
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');

            return {
                success: false,
                error: 'Error al cerrar sesión',
            };
        }
    }

    // Renovar token
    async refreshToken() {
        try {
            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage.getItem ---
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await ApiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
                refreshToken,
            });

            const { token: newToken } = response.data;
            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage.setItem ---
            localStorage.setItem('authToken', newToken);

            return {
                success: true,
                token: newToken,
            };
        } catch (error) {
            await this.logout();
            return {
                success: false,
                error: 'Token expirado',
            };
        }
    }

    // Verificar si hay sesión activa
    async isAuthenticated() {
        try {
            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage.getItem ---
            const token = localStorage.getItem('authToken');
            return !!token;
        } catch {
            return false;
        }
    }

    // Obtener usuario actual
    async getCurrentUser() {
        try {
            // --- CAMBIO CLAVE AQUÍ: Usamos localStorage.getItem y JSON.parse ---
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null; // Parsear el string JSON a un objeto
        } catch (error) {
            console.error("Error al obtener el usuario actual de localStorage:", error);
            return null;
        }
    }

    // Recuperar contraseña (sin cambios aquí)
    async forgotPassword(email) {
        try {
            const response = await ApiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
                email,
            });

            return {
                success: true,
                message: 'Email de recuperación enviado',
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al enviar email',
            };
        }
    }

    // Cambiar contraseña (sin cambios aquí)
    async resetPassword(token, newPassword) {
        try {
            const response = await ApiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
                token,
                password: newPassword,
            });

            return {
                success: true,
                message: 'Contraseña cambiada exitosamente',
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Error al cambiar contraseña',
            };
        }
    }
}

export default new AuthService();