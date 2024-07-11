import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Encuestas.css'; // Estilos para la pagina landing Home
import Navigator from '../../components/Navigator/Navigator.js';
import { host } from '../../conexion.js'; // Importar el host actual

function Encuesta_lista() {
    const [encuestas, setEncuestas] = useState([]);

    useEffect(() => {
        // Función para obtener las encuestas
        const fetchEncuestas = async () => {
            try {
                const response = await fetch(`${host}/encuesta`);
                if (!response.ok) {
                    throw new Error('Error al obtener las encuestas');
                }
                const data = await response.json();
                setEncuestas(data);
            } catch (error) {
                console.error('Error:', error);
                // Manejar errores según tu necesidad
            }
        };

        fetchEncuestas();
    }, []);

    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Encuestas', path: '#', current: true },
    ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks} />

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>ENCUESTAS</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>
                                    Tu participación en nuestras encuestas es fundamental para la toma de decisiones y la mejora continua de
                                    nuestros servicios. Únete a la comunidad, comparte tu opinión y contribuye a construir juntos un municipio mejor
                                    y más inclusivo. ¡Tu voz cuenta!
                                </p>
                            </div>
                        </Row>
                    </div>
                    <hr className="separator-2" />
                    <div className='encuesta-label-main'>
                        {encuestas.map(encuesta => (
                            <div key={encuesta.id_encuesta} className='encuesta-label-container'>
                                <a href={`/encuestas/${encuesta.id_encuesta}`}>
                                    <p>{encuesta.titulo}</p>
                                </a>
                                <hr className='separator-3' />
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Encuesta_lista;
