import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button} from 'react-bootstrap';
import './Explora.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual

import telefono from '../../static/images/telefono.png'

import { svgPlaystoreWhite, svgAppleWhite } from '../../components/svgs.js';
function Explora() {
    

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
            const today = new Date();
            // Filtrar los eventos que no hayan pasado
            const futureEvents = data.filter(event => new Date(event.fecha) >= today);
            // Ordenar los eventos por fecha
            const sortedEvents = futureEvents.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            // Obtener los 3 eventos más cercanos a la fecha actual
            const closestEvents = sortedEvents.slice(0, 3);
            setEventos(closestEvents);
        })
        .catch(error => console.error('Error fetching events:', error));
}, []);

const convertToUTC = (dateString) => {
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

const formatDate = (dateString) => {
    const date = convertToUTC(dateString);
    return date.toLocaleDateString('es-MX', { timeZone: 'UTC' });
};
  
    return (
        <Col>
            <div className='container-conoce-1'>
                <div className='conoce-titulo-section'>
                    <p className='conoce-titulo-1'>Explora</p>
                    <p className='conoce-titulo-2' style={{marginTop:'-40px'}}>Santiago Tulantepec</p>
                </div>
                <div className='conoce-texto-section' style={{width:"37%"}}>
                    <p>Estas listo para conocer todo lo que Santiago Tulantepec tiene para ofrecerte.
                    Explora desde parques y centros deportivos, hasta eventos y actividades de aventura.</p>
                </div>
            </div>

            <div className='container-explora-main'>

                <div className='container-explora-categoria'>
                    <p>Salud y Bienestar</p>
                </div>
                
                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Centros Medicos</p>
                            <a href='/turismo/explora/salud_y_bienestar'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Centros Deportivos</p>
                            <a href='/turismo/explora/salud_y_bienestar'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-categoria'>
                    <p>Vida e inclusión</p>
                </div>
                
                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Parques</p>
                            <a href='/turismo/explora/vida_e_inclusion'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Compras</p>
                            <a href='/turismo/explora/vida_e_inclusion'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-categoria'>
                    <p>Cultura</p>
                </div>
                
                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Museos</p>
                            <a href='/turismo/explora/cultura'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Exposiciones</p>
                            <a href='/turismo/explora/cultura'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-categoria'>
                    <p>Naturaleza</p>
                </div>
                
                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Actividades Naturales</p>
                            <a href='/turismo/explora/naturaleza'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

                <div className='container-explora-categoria'>
                    <p>Gastronomia</p>
                </div>
                
                <div className='container-explora-content'>
                    <div className='container-explora-subcategoria'>
                        <div className='explora-info'>
                            <p className='f-size-1-25r f-color-primary weight-bold'>Rincon Gastronomico</p>
                            <a href='/turismo/explora/gastronomia'>
                                <button className="btn custom-btn-8 variant-3">Conocelos mas</button>
                            </a>
                        </div>
                        <div className='explora-imagen'></div>
                    </div>
                </div>

            </div>
        </Col>
    );
  }
  
  export default Explora;

