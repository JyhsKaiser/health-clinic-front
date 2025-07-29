// ============================================
// 2. ENDPOINTS - src/api/endpoints.js
// ============================================
// Centraliza todas las URLs de los endpoints

const API_VERSION = '/api/v1';

// URLs base por módulo
const BASE_URLS = {
    AUTH: `/auth`,
    USERS: `/users`,
    // TODOS: `/todos`,
    UPLOADS: `/uploads`,
};

// Endpoints de autenticación
export const AUTH_ENDPOINTS = {
    LOGIN: `${API_VERSION}${BASE_URLS.AUTH}/authenticate`,
    REGISTER: `${API_VERSION}${BASE_URLS.AUTH}/register`,
    LOGOUT: `${BASE_URLS.AUTH}/logout`,
    REFRESH_TOKEN: `${BASE_URLS.AUTH}/refresh`,
    FORGOT_PASSWORD: `${BASE_URLS.AUTH}/forgot-password`,
    RESET_PASSWORD: `${BASE_URLS.AUTH}/reset-password`,
    VERIFY_EMAIL: `${BASE_URLS.AUTH}/verify-email`,
    RESEND_VERIFICATION: `${BASE_URLS.AUTH}/resend-verification`,
};

// Endpoints de usuarios
export const USER_ENDPOINTS = {
    // GET_PROFILE: `${BASE_URLS.USERS}/profile`,
    // UPDATE_PROFILE: `${BASE_URLS.USERS}/profile`,
    // CHANGE_PASSWORD: `${BASE_URLS.USERS}/change-password`,
    // UPLOAD_AVATAR: `${BASE_URLS.USERS}/avatar`,
    GET_ALL: `${BASE_URLS.USERS}`,  // Este endpoint obtiene todos los usuarios
    GET_BY_USERNAME: (username) => `${BASE_URLS.USERS}/${username}`,
    CREATE: `${BASE_URLS.USERS}`, // Este endpoint es específico para crear un nuevo usuario compartido
    // GET_BY_ID: (id) => `${BASE_URLS.USERS}/${id}`,
    // DELETE: (id) => `${BASE_URLS.USERS}/${id}`,
};

// export const TODOS_ENDPOINTS = {
//     GET_ALL: `${BASE_URLS.TODOS}`,
//     GET_BY_USERID: (id) => `${BASE_URLS.TODOS}/userId/${id}`,   // Este endpoint obtiene todos los ToDos de un usuario por su ID
//     GET_BY_ID: (id) => `${BASE_URLS.TODOS}/toDoId/${id}`, // Este endpoint obtiene un ToDo específico por su ID
//     GET_ALL_BY_USERNAME: (username) => `${BASE_URLS.TODOS}/username/${username}`, // Este endpoint obtiene todos los ToDos de un usuario por su username
//     CREATE: (username) => `${BASE_URLS.TODOS}/newToDo/username/${username}`, // Este endpoint es específico para crear un nuevo ToDo
//     UPDATE: `${BASE_URLS.TODOS}/update`,
//     DELETE: (id) => `${BASE_URLS.TODOS}/delete/toDoId/${id}`,
//     // TOGGLE_COMPLETE: (id) => `${BASE_URLS.USERS}/${id}/toggle`,
// };

// // Endpoints de productos
// export const PRODUCT_ENDPOINTS = {
//     GET_ALL: `${BASE_URLS.PRODUCTS}`,
//     GET_BY_ID: (id) => `${BASE_URLS.PRODUCTS}/${id}`,
//     CREATE: `${BASE_URLS.PRODUCTS}`,
//     UPDATE: (id) => `${BASE_URLS.PRODUCTS}/${id}`,
//     DELETE: (id) => `${BASE_URLS.PRODUCTS}/${id}`,
//     SEARCH: `${BASE_URLS.PRODUCTS}/search`,
//     BY_CATEGORY: (categoryId) => `${BASE_URLS.PRODUCTS}/category/${categoryId}`,
//     UPLOAD_IMAGE: (id) => `${BASE_URLS.PRODUCTS}/${id}/images`,
// };

// // Endpoints de pedidos
// export const ORDER_ENDPOINTS = {
//     GET_ALL: `${BASE_URLS.ORDERS}`,
//     GET_BY_ID: (id) => `${BASE_URLS.ORDERS}/${id}`,
//     CREATE: `${BASE_URLS.ORDERS}`,
//     UPDATE_STATUS: (id) => `${BASE_URLS.ORDERS}/${id}/status`,
//     CANCEL: (id) => `${BASE_URLS.ORDERS}/${id}/cancel`,
//     GET_USER_ORDERS: `${BASE_URLS.ORDERS}/my-orders`,
// };

// // Endpoints de categorías
// export const CATEGORY_ENDPOINTS = {
//     GET_ALL: `${BASE_URLS.CATEGORIES}`,
//     GET_BY_ID: (id) => `${BASE_URLS.CATEGORIES}/${id}`,
//     CREATE: `${BASE_URLS.CATEGORIES}`,
//     UPDATE: (id) => `${BASE_URLS.CATEGORIES}/${id}`,
//     DELETE: (id) => `${BASE_URLS.CATEGORIES}/${id}`,
// };

// // Endpoints de uploads
// export const UPLOAD_ENDPOINTS = {
//     SINGLE_FILE: `${BASE_URLS.UPLOADS}/single`,
//     MULTIPLE_FILES: `${BASE_URLS.UPLOADS}/multiple`,
//     DELETE_FILE: (fileId) => `${BASE_URLS.UPLOADS}/${fileId}`,
// };

// // Endpoints de notificaciones
// export const NOTIFICATION_ENDPOINTS = {
//     GET_ALL: `${BASE_URLS.NOTIFICATIONS}`,
//     MARK_AS_READ: (id) => `${BASE_URLS.NOTIFICATIONS}/${id}/read`,
//     MARK_ALL_READ: `${BASE_URLS.NOTIFICATIONS}/mark-all-read`,
//     DELETE: (id) => `${BASE_URLS.NOTIFICATIONS}/${id}`,
//     GET_UNREAD_COUNT: `${BASE_URLS.NOTIFICATIONS}/unread-count`,
// };