import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './Conac.trimestre.css';
import { host } from '../../conexion.js';
import Navigator from '../../components/Navigator/Navigator.js';
import { svgDownIcon } from '../../components/svgs.js';

function Conac_trimestre() {
  const { tomo, year, trimestre } = useParams();
  const [documentos, setDocumentos] = useState([]);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const [expandedFraccion, setExpandedFraccion] = useState(null);

  let trimestreCategoria, trimestreShowed;
  if (trimestre === 'anual') {
    trimestreCategoria = 'Cuenta Pública';
    trimestreShowed = 'Cuenta Publica';
  } else if (trimestre === 'reglamento') {
    trimestreCategoria = 'Reglamento';
    trimestreShowed = 'Reglamento';
  } else {
    trimestreCategoria = trimestre;
    trimestreShowed = 'Trimestre ' + trimestre;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${host}/documento-conac`);
        const data = await response.json();

        const filteredDocs = data.filter(doc =>
          doc.nombre_tomo === tomo &&
          doc.año === parseInt(year) &&
          doc.trimestre_categoria === trimestreCategoria
        );

        setDocumentos(filteredDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, [tomo, year, trimestre]);

  const handleExpandDoc = (id) => {
    setExpandedDoc(expandedDoc === id ? null : id);
  };

  const handleExpandFraccion = (id) => {
    setExpandedFraccion(expandedFraccion === id ? null : id);
  };

  const navigatorLinks = [
    { name: 'Inicio', path: '/', current: false },
    { name: 'Transparencia', path: '/transparencia', current: false },
    { name: 'Conac', path: '/transparencia/conac', current: false },
    { name: tomo, path: '#', current: false },
    { name: year, path: '#', current: false },
    { name: trimestreShowed, path: '#', current: true },
  ];

  return (
    <Container className="p-5 my-5 rounded-3">
      <Row className="mt-5">
        <Col>
          <Navigator links={navigatorLinks} />
          <hr className="separator" />
          <div className='tomo-container'>
            <Row>
              <h1 className='title-section'>{`${trimestreShowed} - ${year}`}</h1>
            </Row>
            {documentos.map(doc => (
              <div key={doc.id_documento} className={`ejercicio-container ${expandedDoc === doc.id_documento ? 'expanded' : ''}`}>
                <button className='ejercicio-titulo-container' onClick={() => handleExpandDoc(doc.id_documento)}>
                  {svgDownIcon}
                  <p>{doc.nombre_seccion}</p>
                </button>
                <div className={`ejercicio-fraccion-container ${expandedFraccion === doc.id_documento ? 'expanded' : ''}`}>
                  <button className='ejercicio-fraccion' onClick={() => handleExpandFraccion(doc.id_documento)}>
                    {svgDownIcon}
                    <p>{doc.nombre_fraccion}</p>
                  </button>
                  <div className='ejercicio-list'>
                    <a href={doc.ruta} target="_blank" rel="noopener noreferrer">
                      <li>{doc.archivo}</li>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Conac_trimestre;
