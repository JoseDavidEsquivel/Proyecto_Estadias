import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Conac.css'; // Estilos para la página landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';
import { svgDownIcon } from '../../components/svgs.js';

function Conac() {
  const [expandedContainer, setExpandedContainer] = useState(null);
  const [tomos, setTomos] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch(`${host}/tomo`)
      .then(response => response.json())
      .then(data => setTomos(data))
      .catch(error => console.error('Error fetching tomos:', error));

    fetch(`${host}/year`)
      .then(response => response.json())
      .then(data => setYears(data))
      .catch(error => console.error('Error fetching years:', error));
  }, []);

  const toggleHeight = (index) => {
    setExpandedContainer(expandedContainer === index ? null : index);
  };

  const navigatorLinks = [
    { name: 'Inicio', path: '/', current: false },
    { name: 'Transparencia', path: '/transparencia', current: false },
    { name: 'Conac', path: '#', current: true },
  ];

  return (
    <Container className="p-5 my-5 rounded-3">
      <Row className="mt-5">
        <Col>
          <Navigator links={navigatorLinks} />
          <hr className="separator" />

          {tomos.map((tomo, tomoIndex) => (
            <div className='tomo-container' key={tomoIndex}>
              <Row>
                <h1 className='title-section'>{tomo.nombre_tomo}</h1>
              </Row>
              <Row className='tomo-container'>
                <div>
                  <p>{tomo.descripcion}</p>
                </div>
              </Row>

              {years.map((year, yearIndex) => (
                <div
                  className={`ejercicio-container ${expandedContainer === `${tomoIndex}-${yearIndex}` ? 'expanded' : ''}`}
                  key={yearIndex}
                >
                  <button
                    className='ejercicio-titulo-container'
                    onClick={() => toggleHeight(`${tomoIndex}-${yearIndex}`)}
                  >
                    {svgDownIcon}
                    <p>Ejercicio {year.año}</p>
                  </button>
                  <div className='ejercicio-list'>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/1`}><li>1er Trimestre</li></a>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/2`}><li>2do Trimestre</li></a>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/3`}><li>3er Trimestre</li></a>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/4`}><li>4to Trimestre</li></a>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/anual`}><li>Cuenta Pública Anual</li></a>
                    <a href={`/transparencia/conac/${tomo.nombre_tomo}/${year.año}/reglamento`}><li>Reglamento</li></a>
                    </div>
                </div>                
              ))}
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Conac;
