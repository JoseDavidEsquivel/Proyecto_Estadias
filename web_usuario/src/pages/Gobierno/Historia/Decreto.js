// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Decreto.css'; // Estilos para la pagina landing Home
// import { host } from '../../conexion.js'; // Importar el host actual
import document_pdf from '../../../static/documents/PMD SANTIAGO TULANTEPEC ACTUALIZACION.pdf'
import Navigator from '../../../components/Navigator/Navigator.js';

function Decreto() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '#', current: false },
        { name: 'Historia del Municipio', path: '/Gobierno/Historia_municipio', current: false },
        { name: 'Decreto del Municipio', path: '/Gobierno/Historia_municipio/Decreto', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='plan-container'>
                        <Row>
                            <h1 className='title-section'>DECRETO DEL MUNICIPIO</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>En este decreto histórico, encontrarás los detalles de una lucha por la autonomía, la unidad de una comunidad y el triunfo de la voluntad popular</p>
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
  
  export default Decreto;