import React, { useState, useEffect } from 'react';
import { Col, Modal, Button, Form } from 'react-bootstrap';
import './Noticias.css'; // Estilos para la página landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import { svgSearch } from '../../components/svgs.js';

function Noticias() {
    const [noticias, setNoticias] = useState([]);
    const [filteredNoticias, setFilteredNoticias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch(`${host}/noticia`)
            .then(response => response.json())
            .then(data => {
                setNoticias(data);
                setFilteredNoticias(data);
            })
            .catch(error => console.error('Error fetching noticias:', error));
    }, []);

    useEffect(() => {
        const filtered = noticias.filter(noticia =>
            noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            noticia.contenido.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredNoticias(filtered);
    }, [searchTerm, noticias]);

    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };

    const convertToUTC = (dateString) => {
        const date = new Date(dateString);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    };

    const formatDate = (dateString) => {
        const date = convertToUTC(dateString);
        return date.toLocaleDateString('es-MX', { timeZone: 'UTC' });
    };

    const applyFilter = () => {
        const filtered = noticias.filter(noticia => {
            const noticiaDate = new Date(noticia.fecha);
            const monthMatch = filterMonth ? noticiaDate.getMonth() + 1 === parseInt(filterMonth) : true;
            const yearMatch = filterYear ? noticiaDate.getFullYear() === parseInt(filterYear) : true;
            return monthMatch && yearMatch;
        });

        setFilteredNoticias(filtered);
        setShowModal(false);
    };

    const noticiasChunked = chunkArray(filteredNoticias, 3);

    return (
        <Col>
            <div className='banner-principal'>
                <h1>NOTICIAS MUNICIPALES</h1>
            </div>
            <div className='noticias-main-container'>
                <div className='noticias-busqueda-container'>
                    <div className='noticias-search-container'>
                        <input
                            type="text"
                            className="form-control noticias-search"
                            placeholder="Buscar Noticia"
                            aria-label="buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='noticias-button-container'>
                        <button type="submit" className="btn custom-btn-search">{svgSearch}</button>
                    </div>
                    <div className='noticias-filter-container'>
                        <button
                            type="button"
                            className="btn custom-btn-filter"
                            onClick={() => setShowModal(true)}
                        >
                            Filtrar
                        </button>
                    </div>
                </div>
                <div className='noticias-noticias-container'>
                    {noticiasChunked.map((chunk, index) => (
                        <div key={index} className='noticias-noticias-fila'>
                            {chunk.map(noticia => (
                                <div key={noticia.id_noticia} className='noticias-noticia-cuadro'>
                                    <div className='noticias-noticia-imagen'>
                                        <img src={`${host}/${noticia.ruta}${noticia.imagen}`} alt={noticia.titulo} />
                                    </div>
                                    <div className='noticias-noticia-titulo'>
                                        <p>{noticia.titulo}</p>
                                    </div>
                                    <div className='noticia-button-container'>
                                        <a 
                                            href={`/noticias/${noticia.id_noticia}`}
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
                <div className='noticias-paginacion-container'>
                    {/* Paginación si es necesario */}
                </div>
            </div>

            <Modal className='custom-modal' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtrar Noticias</Modal.Title>
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

export default Noticias;
