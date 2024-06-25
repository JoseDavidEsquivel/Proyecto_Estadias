// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Plan.municipal.css'; // Estilos para la pagina landing Home
// import { host } from '../../conexion.js'; // Importar el host actual
import document_pdf from '../../static/documents/PMD SANTIAGO TULANTEPEC ACTUALIZACION.pdf'
import Navigator from '../../components/Navigator/Navigator.js';

function Plan_municipal() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/Gobierno', current: false },
        { name: 'Plan Municipal', path: '#', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='plan-container'>
                        <Row>
                            <h1 className='title-section'>PLAN MUNICIPAL</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>Consulta el Plan Municipal de Desarrollo (PMD), donde se establece la visión, los mecanismos, las políticas y los programas que se estarán implementando y desarrollando en la actual
                                administración 2020 - 2024 en Santiago Tulantepec de Lugo Guerrero Hidalgo.</p>
                            </div>
                            <div className='button-container'>
                                <a href={document_pdf} target="_blank" rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-1">Ver</button>
                                </a>
                            </div>
                        </Row>
                    </div>

                    <hr className="separator" />
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Plan_municipal;