// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Mision.vision.css'; // Estilos para la pagina landing Home
// import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';

function Mision_vision() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/Gobierno', current: false },
        { name: 'Misión y Visión', path: '#', current: true },
      ];



    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>MISIÓN Y VISIÓN</h1>
                        </Row>
                        <Row>
                            <div>
                                <p className='subtitle-section-2'>MISIÓN</p>
                                <p>
                                Impulsar acciones que fortalezcan la transparencia y rendición de cuentas; el manejo eficiente de los recursos y la modernización de procedimientos, trámites y servicios a la población con el
                                propósito de promover el desarrollo económico competitivo y la generación de más y mejores empleos; garantizando la inclusión y equidad de los derechos sociales de sus ciudadanos en un
                                entorno seguro y de respeto a la cultura de la legalidad, de los derechos humanos y del medio ambiente con el firme propósito de lograr una mejor calidad de vida y bienestar social de los
                                santiaguenses.
                                </p>
                            </div>
                            <div>
                                <p className='subtitle-section-2'>VISIÓN</p>
                                <p>
                                Consolidar con los ciudadanos los esfuerzos por garantizar una sociedad más cohesionada, incluyente y plural, mediante el impulso de una gobernanza democrática, honesta, innovadora y
                                eficiente en la gestión e implementación de acciones que fomentan el crecimiento y desarrollo económico y social sostenible y sustentable de su territorio, en armonía con el medio ambiente.
                                </p>
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Mision_vision;