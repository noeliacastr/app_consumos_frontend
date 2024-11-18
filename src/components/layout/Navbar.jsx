import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Offcanvas } from "react-bootstrap";
import { useAuthStore } from "../../hooks/useAuthStore";
import CoralLogo from '../../img/CoralLogo.png';
import LogoCoral from '../../img/LogoCoral.png';
import '../../css/Home.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Profile from "../auth/Logout";

import PerfilUser from '../../img/perfilUser.png'


export default function ButtonAppBar() {
    const [show, setShow] = useState(false);
    const { currentUser } = useAuthStore();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {/* Navbar */}
            <Navbar bg="light" expand="lg" className="custom-navbar mb-3">
                <Navbar.Brand as={Link} to="/">
                    <img src={CoralLogo} alt="Logo" className="avatar-logo" />
                </Navbar.Brand>
                <div className="custom-button-delete">
                <Button 
                variant="primary"
                className="btn-3" 
                onClick={handleShow}>
                    <span><i className="bi bi-list"></i></span>
                </Button>
                </div>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} placement="start" className="custom-offcanvas">
                <Offcanvas.Header >
                    {/* <Offcanvas.Title>Menu</Offcanvas.Title> */}
                    <div className="user-info">
                        <img
                            src={LogoCoral} alt="perfilUser"
                            //src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e5a707f4-d5ac-4f30-afd8-4961ae353dbc"
                        />
                        <p>{currentUser?.Nombre}</p>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvas-body-custom">
                    <Nav className="flex-column nav-links">
                        {currentUser.Rol === 'admin' && (
                            <>
                                <Nav.Link className="nav-link" as={Link} to="/">Noticias</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/sugerencias">Sugerencias</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/menus">Menús</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/ventas">Consulta de venta</Nav.Link>
                            </>
                        )}
                        {currentUser.Rol === 'empleado' && (
                            <>
                                <Nav.Link className="nav-link" as={Link} to="/">Noticias</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/sugerencias">Sugerencias</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/menus">Menús</Nav.Link>
                                <Nav.Link className="nav-link" as={Link} to="/ventas">Consulta de venta</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Profile className="profile-component" />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
