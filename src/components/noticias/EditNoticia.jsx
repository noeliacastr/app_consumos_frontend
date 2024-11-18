import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNoticia } from "../../api/noticia";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";

const EditNoticia = ({ noticia }) => {
    const [show, setShow] = useState(false); 
    const queryClient = useQueryClient();
    const [noticias, setNoticias] = useState({
        NoNoticias: noticia.NoNoticias, 
        Titulo: noticia.Titulo,  
        Descripcion: noticia.Descripcion, 
        Fecha: noticia.Fecha, 
        Imagen: null, 
    });
    // const { token } = useAuthStore();

    const editNoticia = useMutation({
        mutationFn: updateNoticia,
        onSuccess: () => {
            queryClient.invalidateQueries("noticias");
            handleClose();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "¡Noticia actualizada con éxito!",
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
                title: error.response?.data?.message || "Hubo un error al actualizar la noticia.",
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
        formData.append("NoNoticias", noticias.NoNoticias);
        formData.append("Titulo", noticias.Titulo);
        formData.append("Descripcion", noticias.Descripcion);
        formData.append("Fecha", noticias.Fecha);
        if (noticias.Imagen) {
            formData.append("Imagen", noticias.Imagen);
        }
    
        // Imprimir los datos a enviar
        console.log('Datos a enviar:', {
            NoNoticias: noticias.NoNoticias,
            Titulo: noticias.Titulo,
            Descripcion: noticias.Descripcion,
            Fecha: noticias.Fecha,
            Imagen: noticias.Imagen,
        });
    
        // Usar el ID de la noticia en la mutación
        editNoticia.mutate(formData);
    };

    const handleChangeEdit = (e) => {
        const { name, value, files } = e.target;
        if (name === "Imagen" && files) {
            setNoticias((prevNoticias) => ({
                ...prevNoticias,
                [name]: files[0], // Guardar el archivo de imagen
            }));
        } else {
            setNoticias((prevNoticias) => ({
                ...prevNoticias,
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
                    <Modal.Title>Editar Noticia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="Titulo"
                                value={noticias.Titulo}
                                onChange={handleChangeEdit}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="Descripcion"
                                value={noticias.Descripcion}
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
                                value={noticias.Fecha}
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
};

export default EditNoticia;
