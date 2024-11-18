import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { createSugerencia } from '../../api/sugerencia';

const CreateSugerencia = () => {
    const [open, setOpen] = useState(false);
    const [sugerencia, setSugerencias] = useState({
        Titulo: '',
        Descripcion: '',
        Fecha: '',
        Imagen: null,
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Imagen') {
            setSugerencias({ ...sugerencia, Imagen: files[0] });
        } else {
            setSugerencias({ ...sugerencia, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Titulo', sugerencia.Titulo);
        formData.append('Descripcion', sugerencia.Descripcion);
        formData.append('Fecha', sugerencia.Fecha);
        if (sugerencia.Imagen) {
            formData.append('Imagen', sugerencia.Imagen);
        }

        try {
            await createSugerencia(formData);
            Swal.fire({
                icon: 'success',
                title: 'Sugerencia creada exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            setOpen(false);
            setSugerencias({ Titulo: '', Descripcion: '', Fecha: '', Imagen: null });
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (err) {
            setError('Error al crear la sugerencia');
        }
    };

    return (
        <div>
            <div className="align-right custom-button">
                <Button
                    variant="primary"
                    onClick={() => setOpen(true)}
                    className="btn-3"
                >
                    <span>Agregar</span>
                </Button>
            </div>

            <Modal
                show={open}
                onHide={() => setOpen(false)}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Sugerencia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="Titulo">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="Titulo"
                                value={sugerencia.Titulo}
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
                                value={sugerencia.Descripcion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Fecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control
                                type="date"
                                name="Fecha"
                                value={sugerencia.Fecha}
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

export default CreateSugerencia;
