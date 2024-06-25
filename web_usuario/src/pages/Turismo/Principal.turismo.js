import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button} from 'react-bootstrap';
import './Principal.turismo.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual
import Navigator from '../../components/Navigator/Navigator.js';


function Principal_turismo() {
    

    const [logoUrl, setLogoUrl] = useState('');

  
    useEffect(() => {
      fetch( host + '/logo')
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { archivo, ruta } = data[0];
            setLogoUrl( host + `/${ruta}${archivo}`);
            console.log(archivo, ruta)
            console.log(host + `/${ruta}${archivo}`)
          }
        })
        .catch(error => {
          console.error('Error fetching the logo:', error);
        });
    }, []);

    const [carouselItems, setCarouselItems] = useState([]);
  
    useEffect(() => {
      fetch(`${host}/avisos/activos`)
        .then(response => response.json())
        .then(data => {
          setCarouselItems(data);
        })
        .catch(error => console.error('Error fetching active notices:', error));
    }, []);

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        fetch(`${host}/evento`)
            .then(response => response.json())
            .then(data => {
                // Ordenar los eventos por fecha
                const sortedEvents = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                // Obtener los 3 eventos más cercanos a la fecha actual
                const closestEvents = sortedEvents.slice(0, 3);
                setEventos(closestEvents);
            })
            .catch(error => console.error('Error fetching events:', error));
    }, []);
  
    return (
        <Col>
            <div className='imagen-principal'>
            </div>
            <div className='container-turismo-1'>
                <div className='container-turismo-1-header'>
                    {logoUrl && (
                    <img
                        src={logoUrl}
                        alt="Logo"
                        className=""
                    />
                    )}
                </div>
                <div className='container-turismo-1-content'>
                    <div className='container-turismo-child-1'>
                        <div className='leyenda-turismo-1'>
                            <div className='light-font-weight'>
                                <p>Descrubre la belleza de</p>
                            </div>
                            <div className='bold-font-weight'>
                                <p>Santiago Tulantepec</p>
                            </div>
                        </div>
                        <div className='leyenda-turismo-2'>
                            <p>Sumergete y descubre la belleza oculta de
Santiago Tulantepec, dejate sorprender por la
autenticidad y el encanto que este lugar tiene
para ofrecerte</p>
                        </div>
                        <div className='turismo-button-container'>
                            <button type="button" className="btn custom-btn-5" href='#'>Descrubre</button>
                        </div>
                    </div>
                    <div className='container-turismo-child-2'>
                        <div className='carousel-container-2'>
                            <Carousel>
                            {carouselItems.map((item, index) => (
                                <Carousel.Item key={index}>
                                
                                    <img
                                    className="d-block w-100 carousel-image-2"
                                    src={`${host}/${item.ruta}${item.imagen}`}
                                    alt={`Slide ${index + 1}`}
                                    />
                            
                                </Carousel.Item>
                            ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-turismo-2'>
                    <div className='leyenda-container-2'>
                        <div className='leyenda-turismo-3'>
                            <p>No te pierdas nuestro</p>
                        </div>
                        <div className='leyenda-turismo-4'>
                            <p>Próximo evento</p>
                        </div>
                        <div className='turismo-eventos-container'>
                            {eventos.map(evento => (
                                <div key={evento.id_evento} className='turismo-eventos-cuadro'>
                                    <div className='turismo-eventos-imagen'>
                                        <img
                                            src={`${host}/${evento.ruta}${evento.imagen}`}
                                            alt={evento.titulo}
                                        />
                                    </div>
                                    <div className='turismo-eventos-titulo'>
                                        <p>{evento.titulo}</p>
                                    </div>
                                    <div className='turismo-eventos-fecha'>
                                        <p>{new Date(evento.fecha).toLocaleDateString()}</p>
                                    </div>
                                    <div className='turismo-button-container'>
                                        <button className="btn custom-btn-6">Leer más</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                <div>

                </div>
            </div>
            <div className='container-turismo-2 variant-1'>
                    <div className='leyenda-container-2'>
                        <div className='leyenda-turismo-4 variant-2'>
                            <p>Prepárate para visitarnos</p>
                        </div>
                        <div className='light-font-weight width-70'>
                                <p>Antes de visitarnos es importante prepararte para pasar una experiencia inolvidable , por eso mismo te invitamos a ver

algunos datos de utilidad que te pueden ayudar a planear mejor tu estadía.</p>
                            </div>
                        <div className='turismo-button-container variant-4'>
                            <button className="btn custom-btn-6 variant-3">Conocelos</button>
                        </div>
                    </div>
                <div>

                </div>
            </div>
            <div className='container-turismo-2 variant-5'>
                    <div className='leyenda-container-2'>
                        <div className='leyenda-turismo-3'>
                            <p>Vive una experiencia única</p>
                        </div>
                        <div className='leyenda-turismo-4'>
                            <p>en Santiago Tulantepec</p>
                        </div>
                        <div className='light-font-weight width-70'>
                                <p>¿Ya sabes cuál es tu estilo de viaje?

Prepárate para disfrutar de todo lo que Santiago Tulantepec tiene para ofrecerte.

Tienes todo un municipio por descubrir solo o en compañia.</p>
                            </div>
                        <div className='turismo-button-container variant-4'>
                            <button className="btn custom-btn-6 variant-3">Conocer mas</button>
                        </div>
                    </div>
                <div>

                </div>
            </div>
        </Col>
    );
  }
  
  export default Principal_turismo;

