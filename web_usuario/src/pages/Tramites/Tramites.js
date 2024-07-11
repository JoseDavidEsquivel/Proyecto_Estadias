import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Tramites.css'; // Estilos para la pagina landing Home
import Navigator from '../../components/Navigator/Navigator.js';
import { svgSearch } from '../../components/svgs.js';

import { tramitesData } from './Tramites.data.js';

function Tramites() {
    const [tramites, setTramites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTramites, setFilteredTramites] = useState([]);

    useEffect(() => {
        const extractedTramites = [];
        Object.keys(tramitesData).forEach(dependencia => {
            const areas = tramitesData[dependencia];
            Object.keys(areas).forEach(area => {
                const tramites = areas[area];
                Object.keys(tramites).forEach(tramite => {
                    extractedTramites.push({
                        titulo: tramite,
                        dependencia,
                        area,
                        descripcion: tramites[tramite].descripcion,
                        requisitos: tramites[tramite].requisitos,
                        costo: tramites[tramite].costo
                    });
                });
            });
        });
        setTramites(extractedTramites);
        setFilteredTramites(extractedTramites);
    }, []);

    useEffect(() => {
        const results = tramites.filter(tramite =>
            tramite.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTramites(results);
    }, [searchTerm, tramites]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Tramites y Servicios', path: '#', current: true },
    ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks} />

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>TRAMITES Y SERVICIOS</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>Bienvenido a la sección de Trámites y Servicios de nuestro municipio. En este espacio, encontrarás una amplia gama de
                                información sobre los procedimientos administrativos disponibles, así como los servicios que ofrecemos para facilitar tus
                                gestiones. Estamos aquí para ayudarte en cada paso del camino.</p>
                            </div>
                        </Row>
                    </div>
                    <div className='tramite-buscador-container'>
                        <div className='tramite-busqueda-container'>
                            <div className='tramite-search-container'>
                                <input
                                    type="text"
                                    className="form-control tramite-search"
                                    placeholder="Buscar Tramite"
                                    aria-label="buscar"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className='tramite-button-container'>
                                <button type="submit" className="btn custom-btn-search">{svgSearch}</button>
                            </div>
                        </div>
                    </div>
                    <div className='tramite-contenido-container'>
                        {filteredTramites.map((tramite, index) => (
                            <div key={index} className='tramite-cuadro'>
                                <div>
                                    <Link to={`/tramites_servicios/${tramite.titulo}`}>
                                        <p className='tramite-titulo'>{tramite.titulo}</p>
                                    </Link>
                                    <p className='tramite-dependencia'>{tramite.dependencia}</p>
                                    <p className='tramite-area'>{tramite.area}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Tramites;
