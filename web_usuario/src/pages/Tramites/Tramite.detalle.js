import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Tramite.detalle.css'; // Estilos para la pagina landing Home
import Navigator from '../../components/Navigator/Navigator.js';

import { tramitesData } from './Tramites.data.js';

function TramitesDetalles() {
    const { documento } = useParams();
    let tramite = null;

    Object.keys(tramitesData).forEach(dependencia => {
        const areas = tramitesData[dependencia];
        Object.keys(areas).forEach(area => {
            const tramites = areas[area];
            Object.keys(tramites).forEach(tramiteNombre => {
                if (tramiteNombre === documento) {
                    tramite = { 
                        titulo: tramiteNombre, 
                        dependencia, 
                        area, 
                        descripcion: tramites[tramiteNombre].descripcion, 
                        requisitos: tramites[tramiteNombre].requisitos, 
                        costo: tramites[tramiteNombre].costo 
                    };
                }
            });
        });
    });

    if (!tramite) {
        return <p>Trámite no encontrado</p>;
    }

    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Tramites y Servicios', path: '/tramites_servicios', current: false },
        { name: tramite.titulo, path: '#', current: true },
    ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks} />

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>{tramite.titulo}</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>{tramite.descripcion}</p>
                            </div>
                        </Row>
                        <div className='tramite-info-main'>
                            <div className='tramite-info-container'>
                                <p className='tramite-info-subtitulo'>Requisitos y consideraciones</p>
                                <div className='tramite-info-list'>
                                    {tramite.requisitos.map((requisito, index) => (
                                        <li key={index}>{requisito}</li>
                                    ))}
                                </div>
                            </div>
                            <div className='tramite-info-container'>
                                <p className='tramite-info-subtitulo'>Información Adicional</p>
                                <div className='tramite-info-list'>
                                    <li><b>Costo: </b>{tramite.costo}</li>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TramitesDetalles;
