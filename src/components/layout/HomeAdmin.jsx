import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Profile from '../auth/Logout';
import ButtonAppBar from './Navbar';
import '../../css/Home.css';
import ShowAdminNoticia from '../noticias/ShowAdmin';


const HomeAdmin = () => {
return (
    <>
    <ButtonAppBar/>

    
    <div>
        <div className="upcoming-events">
                {/* <h1>Próximas Noticias</h1> */}
                <div className="event-container">
                    {/* <EventCard />  */}
                    <ShowAdminNoticia/>
                </div>
            </div>
    </div>
    </>
);
};

export default HomeAdmin;