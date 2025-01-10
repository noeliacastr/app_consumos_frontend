import axios from 'axios';
import { TOKEN } from './global';

const ventasAPI = axios.create({
    baseURL: 'https://appconsumos-coral.onrender.com/coral/ventas',
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
});

// Función para obtener ventas
export const getVentas = async (start_date, end_date) => {
    try {
        const response = await ventasAPI.get('/', {
            params: {
                start_date: start_date,
                end_date: end_date
            }
        });
        return response.data; // Devuelve los datos de ventas
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        throw error; // Lanza el error para manejo en el componente
    }
};
