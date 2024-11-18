import React, { useEffect, useState } from 'react';
import { getNoticias } from '../../api/noticia';
import '../../css/Carousel.css';

const ShowEmpleadoNoticia = () => {
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
        <div>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                
                {/* esto hace que se mueva */}
                {/* <div className="carousel-indicators">
                    {noticias.map((noticia, index) => (
                        <button
                            type="button"
                            key={index} // Usando solo el índice como clave
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div> */}
                <div className="carousel-inner">
                    {noticias.map((noticia, index) => (
                        <div
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            key={index}
                        >
                            {noticia.Imagen && (
                                <img
                                    src={`data:image/jpeg;base64,${noticia.Imagen}`}
                                    className="d-block custom-image"
                                    alt={noticia.Titulo}
                                />
                            )}
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{noticia.Titulo}</h5>
                                <p>{noticia.Descripcion}</p>
                                <h2>Fecha de publicación: {noticia.Fecha}</h2>
                            </div>
                            <div className="carousel-caption"></div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default ShowEmpleadoNoticia;
