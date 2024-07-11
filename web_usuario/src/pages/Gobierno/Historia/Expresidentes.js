import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Expresidentes.css'; // Estilos para la pagina landing Home
import { host } from '../../../conexion.js'; // Importar el host actual
import Navigator from '../../../components/Navigator/Navigator.js';

function Expresidentes() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
        { name: 'Directorio', path: '#', current: true },
    ];
    const [expresidentes, setExpresidentes] = useState([]);

    useEffect(() => {
        const fetchExpresidentes = async () => {
            try {
                const response = await fetch(`${host}/expresidente`);
                if (!response.ok) {
                    throw new Error('Error fetching expresidentes');
                }
                const data = await response.json();
                setExpresidentes(data);
            } catch (error) {
                console.error('Error fetching expresidentes:', error);
            }
        };

        fetchExpresidentes();
    }, []);

    const renderExpresidentes = () => {
        const rows = [];
        for (let i = 0; i < expresidentes.length; i += 4) {
            const rowItems = expresidentes.slice(i, i + 4);
            rows.push(
                <Row key={i} className="mb-4">
                    {rowItems.map(expresidentes => (
                        <Col key={expresidentes.id_expresidente} xs={12} sm={6} md={3} className="mb-4">
                            <div className='expresidente-cuadro'>
                                <div className='expresidente-imagen-container'>
                                    <img
                                        src={`${host}/${expresidentes.ruta}/${expresidentes.imagen}`}
                                        alt={expresidentes.nombre_expresidente}
                                        className='expresidente-image'
                                    />
                                </div>
                                <div className='expresidente-texto-container'>
                                    <div className='expresidente-nombre'>{expresidentes.nombre_expresidente}</div>
                                    <div className='expresidente-periodo'>{expresidentes.periodo}</div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            );
        }
        return rows;
    };

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks} />

                    <hr className="separator" />

                    <div className='expresidentes-container'>
                        <Row>
                            <h1 className='title-section'>EXPRESIDENTES</h1>
                        </Row>
                        <div className='content'>
                            {renderExpresidentes()}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Expresidentes;
