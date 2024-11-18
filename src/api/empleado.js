import axios from 'axios';
import { TOKEN } from './global';
const empleadoAPI = axios.create({
    baseURL: 'http://127.0.0.1:8000/coral/empleados',
    headers:{
        'Authorization': `Bearer ${TOKEN}`
    }
});

// export const updateEmp = (empleado) => empleadoAPI.put(`/${empleado.NoEmpleado}`, empleado);

export const updateEmp = (empleado) => {
    const { NoEmpleado, ...data } = empleado; // Extrae NoEmpleado
    return empleadoAPI.put(`/${NoEmpleado}`, data); // Envía solo los datos que se van a actualizar
};
export const getEmpleado = async (id) =>{
    const response = await empleadoAPI.get(`/${id}`)
    return response.data;
} 
export const getEmpleados = async () =>{
    const res = await empleadoAPI.get()
    return res.data;
}