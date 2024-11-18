import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { createMenu } from '../../api/menu';

const CreateMenu = () => {
    const [open, setOpen] = useState(false);
    const [menu, setMenus] = useState({
        Nombre: '',
        Descripcion: '',
        Imagen: null,
        Categoria: ''
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'Imagen') {
            setMenus({ ...menu, Imagen: files[0] });
        } else {
            setMenus({ ...menu, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Nombre', menu.Nombre);
        formData.append('Descripcion', menu.Descripcion);
        formData.append('Categoria', menu.Categoria);
        if (menu.Imagen) {
            formData.append('Imagen', menu.Imagen);
        }

        try {
            await createMenu(formData);
            Swal.fire({
                icon: 'success',
                title: 'Menú creado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            setOpen(false);
            setMenus({ Nombre: '', Descripcion: '', Imagen: null, Categoria: '' });
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (err) {
            setError('Error al crear el menú');
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
                    <Modal.Title>Agregar un Menú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="Nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="Nombre"
                                value={menu.Nombre}
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
                                value={menu.Descripcion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="Categoria">
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                as="select"
                                name="Categoria"
                                value={menu.Categoria}
                                onChange={handleChange}
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

export default CreateMenu;
