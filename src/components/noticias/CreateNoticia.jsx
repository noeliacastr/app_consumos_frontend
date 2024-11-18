import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { createNoticia } from '../../api/noticia';

const CreateNoticia = () => {
    const [open, setOpen] = useState(false);
    const [noticia, setNoticia] = useState({
        Titulo: '',
        Descripcion: '',
        Fecha: '',
        Imagen: null
    });
    const [error, setError] = useState(null);

    // Manejador del cambio en el formulario
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Imagen') {
            setNoticia({ ...noticia, Imagen: files[0] });
        } else {
            setNoticia({ ...noticia, [name]: value });
        }
    };

    // Manejador del envío del formulario
    const handleSubmitN1 = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Titulo', noticia.Titulo);
        formData.append('Descripcion', noticia.Descripcion);
        formData.append('Fecha', noticia.Fecha);
        if (noticia.Imagen) {
            formData.append('Imagen', noticia.Imagen);
        }

        try {
            await createNoticia(formData);

            // Notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'Noticia creada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });

            // Cerrar el modal y limpiar el formulario
            setOpen(false);
            setNoticia({ Titulo: '', Descripcion: '', Fecha: '', Imagen: null });

            // Recargar la página
            setTimeout(() => {
                window.location.reload();
            }, 1500); // Recargar después de que desaparezca el mensaje de éxito

        } catch (err) {
            setError('Error al crear la noticia');
        }
    };

    return (
        <div>
            <div className="align-right custom-button-delete">
                <Button
                    variant="primary"
                    onClick={() => setOpen(true)}
                    className="btn-3" 
                >
                    <span><i className="bi bi-file-earmark-plus"></i></span>
                </Button>
            </div>

            <Modal
                show={open}
                onHide={() => setOpen(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Noticia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitN1}>
                        <Form.Group controlId="Titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="Titulo"
                                value={noticia.Titulo}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Descripcion">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="Descripcion"
                                value={noticia.Descripcion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Fecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="Fecha"
                                value={noticia.Fecha}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Imagen">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type="file"
                                name="Imagen"
                                onChange={handleChange}
                                accept="image/*"
                                required
                            />
                        </Form.Group>

                        {error && <p style={{ color: 'red' }}>{error}</p>}

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateNoticia;
