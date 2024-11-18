import { updateMenu } from "../../api/menu";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";


const EditMenu = ({ menu }) => {
    const [show, setShow] = useState(false); 
    const queryClient = useQueryClient();
    const [menus, setMenus] = useState({
        NoMenu: menu.NoMenu, 
        Nombre: menu.Nombre,  
        Descripcion: menu.Descripcion, 
        Categoria: menu.Categoria, 
        Imagen: null, 
    });

    const editMenu = useMutation({
        mutationFn: updateMenu,
        onSuccess: () => {
            queryClient.invalidateQueries("menus");
            handleClose();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Menú actualizada con éxito!",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload(); // Recargar la página después de mostrar el mensaje de éxito
            });
        },
        onError: (error) => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: error.response?.data?.message || "Hubo un error al actualizar el menú.",
                showConfirmButton: true,
            });
        },
    });

    const handleShow = () => setShow(true); // Mostrar el modal
    const handleClose = () => setShow(false); // Cerrar el modal

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Crear un FormData para enviar datos de forma correcta
        const formData = new FormData();
        formData.append("NoMenu", menus.NoMenu);
        formData.append("Nombre", menus.Nombre);
        formData.append("Descripcion", menus.Descripcion);
        formData.append("Categoria", menus.Categoria);
        if (menus.Imagen) {
            formData.append("Imagen", menus.Imagen);
        }
    
        // Imprimir los datos a enviar
        console.log('Datos a enviar:', {
            NoMenu: menus.NoMenu, 
            Nombre: menus.Nombre,  
            Descripcion: menus.Descripcion, 
            Categoria: menus.Categoria, 
            Imagen: menus.Imagen, 
        });
        editMenu.mutate(formData);
    };

    const handleChangeEdit = (e) => {
        const { name, value, files } = e.target;
        if (name === "Imagen" && files) {
            setMenus((prevMenus) => ({
                ...prevMenus,
                [name]: files[0], // Guardar el archivo de imagen
            }));
        } else {
            setMenus((prevMenus) => ({
                ...prevMenus,
                [name]: value,
            }));
        }
    };

    return (
        <>
            <div className="align-right custom-button-update">
                <Button 
                    variant="primary" 
                    onClick={handleShow}
                    className="btn-3" 
                >
                    <span><i className="bi bi-pencil-square"></i> </span>
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Menú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="Nombre"
                                value={menus.Nombre}
                                onChange={handleChangeEdit}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Descripcion"
                                value={menus.Descripcion}
                                onChange={handleChangeEdit}
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                as="select"
                                name="Categoria"
                                value={menus.Categoria}
                                onChange={handleChangeEdit}
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="postre">Postre</option>
                                <option value="entrada">Entrada</option>
                                <option value="fuertes">Fuertes</option>
                                <option value="carnes">Carnes</option>
                                <option value="pasta">Pasta</option>
                            </Form.Control>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                name="Imagen"
                                accept="image/*"
                                onChange={handleChangeEdit}
                                required
                            />
                        </Form.Group>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );


}
export default EditMenu;