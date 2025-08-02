// ============================================
// 3. AUTH SERVICE - src/api/services/AuthService.js
// ============================================
// Servicios específicos de autenticación

import ApiClient from '../ApiClient';
import { AUTH_ENDPOINTS } from '../endpoints';

// NOTA IMPORTANTE:
// Con cookies HttpOnly, el token JWT ya NO es accesible para JavaScript.
// Por lo tanto, no necesitamos decodificarlo ni almacenarlo en localStorage.
// La información del usuario (como patientId) debe ser devuelta directamente en el cuerpo de la respuesta JSON
// si el frontend la necesita.

// La función decodeJwt ya no es necesaria para el token principal,
// ya que no lo recibimos ni lo almacenamos en localStorage.
// Si tu backend devuelve el patientId directamente en la respuesta de login,
// lo usaremos desde allí.
/*
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
*/

class AuthService {
    // ============ SERVICIOS DE AUTENTICACIÓN ============
    async login(credentials) {
        try {
            const response = await ApiClient.post(AUTH_ENDPOINTS.LOGIN, credentials);

            // *** CAMBIO CLAVE AQUÍ: El token ya NO viene en response.data ***
            // El backend lo envía como una cookie HttpOnly.
            // Solo procesamos los datos que el backend sí envía en el cuerpo JSON,
            // como el patientId y el mensaje.
            const { patientId, message } = response.data;

            // Si necesitas almacenar el patientId o cualquier otro dato del usuario
            // que el backend te envíe en el JSON, hazlo aquí.
            if (patientId) {
                localStorage.setItem('patientId', patientId);
                console.log('ID del paciente guardado en localStorage:', patientId);
            }

            // Si tu backend aún devuelve un refreshToken en el cuerpo JSON
            // (aunque idealmente también debería ser HttpOnly), lo manejarías aquí.
            // Si el refreshToken también es HttpOnly, esta línea se eliminaría.
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }

            // Aquí puedes construir los datos del usuario si tu backend los devuelve
            // directamente en la respuesta de login, sin necesidad de decodificar el JWT.
            const currentUserData = {
                patientId: patientId,
                // Agrega otros campos que tu backend devuelva, como email, nombre, etc.
                // Por ejemplo: email: response.data.email, name: response.data.name
            };
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));


            console.log('Login exitoso.');

            return {
                success: true,
                data: response.data,
                user: currentUserData,
                message: message || 'Login exitoso',
            };
        } catch (errorResponse) {
            return {
                success: false,
                error: errorResponse.response?.data?.message || 'Error al iniciar sesión',
                statusCode: errorResponse.response?.status,
            };
        }
    }

    // Registrar usuario (sin cambios significativos aquí, ya que no maneja tokens directamente)
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
            // *** CAMBIO CLAVE AQUÍ: Ya no removemos 'authToken' de localStorage ***
            // El token HttpOnly se elimina en el backend al invalidar la cookie (ej. maxAge=0).
            // Si tu backend tiene un endpoint de logout que elimina la cookie,
            // puedes hacer una llamada a ese endpoint aquí.
            // Ejemplo: await ApiClient.post(AUTH_ENDPOINTS.LOGOUT);

            localStorage.removeItem('patientId');
            localStorage.removeItem('currentUser'); // Eliminar los datos del usuario
            localStorage.removeItem('refreshToken'); // Si usas refresh tokens almacenados localmente
            // localStorage.removeItem('email'); // Si los guardas individualmente
            // localStorage.removeItem('patientName'); // Si los guardas individualmente

            return {
                success: true,
                message: 'Sesión cerrada exitosamente',
            };
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
            // Asegúrate de limpiar siempre, incluso si hay un error en la llamada al backend
            localStorage.removeItem('patientId');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('refreshToken');

            return {
                success: false,
                error: 'Error al cerrar sesión',
            };
        }
    }

    // Renovar token (si usas un refresh token que NO es HttpOnly)
    // Si tu refresh token también es HttpOnly, esta lógica se movería al backend
    // y el frontend simplemente intentaría hacer una petición protegida que
    // el backend interceptaría para renovar el token automáticamente.
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await ApiClient.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
                refreshToken,
            });

            // *** CAMBIO CLAVE AQUÍ: El nuevo token de acceso también vendrá en una cookie HttpOnly ***
            // Por lo tanto, no lo almacenamos en localStorage.
            // Si el backend envía un nuevo refresh token en el cuerpo, lo actualizarías aquí.
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }

            return {
                success: true,
                message: 'Token de acceso renovado exitosamente',
            };
        } catch (error) {
            console.error("Error al renovar token:", error);
            await this.logout(); // Forzar logout si el refresh token falla
            return {
                success: false,
                error: 'Sesión expirada o refresh token inválido',
            };
        }
    }

    // Verificar si hay sesión activa
    async isAuthenticated() {
        try {
            // Con cookies HttpOnly, no podemos verificar el token directamente desde JS.
            // La mejor forma es verificar si tenemos algún dato de usuario que hayamos guardado
            // (como patientId) o intentar hacer una petición a un endpoint protegido
            // y ver si devuelve un 401.
            const patientId = localStorage.getItem('patientId');
            return !!patientId; // Retorna true si hay un patientId guardado
        } catch (e) {
            console.error("Error al verificar autenticación:", e);
            return false;
        }
    }

    // Obtener usuario actual
    async getCurrentUser() {
        try {
            // Recuperamos los datos del usuario que hayamos guardado en localStorage
            const userData = localStorage.getItem('currentUser');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error("Error al obtener el usuario actual de localStorage:", error);
            return null;
        }
    }

    // Recuperar contraseña (sin cambios)
    // async forgotPassword(email) {
    //     try {
    //         const response = await ApiClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
    //             email,
    //         });

    //         return {
    //             success: true,
    //             message: 'Email de recuperación enviado',
    //         };
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: error.response?.data?.message || 'Error al enviar email',
    //         };
    //     }
    // }

    // Cambiar contraseña (sin cambios)
    //     async resetPassword(token, newPassword) {
    //         try {
    //             const response = await ApiClient.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
    //                 token,
    //                 password: newPassword,
    //             });

    //             return {
    //                 success: true,
    //                 message: 'Contraseña cambiada exitosamente',
    //             };
    //         } catch (error) {
    //             return {
    //                 success: false,
    //                 error: error.response?.data?.message || 'Error al cambiar contraseña',
    //             };
    //         }
    //     }
}

export default new AuthService();
