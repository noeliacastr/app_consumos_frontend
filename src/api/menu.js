import axios from 'axios';
import { useAuthStore } from '../hooks/useAuthStore';

const menuAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/coral/menu',
});

// Obtener el token dinámicamente antes de cada solicitud
menuAPI.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token; // Obtener el token desde el store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Obtener todas las noticias
export const getMenu = async () => {
    try {
        const response = await menuAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener menu:', error.response || error.message);
        throw error;
    }
};

// Crear una nueva noticia
export const createMenu = async (menu) => {
    try {
        const response = await menuAPI.post('/', menu, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si estás enviando archivos
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el menú:', error.response || error.message);
        throw error;
    }
};

// Actualizar una noticia existente
export const updateMenu = async (formData) => {
    try {
        const response = await menuAPI.put(`/${formData.get("NoMenu")}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si estás enviando archivos
            }
        });
        console.log('Respuesta del servidor:', response.data); // Verifica la respuesta
        return response.data;
    } catch (error) {
        console.error('Error al modificar el menú:', error.response || error.message);
        throw error;
    }
};

// Eliminar una noticia
export const deleteMenu = async (NoMenu) => {
    try {
        const response = await menuAPI.delete(`/${NoMenu}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar menú:', error.response || error.message);
        throw error;
    }
};
