import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Profile from '../auth/Logout';
import ButtonAppBar from './Navbar';
import '../../css/Home.css';
import ShowEmpleadoNoticia from '../noticias/ShowEmpleado';


const HomeEmpleado = () => {
return (
    <>
    <ButtonAppBar/>
    <div>
        <div className="upcoming-events">
                <div className="event-container">
                <ShowEmpleadoNoticia/>
                </div>
            </div>
    </div>
    </>
);
};

export default HomeEmpleado;