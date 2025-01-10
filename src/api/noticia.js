import axios from 'axios';
import { useAuthStore } from '../hooks/useAuthStore';

const noticiasAPI = axios.create({
    baseURL: 'https://appconsumos-coral.onrender.com/coral/noticias',
});

// Obtener el token dinámicamente antes de cada solicitud
noticiasAPI.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token; // Obtener el token desde el store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Obtener todas las noticias
export const getNoticias = async () => {
    try {
        const response = await noticiasAPI.get('/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener noticias:', error.response || error.message);
        throw error;
    }
};
// Crear una nueva noticia
export const createNoticia = async (noticia) => {
    try {
        const response = await noticiasAPI.post('/', noticia, {
            headers: {
                'Content-Type': 'multipart/form-data', // Si estás enviando archivos
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear noticia:', error.response || error.message);
        throw error;
    }
};
// Obtener todas las noticias
export const updateNoticia = async (formData) => {
    try {
        const response = await noticiasAPI.put(`/${formData.get("NoNoticias")}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Respuesta del servidor:', response.data); // Verifica la respuesta
        return response.data;
    } catch (error) {
        console.error('Error al modificar noticia:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// export const updateNoticia = async (noticia) => {
//     try {
//         const response = await noticiasAPI.put(`/${noticia.NoNoticias}/`, noticia, {  // Cambiar la URL aquí
//             headers: {
//                 'Content-Type': 'multipart/form-data', // Si estás enviando archivos
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error al modificar noticia:', error.response || error.message);
//         throw error;
//     }
// };

// Eliminar una noticia
export const deleteNoticia = async (NoNoticias) => {
    try {
        const response = await noticiasAPI.delete(`/${NoNoticias}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar noticia:', error.response || error.message);
        throw error;
    }
};
