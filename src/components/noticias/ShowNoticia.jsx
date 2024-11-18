import React, { useEffect, useState } from 'react';
import { getNoticias } from '../../api/noticia';
import DeleteNoticia from './DeleteNoticia';
import CreateNoticia from './CreateNoticia';
import EditNoticia from './EditNoticia';

const EventCard = () => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const data = await getNoticias();
                setNoticias(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar las noticias');
                setLoading(false);
            }
        };

        fetchNoticias();  
    }, []);


    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <CreateNoticia />
            <div className="event-card-container">
                {noticias.map((noticia) => (
                    <div key={noticia.NoNoticias} className="card event-card">
                        <div className="event-header">
                            {noticia.imagen && (
                                <img
                                    src={`data:image/jpeg;base64,${noticia.imagen}`}
                                    alt={noticia.titulo}
                                    className="event-header-image" 
                                />
                            )}
                        </div>
                        <div className="event-content">
                            <h2>{noticia.titulo}</h2>
                            <p>{noticia.descripcion}</p>
                            <p>Fecha de publicación: {new Date(noticia.fecha).toLocaleDateString()}</p> 
                        </div>
                        <div className="event-footer">
                            <p className="tag" style={{ backgroundColor: '#fd203b' }}>Noticia</p>
                            <EditNoticia noticia={noticia} />
                            <DeleteNoticia NoNoticias={noticia.NoNoticias} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EventCard;
