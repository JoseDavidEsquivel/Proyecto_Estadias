import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import './Home.css'; // Estilos para la pagina landing Home
import { host } from '../conexion.js'; // Importar el host actual

const svgLeft = (
  <svg fill="#e83c4c" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#e83c4c" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(6,6), scale(0.5)"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.293 15.707-1.414-1.414L13.586 12 9.293 7.707l1.414-1.414L16.414 12l-5.707 5.707z"></path></g></svg>
);

const svgRight = (
<svg fill="#e83c4c" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#e83c4c" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(6,6), scale(0.5)"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.293 15.707-1.414-1.414L13.586 12 9.293 7.707l1.414-1.414L16.414 12l-5.707 5.707z"></path></g></svg>
);

function Home() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    fetch(`${host}/avisos/activos`)
      .then(response => response.json())
      .then(data => {
        setCarouselItems(data);
      })
      .catch(error => console.error('Error fetching active notices:', error));
  }, []);

  return (
    <Container className="p-5 my-5 rounded-3">
      <Row className="mt-5">
        <Col>
          <div className="carousel-container">
            <Carousel
              nextIcon={<span className="carousel-control-custom">{svgRight}</span>}
              prevIcon={<span className="carousel-control-custom">{svgLeft}</span>}
            >
              {carouselItems.map((item, index) => (
                <Carousel.Item key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <img
                      className="d-block w-100 carousel-image"
                      src={`${host}/${item.ruta}${item.imagen}`}
                      alt={`Slide ${index + 1}`}
                    />
                  </a>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <hr className="separator" />
          <div className='noticias-container'>
            <Row>
              <h1 className='title'>Noticias</h1>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
