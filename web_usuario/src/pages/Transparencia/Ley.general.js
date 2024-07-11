import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import './Ley.general.css'; // Estilos para la página landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';

function Ley_general() {
    const [articulos, setArticulos] = useState([]);
    const [fracciones, setFracciones] = useState([]);
    const [años, setAños] = useState([]);
    const [documentos, setDocumentos] = useState([]);
    
    const [selectedFraccion, setSelectedFraccion] = useState(null);
    const [selectedAño, setSelectedAño] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Transparencia', path: '/transparencia', current: false },
        { name: 'Ley General', path: '#', current: true },
    ];

    useEffect(() => {
        // Fetch articulos
        fetch(`${host}/articulo`)
            .then(response => response.json())
            .then(data => setArticulos(data))
            .catch(error => console.error('Error fetching articulos:', error));

        // Fetch fracciones
        fetch(`${host}/fraccion`)
            .then(response => response.json())
            .then(data => setFracciones(data))
            .catch(error => console.error('Error fetching fracciones:', error));

        // Fetch años
        fetch(`${host}/year`)
            .then(response => response.json())
            .then(data => setAños(data))
            .catch(error => console.error('Error fetching años:', error));
    }, []);

    const handleShowModal = (fraccion, año) => {
        setSelectedFraccion(fraccion);
        setSelectedAño(año);
        fetch(`${host}/documento`)
            .then(response => response.json())
            .then(data => {
                const filteredDocuments = data.filter(doc => doc.id_fraccion === fraccion.id_fraccion && doc.año === año.año);
                setDocumentos(filteredDocuments);
                setShowModal(true);
            })
            .catch(error => console.error('Error fetching documentos:', error));
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks} />
                    <hr className="separator" />

                    {articulos.map((articulo) => (
                        <React.Fragment key={articulo.id_articulo}>
                            <div className='articulo-container'>
                                <Row>
                                    <h1 className='title-section'>ARTICULO {articulo.num_articulo}</h1>
                                </Row>
                                {fracciones
                                    .filter(fraccion => fraccion.num_articulo === articulo.num_articulo)
                                    .map((fraccion) => (
                                        <Row key={fraccion.id_fraccion}>
                                            <div className='fraccion-container'>
                                                <div className='fraccion-title-container'>
                                                    <p className='fraccion-title'>FRACCIÓN {fraccion.fraccion}</p>
                                                </div>
                                                <div className='fraccion-content'>
                                                    <div className='fraccion-desc'>
                                                        <p>{fraccion.descripcion}</p>
                                                    </div>
                                                    <div className='fraccion-buttons-container'>
                                                        {años.map((año) => (
                                                            <div key={año.id_año} className='button-container-2'>
                                                                <button 
                                                                    type="button" 
                                                                    className="btn custom-btn-4" 
                                                                    onClick={() => handleShowModal(fraccion, año)}
                                                                >
                                                                    {año.año}
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>  
                                                </div>
                                            </div>
                                        </Row>
                                    ))}
                            </div>
                            <hr className="separator" />
                        </React.Fragment>
                    ))}
                </Col>
            </Row>

            {selectedFraccion && selectedAño && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Documentos de Fracción {selectedFraccion.fraccion} - Año {selectedAño.año}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {['1', '2', '3', '4'].map(trimestre => (
                            <div key={trimestre}>
                                <h5>{trimestre}er Trimestre</h5>
                                <ul>
                                    {documentos.filter(doc => doc.trimestre === trimestre).map(doc => (
                                        <li key={doc.id_documento}>
                                            <a href={`${host}/${doc.ruta}`} target="_blank" rel="noopener noreferrer">
                                                {doc.documento}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn custom-btn-1" onClick={handleCloseModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
}

export default Ley_general;
