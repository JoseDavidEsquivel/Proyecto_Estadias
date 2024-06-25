import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Dependencias.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';

function Depencencias() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/Gobierno', current: false },
        { name: 'Dependencias', path: '#', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='depencencia-container'>
                        <Row>
                        <h1 className='title-section'>DEPENCENCIAS</h1>
                        </Row>
                        <div className='dependencia-content'>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Presidencia Municipal</div>
                                    <div className='dependencia-link'><a href='/Gobierno/Dependencias/Presidencia_municipal'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Agua Potable</div>
                                    <div className='dependencia-link'><a href='#'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Sistema DIF</div>
                                    <div className='dependencia-link'><a href='#'>Ver dependencias</a></div>
                                </div>
                            </div>
                        </div>
                        <div className='dependencia-content'>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Bibliotecas</div>
                                    <div className='dependencia-link'><a href='#'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Seguridad Publica</div>
                                    <div className='dependencia-link'><a href='#'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img scr='' alt='' className='dependencia-image'/>
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Bomberos y Protección Civil</div>
                                    <div className='dependencia-link'><a href='#'>Ver dependencias</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Depencencias;