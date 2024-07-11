import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Dependencias.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';

import presidencia_logo from '../../static/images/no_title_logo.png'
import caasst_logo from '../../static/images/caasst.png'
import proteccion_logo from '../../static/images/proteccion.png'
import dif_logo from '../../static/images/dif.png'

import seguridad_logo from '../../static/images/seguridad.png'

function Depencencias() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
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
                                    <img src={presidencia_logo} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Presidencia Municipal</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/presidencia_municipal'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img src={caasst_logo} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Agua Potable</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/agua_potable'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img src={dif_logo} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Sistema DIF</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/dif'>Ver dependencias</a></div>
                                </div>
                            </div>
                        </div>
                        <div className='dependencia-content'>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img src={''} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Bibliotecas</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/bibliotecas'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img src={seguridad_logo} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Seguridad Publica</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/seguridad'>Ver dependencias</a></div>
                                </div>
                            </div>
                            <div className='dependencia-cuadro'>
                                <div className='dependencia-imagen-container'>
                                    <img src={proteccion_logo} className="dependencia-image" />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='dependencia-dependencia'>Bomberos y Protección Civil</div>
                                    <div className='dependencia-link'><a href='/gobierno/dependencias/proteccion_civil'>Ver dependencias</a></div>
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