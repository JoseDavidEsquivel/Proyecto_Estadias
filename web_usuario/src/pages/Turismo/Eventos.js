import React, { useState, useEffect } from 'react';
import { Col, Modal, Button, Form } from 'react-bootstrap';
import './Eventos.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import { svgSearch } from '../../components/svgs.js';

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [filteredEventos, setFilteredEventos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${host}/evento`)
            .then(response => response.json())
            .then(data => {
                const today = new Date();
                const futureEvents = data.filter(event => new Date(event.fecha) >= today);
                const sortedEvents = futureEvents.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                setEventos(sortedEvents);
                setFilteredEventos(sortedEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        const filtered = eventos.filter(evento =>
            evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            evento.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEventos(filtered);
    }, [searchTerm, eventos]);

    const convertToUTC = (dateString) => {
        const date = new Date(dateString);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    };

    const formatDate = (dateString) => {
        const date = convertToUTC(dateString);
        return date.toLocaleDateString('es-MX', { timeZone: 'UTC' });
    };

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const applyFilter = () => {
        const filtered = eventos.filter(evento => {
            const eventDate = new Date(evento.fecha);
            const monthMatch = filterMonth ? eventDate.getMonth() + 1 === parseInt(filterMonth) : true;
            const yearMatch = filterYear ? eventDate.getFullYear() === parseInt(filterYear) : true;
            return monthMatch && yearMatch;
        });

        setFilteredEventos(filtered);
        setShowModal(false);
    };

    const eventosChunked = chunkArray(filteredEventos, 3);

    return (
        <Col>
            <div className='banner-principal'>
                <h1>EVENTOS MUNICIPALES</h1>
            </div>
            <div className='eventos-main-container'>
                <div className='eventos-busqueda-container'>
                    <div className='eventos-search-container'>
                        <input
                            type="text"
                            className="form-control eventos-search"
                            placeholder="Buscar Evento"
                            aria-label="buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='eventos-button-container'>
                        <button type="submit" className="btn custom-btn-search">{svgSearch}</button>
                    </div>
                    <div className='eventos-filter-container'>
                        <button
                            type="button"
                            className="btn custom-btn-filter"
                            onClick={() => setShowModal(true)}
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
                <div className='eventos-eventos-container'>
                    {eventosChunked.map((chunk, index) => (
                        <div key={index} className='eventos-eventos-fila'>
                            {chunk.map(evento => (
                                <div key={evento.id_evento} className='turismo-eventos-cuadro'>
                                    <div className='turismo-eventos-imagen'>
                                        <img src={evento.imagen_url} alt={evento.titulo} />
                                    </div>
                                    <div className='turismo-eventos-titulo'>
                                        <p>{evento.titulo}</p>
                                    </div>
                                    <div className='turismo-eventos-fecha'>
                                        <p>{formatDate(evento.fecha)}</p>
                                    </div>
                                    <div className='turismo-button-container'>
                                        <a 
                                            href={`/turismo/eventos/${evento.id_evento}`}
                                            className="btn custom-btn-6"
                                        >
                                            Leer más
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className='eventos-paginacion-container'>
                    {/* Paginación si es necesario */}
                </div>
            </div>

            <Modal className='custom-modal' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtrar Eventos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{marginBottom:10}} controlId="filterMonth">
                            <Form.Label>Mes</Form.Label>
                            <Form.Control
                                as="select"
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {[...Array(12).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="filterYear">
                            <Form.Label>Año</Form.Label>
                            <Form.Control
                                type="number"
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                placeholder="Ingrese año"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='custom-btn-filter-2' onClick={applyFilter}>
                        Aplicar Filtro
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default Eventos;
