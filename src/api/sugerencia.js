import axios from 'axios';
import { useAuthStore } from '../hooks/useAuthStore';

const sugerenciaAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/coral/sugerencias',
});


sugerenciaAPI.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token; // Obtener el token desde el store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getSugerencias = async () => {
    try {
        const response = await sugerenciaAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener la sugerencia:', error.response || error.message);
        throw error;
    }
};

export const createSugerencia = async (sugerencia) => {
    try {
        const response = await sugerenciaAPI.post('/', sugerencia, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si estás enviando archivos
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear la sugerencia:', error.response || error.message);
        throw error;
    }
};

export const updateSugerencia = async (formData) => {
    try {
        const response = await sugerenciaAPI.put(`/${formData.get("NoSugerencia")}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            }
        });
        console.log('Respuesta del servidor:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Error al modificar la sugerencia:', error.response || error.message);
        throw error;
    }
};

export const deleteSugerencia = async (NoSugerencia) => {
    try {
        const response = await sugerenciaAPI.delete(`/${NoSugerencia}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la sugerencia:', error.response || error.message);
        throw error;
    }
};
