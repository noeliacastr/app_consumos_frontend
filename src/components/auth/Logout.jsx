import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../../hooks/useAuthStore';
import { Button, Modal, Form } from 'react-bootstrap'; // Asegúrate de importar estos componentes

import EditEmpleado from './EditPassword';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [show, setShow] = useState(false); // Define el estado para mostrar el modal

    const { currentUser } = useAuthStore();

    const clearAuth = useAuthStore(
        (state) => state.clearAuth
    );

    const navigate = useNavigate();

    const handleOpen = () => {
        setShow(true); // Cambié setOpen a setShow
    };
    
    const handleClose = () => {
        setShow(false); // Cambié setOpen a setShow
    };
    
    const logout = () => {
        clearAuth();
        handleClose();
        navigate("/");
    };
    
    return (
        <>
            <div className="container mt-4">
                <div className='custom-button'>
                <Button
                className="btn-3" 
                variant="primary" 
                onClick={handleOpen}>
                    <span><i className="bi bi-gear"></i> Configuración </span>
                </Button>
                </div>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Perfil de Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentUser?.sub}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentUser?.Nombre}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                type="text"
                                value={currentUser?.Departamento}
                                disabled
                            />
                        </Form.Group>
                        <EditEmpleado empleado={currentUser} />
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={logout}>
                            Cerrar Sesión
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Profile;
