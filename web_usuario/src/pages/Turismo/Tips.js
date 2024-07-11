import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button} from 'react-bootstrap';
import './Tips.css'; // Estilos para la pagina landing Home
import '../../components/Fonts.styles.css'
import { host } from '../../conexion.js'; // Importar el host actual

import telefono from '../../static/images/telefono.png'

import { svgPlaystoreWhite, svgAppleWhite } from '../../components/svgs.js';

import Weather from '../../components/Clima/Clima.js';


function Tips() {
    

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
            <div className='container-tips-1'>
                <div className='conoce-titulo-section'>
                    <p className='conoce-titulo-1'>Tips para el turista</p>
                </div>
                <div className='conoce-texto-section'>
                    <p>Te invitamos a ver algunos datos de utilidad que te pueden ayudar a planear mejor tu estadía.</p>
                </div>
            </div>
            <div className='container-tips-2'>
                <div className='conoce-titulo-section'>
                    <p className='conoce-titulo-2 f-size-1-5r'>Datos Generales</p>
                </div>
                <div className='conoce-texto-section f-color-primary-text t-align-justify'>
                    <li><b>Población y Densidad: </b>En 2020, el municipio contaba con una población total de 39,561 habitantes, con una
                    densidad de 615.3 habitantes por kilómetro cuadrado.</li>
                    <li><b>Altitud: </b>La altitud media del municipio es de 2238.19 metros sobre el nivel del mar, con una altitud máxima de
                    2700 msnm y mínima de 2200 msnm</li>
                    <li><b>Código Postal: </b>El código postal de Santiago Tulantepec de Lugo Guerrero es 43762</li>
                    <li><b>Clave Lada: </b>La clave Lada para el municipio es 775</li>
                    <li><b>Subdivisiones: </b>El municipio cuenta con 26 localidades dentro de su territorio</li>
                    <li><b>Eventos Históricos: </b>Fue erigido como municipio el 1 de abril de 1944.</li>
                </div>
                
            </div>
            <div className='container-tips-3'>
                <div className='container-tips-3-content '>
                    <div className='p-width-45'>
                        <div className='conoce-titulo-section'>
                            <p className='f-color-white f-size-1-5r'>¿Cómo llegar?</p>
                        </div>
                        <div className='f-color-white p-width-100 t-align-justify'>
                            <p>Una opción es llegar en automóvil propio o rentado, tomando alguna
                            carretera que conecte con Santiago Tulantepec.</p>
                            <p>Otra opción es llegar en transporte público local desde ciudades
    cercanas, como Tulancingo de Bravo o Cuautepec de Hinojosa. En
    estos casos, podrías tomar un colectivo o combi que te lleve
    directamente a Santiago Tulantepec.</p>
                            <p>Recuerda siempre verificar los horarios y rutas disponibles para
                            planificar tu viaje con anticipación.</p>
                        </div>
                    </div>
                    <div className='p-width-45 p-padd-l-5px'>
                    <div className='conoce-titulo-section'>
                            <p className='f-color-white f-size-1-5r'>Números de Emergencia</p>
                        </div>
                        <div className='f-color-white p-width-100 t-align-justify '>
                            <li><b>Emergencias: </b>911</li>
                            <li><b>Protección Civil y Bomberos: </b>7751164043</li>
                            <li><b>WhatsApp: </b>7712094517</li>
                            <li><b>Seguridad y Transito Municipal: </b>775 754 6500</li>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-tips-4'>
                <div className='container-tips-3-content '>
                    <div className='p-width-70'>
                        <div className='conoce-titulo-section'>
                            <p className='f-color-primary f-size-1-5r'>Clima</p>
                        </div>
                        <div className='f-color-primary-text p-width-100 t-align-justify'>
                            <p>Semiseco templado (71.0%), templado subhúmedo con lluvias en verano, de
humedad media (26.0%) y templado subhúmedo con lluvias en verano, más
húmedo (3.0%). </p>
                            <p>Registra una temperatura media anual de entre 15° y 10° centígrados y tiene una
precipitación pluvial al año de 500 a 850 mm aproximadamente. EL periodo de
lluvias se presenta entre los meses de mayo y septiembre.</p>
                        </div>
                    </div>
                    <div className='p-width-45'>
                        <Weather></Weather>
                    </div>
                </div>
            </div>
            <div className='container-conoce-5' style={{height:'375px'}}>
                <div className='conoce-content-section-2'>
                    <div className='conoce-content-2'>
                        <img src={telefono} className='conoce-telefono-img' style={{marginTop:'-45%', width:'90%'}}></img>
                    </div>
                    <div className='conoce-content-3'>
                        <p className='f-size-1-5r weight-bold f-color-white'>APP Santiago Seguro</p>
                        <p className='f-color-white'>Con esta aplicación, tienes la posibilidad de reportar de forma rápida
y eficiente cualquier acto delictivo que presencies o sufras, con
respuestas inmediatas.</p>
                        <p className='f-color-white'>Además, te brinda la opción de denunciar a servidores públicos y
acceder a la sección dedicada a la seguridad de la mujer para tu
tranquilidad.</p>
                        <button className="btn custom-btn-8 variant-3" style={{marginRight:'10px'}}>{svgAppleWhite} App Store</button>
                        <button className="btn custom-btn-8 variant-3">{svgPlaystoreWhite} PlayStore</button>
                    </div>
                </div>
            </div>
            <div className='container-conoce-6'>

            </div>
        </Col>
    );
  }
  
  export default Tips;

