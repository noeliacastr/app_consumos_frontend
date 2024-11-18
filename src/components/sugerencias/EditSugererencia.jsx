import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { updateSugerencia } from "../../api/sugerencia";


const EditSugerencia = ({ sugerencia }) => {
    const [show, setShow] = useState(false); 
    const queryClient = useQueryClient();
    const [sugerencias, setSugerencias] = useState({
        NoSugerencia: sugerencia.NoSugerencia, 
        Titulo: sugerencia.Titulo,  
        Descripcion: sugerencia.Descripcion, 
        Fecha: sugerencia.Fecha, 
        Imagen: sugerencia.Imagen || null,
    });

    const editSugerencia = useMutation({
        mutationFn: updateSugerencia,
        onSuccess: () => {
            queryClient.invalidateQueries("sugerencias");
            handleClose();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Sugerencia actualizada con éxito!",
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
                title: error.response?.data?.message || "Hubo un error al actualizar la sugerencia.",
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
        formData.append("NoSugerencia", sugerencias.NoSugerencia);
        formData.append("Titulo", sugerencias.Titulo);
        formData.append("Descripcion", sugerencias.Descripcion);
        formData.append("Fecha", sugerencias.Fecha);
        if (sugerencias.Imagen) {
            formData.append("Imagen", sugerencias.Imagen);
        }
    
        // Imprimir los datos a enviar
        console.log('Datos a enviar:', {
            NoSugerencia: sugerencias.NoSugerencia,
            Titulo: sugerencias.Titulo,
            Descripcion: sugerencias.Descripcion,
            Fecha: sugerencias.Fecha,
            Imagen: sugerencias.Imagen,
        });
    
        editSugerencia.mutate(formData);
    };

    const handleChangeEdit = (e) => {
        const { name, value, files } = e.target;
        if (name === "Imagen" && files) {
            setSugerencias((prevSugerencias) => ({
                ...prevSugerencias,
                [name]: files[0], // Guardar el archivo de imagen
            }));
        } else {
            setSugerencias((prevSugerencias) => ({
                ...prevSugerencias,
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
                    <Modal.Title>Editar Sugerencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="Titulo"
                                value={sugerencias.Titulo}
                                onChange={handleChangeEdit}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Descripcion"
                                value={sugerencias.Descripcion}
                                onChange={handleChangeEdit}
                                rows={3}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="Fecha"
                                value={sugerencias.Fecha}
                                onChange={handleChangeEdit}
                                required
                            />
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

export default EditSugerencia;