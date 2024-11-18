import { updateEmp } from "../../api/empleado";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EditEmpleado = ({ empleado }) => {
    const [show, setShow] = useState(false);
    const queryClient = useQueryClient();

    const [empleados, setEmpleados] = useState({
        NoEmpleado: empleado?.sub || "", // Cambiado de empleado.NoEmpleado a empleado.sub
        Nombre: empleado?.Nombre || "",
        Rol: empleado?.Rol || "",
        Departamento: empleado?.Departamento || "",
        PasswordEmp: "",
    });
    const editEmpleado = useMutation({
        mutationFn: updateEmp,
        onSuccess: () => {
            queryClient.invalidateQueries("empleados");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Empleado actualizado exitosamente",
                showConfirmButton: true,
            });
            handleClose();
        },
        onError: (error) => {
            console.error("Error al actualizar el empleado:", error);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al actualizar el empleado",
                showConfirmButton: true,
            });
        },
    });

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const empleadoData = {
            Nombre: empleados.Nombre,
            Rol: empleados.Rol,
            PasswordEmp: empleados.PasswordEmp,
        };
        
        console.log("Datos a enviar:", empleadoData);
        
        if (!empleados.NoEmpleado) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No se puede actualizar, NoEmpleado no está definido.",
                showConfirmButton: true,
            });
            return;
        }
        
        // Asegúrate de que NoEmpleado se envíe como string en la URL
        editEmpleado.mutate({ NoEmpleado: empleados.NoEmpleado, ...empleadoData });
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEmpleados((prevEmpleados) => ({
            ...prevEmpleados,
            [name]: value,
        }));
    };

    // Comprobación de valor inicial de 'empleado' para asegurarse de que los datos están llegando correctamente
    console.log("Empleado recibido en EditEmpleado:", empleado);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="btn-3">
                <span><i className="bi bi-pencil-square"></i> </span>
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Empleado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>No. Empleado</Form.Label>
                            <Form.Control
                                type="text"
                                name="NoEmpleado"
                                value={empleados.NoEmpleado}
                                onChange={handleChangeEdit}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="Nombre"
                                value={empleados.Nombre}
                                onChange={handleChangeEdit}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                type="text"
                                name="Rol"
                                value={empleados.Departamento}
                                onChange={handleChangeEdit}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="PasswordEmp"
                                value={empleados.PasswordEmp}
                                onChange={handleChangeEdit}
                                placeholder="Cambiar contraseña"
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

export default EditEmpleado;
