import axios from 'axios';
import { TOKEN } from './global';

const usuarioAPI = axios.create({
    baseURL: 'https://appconsumos-coral.onrender.com/coral/empleados'
});

export const authtenticated = false;

export const login = (user) => usuarioAPI.post('/login', user)
export const create = (user) => usuarioAPI.post('/',user)



export const getUserData = async () => {
    
    try {
        const response = await usuarioAPI.get('/active/user', {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
        });
        
        // const userData = response.data;
        
        // localStorage.setItem("user", JSON.stringify(userData));
        // localStorage.setItem("useer_rol", userData.rol);
    
        return response.data;
    } catch (error) {
        return error.response;
    }
}