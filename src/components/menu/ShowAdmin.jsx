import React, { useEffect, useState } from 'react';
import { getMenu } from '../../api/menu';
import ButtonAppBar from '../layout/Navbar';
import CreateMenu from './CreateMenu';
import '../../css/Menu.css';
import DeleteMenu from './DeleteMenu';
import EditMenu from './EditMenu'

const ShowMenuAdmin = () => {
    const [menus, setMenus] = useState([]);
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const tagColors = {
        postre: "blue",
        entrada: "green",
        fuertes: "red",
        Carnes: "orange",
        Pasta: "yellow"
    };

    const categories = ['All', 'postre', 'entrada', 'fuertes', 'Carnes', 'Pasta'];

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const data = await getMenu();
                setMenus(data);
                setFilteredMenus(data);
                setLoading(false);
            } catch (error) {
                setError('Error al cargar el menú');
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setFilteredMenus(menus);
        } else {
            const filtered = menus.filter(menu =>
                menu.Categoria.split(',').includes(category)
            );
            setFilteredMenus(filtered);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <ButtonAppBar />
            
            <main>
                <h1>Menú del Restaurante</h1>
                <div className="drinks__tags tag-selection" style={{ marginTop: '2rem' }}>
                    {categories.map((category) => (
                        <p
                            key={category}
                            className={`drinks__tag drinks__tag--${tagColors[category] || 'grey'} ${
                                selectedCategory === category ? '' : 'tag-inactive'
                            }`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </p>
                    ))}
                </div>
                <CreateMenu />
                <div className="event-card-container">
                    {filteredMenus.map((menu) => (
                        <div key={menu.NoMenu} className="card event-card">
                            <div className="event-header">
                                {menu.Imagen && (
                                    <img
                                        src={`data:image/jpeg;base64,${menu.Imagen}`}
                                        alt={menu.Nombre}
                                        className="event-header-image" 
                                    />
                                )}
                            </div>
                            <div className="event-content-menu">
                                <h2>{menu.Nombre}</h2>
                                <p>{menu.Descripcion}</p>
                            </div>
                            <div className="event-footer">
                                <div className="drinks__tags">
                                    {menu.Categoria.split(',').map((categoria, index) => (
                                        <p 
                                            key={index} 
                                            className={`drinks__tag drinks__tag--${tagColors[categoria] || 'grey'}`}
                                            style={{ backgroundColor: tagColors[categoria] || '#ccc' }}
                                        >
                                            {categoria}
                                        </p>
                                    ))}
                                </div>
                                <EditMenu menu={menu}/>
                                <DeleteMenu NoMenu={menu.NoMenu} />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default ShowMenuAdmin;
