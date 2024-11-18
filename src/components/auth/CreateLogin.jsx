import React, { useState } from 'react';
import { login} from '../../api/login';
import { useNavigate } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuthStore } from '../../hooks/useAuthStore';
import LogoCoral from '../../img/LogoCoral.png';
import CoralLogo from '../../img/CoralLogo.png';
import '../../css/Login.css';

const CreateLogin = () =>{
    const [authentications, setAuthentications] = useState({
        "NoEmpleado": '',
        "PasswordEmp": '',
    });

    const navigate = useNavigate();

    const setTokenState = useAuthStore(
        (state) => state.setToken
    )

    const createLogin = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            setTokenState(response.data);
            Swal.fire({
                title: "¡Bienvenidos a Coral Servicios de Alimentación"
            });
            navigate('/');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o contraseña incorrectas",
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        createLogin.mutate({
            ...authentications,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthentications((prevAuthentications) => ({
            ...prevAuthentications,
            [name]: value,
        }));
    };

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <img src={CoralLogo} alt="Logo" className="login-image" />
                <img src={LogoCoral} alt="Logo" className="login-img" />
                <input 
                    type="text" 
                    placeholder="Cédula" 
                    name="NoEmpleado" 
                    value={authentications.NoEmpleado} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    name="PasswordEmp" 
                    value={authentications.PasswordEmp} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );



};
export default CreateLogin