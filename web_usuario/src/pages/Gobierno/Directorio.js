import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Directorio.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';

function Directorio() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
        { name: 'Directorio', path: '#', current: true },
    ];
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await fetch(`${host}/funcionario`);
                if (!response.ok) {
                    throw new Error('Error fetching funcionarios');
                }
                const data = await response.json();
                setFuncionarios(data);
            } catch (error) {
                console.error('Error fetching funcionarios:', error);
            }
        };

        fetchFuncionarios();
    }, []);

    const renderFuncionarios = () => {
        const rows = [];
        for (let i = 0; i < funcionarios.length; i += 3) {
            const rowItems = funcionarios.slice(i, i + 3);
            rows.push(
                <Row key={i} className="mb-4 directorio-child-container">
                    {rowItems.map(funcionario => (
                        <Col key={funcionario.id_funcionario} className="mb-4">
                            <div className='directorio-cuadro'>
                                <div className='directorio-imagen-container'>
                                    <img
                                        src={`${funcionario.ruta}`}
                                        alt={funcionario.nombre_funcionario}
                                        className='directorio-image'
                                    />
                                </div>
                                <div className='contacto-texto-container'>
                                    <div className='directorio-nombre'>{funcionario.nombre_funcionario}</div>
                                    <div className='directorio-cargo'>{funcionario.puesto}</div>
                                    <div className='directorio-telefono'>Tel: {funcionario.telefono}</div>
                                    <div className='directorio-email'>Email: {funcionario.correo}</div>
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

                    <div className='directorio-container'>
                        <Row>
                            <h1 className='title-section'>DIRECTORIO</h1>
                        </Row>
                        
                            {renderFuncionarios()}
                        
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Directorio;
