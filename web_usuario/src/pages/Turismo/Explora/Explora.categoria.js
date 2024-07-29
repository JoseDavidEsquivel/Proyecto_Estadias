import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import './Explora.categoria.css'; // Estilos para la página landing Home
import { host } from '../../../conexion.js'; // Importar el host actual
import { svgSearch } from '../../../components/svgs.js';
import { useParams } from 'react-router-dom';

function Explora_categoria() {
    const { categoria } = useParams();

    const categoriaMap = {
        'salud_y_bienestar': 'Salud y Bienestar',
        'vida_e_inclusion': 'Vida e inclusion',
        'cultura': 'Cultura',
        'naturaleza': 'Naturaleza',
        'gastronomia': 'Gastronomia'
    };

    const [sitios, setSitios] = useState([]);
    const [filteredSitios, setFilteredSitios] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${host}/explora`)
            .then(response => response.json())
            .then(data => {
                const categoryFilter = categoriaMap[categoria];
                const filteredByCategory = data.filter(sitio => sitio.categoria === categoryFilter);
                setSitios(filteredByCategory);
                setFilteredSitios(filteredByCategory);
            })
            .catch(error => console.error('Error fetching sitios:', error));
    }, [categoria]);

    useEffect(() => {
        const filtered = sitios.filter(sitio =>
            sitio.nombre_sitio.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSitios(filtered);
    }, [searchTerm, sitios]);

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const sitiosChunked = chunkArray(filteredSitios, 3);

    return (
        <Col>
            <div className='banner-principal'>
                <h1>Lugares para Explorar</h1>
            </div>
            <div className='explora-main-container'>
                <div className='explora-busqueda-container'>
                    <div className='explora-search-container'>
                        <input
                            type="text"
                            className="form-control explora-search"
                            placeholder="Buscar Sitio"
                            aria-label="buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='explora-button-container'>
                        <button type="submit" className="btn custom-btn-search">{svgSearch}</button>
                    </div>
                </div>
                <div className='explora-sitios-container'>
                    {sitiosChunked.map((chunk, index) => (
                        <div key={index} className='explora-sitios-fila'>
                            {chunk.map(sitio => (
                                <div key={sitio.id_explora} className='explora-sitio-cuadro'>
                                    <div className='explora-sitio-imagen'>
                                        <img src={`${sitio.ruta}`} alt={sitio.nombre_sitio} />
                                    </div>
                                    <div className='explora-sitio-nombre'>
                                        <p>{sitio.nombre_sitio}</p>
                                    </div>
                                    {/* <div className='explora-sitio-direccion'>
                                        <p>{sitio.direccion}</p>
                                    </div> */}
                                    <div className='explora-categoria-button-container'>
                                        <a 
                                            href={`/turismo/explora/${categoria}/${sitio.id_explora}`}
                                            className="btn custom-btn-6"
                                        >
                                            Leer más
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='explora-paginacion-container'>
                    {/* Paginación si es necesario */}
                </div>
            </div>
        </Col>
    );
}

export default Explora_categoria;
