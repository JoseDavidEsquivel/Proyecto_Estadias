import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button} from 'react-bootstrap';
import './Conoce.css'; // Estilos para la pagina landing Home
import { host } from '../../conexion.js'; // Importar el host actual

import telefono from '../../static/images/telefono.png'

import { svgPlaystoreWhite, svgAppleWhite } from '../../components/svgs.js';
function Conoce() {
    

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
                    <p className='conoce-titulo-1'>Conoce</p>
                    <p className='conoce-titulo-2' style={{marginTop:'-40px'}}>Santiago Tulantepec</p>
                </div>
                <div className='conoce-texto-section'>
                    <p>El municipio de Santiago Tulantepec de Lugo Guerrero es uno de los ochenta y cuatro que conforman el estado de
                    Hidalgo en México. La cabecera municipal y localidad más poblada es Santiago Tulantepec.</p>
                    <p>Santiago Tulantepec de Lugo Guerrero se considera dentro de los municipios metropolitanos de la zona metropolitana
de Tulancingo, integrada también por los municipios de Cuautepec de Hinojosa y Tulancingo de Bravo, siendo
Tulancingo de Bravo el municipio central.</p>
                </div>
            </div>
            <div className='container-conoce-2'>
                <div className='conoce-titulo-section'>
                    <p className='conoce-titulo-1'>Vive la Aventura</p>
                </div>
                <div className='conoce-texto-section'>
                    <p>Descubre paisajes impresionantes, sumérgete en la historia y cultura del municipio y déjate sorprender por cada uno
de los rincones del municipio.
Prepárate para una aventura inolvidable.</p>
                </div>
                <div className='conoce-ubicacion-section'>
                    <div className='conoce-ubicacion-cuadro'>
                        <div className='ubicacion-imagen'>

                        </div>
                        <div className='ubicacion-titulo'>
                            <p>Nombre</p>
                        </div>
                        <div className='turismo-button-container'>
                            <button className="btn custom-btn-6">Leer más</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-conoce-3'>
                <div className='conoce-titulo-section'>
                    <p className='conoce-titulo-2 conoce-titulo-3'>Descubre el Pasado</p>
                </div>
                <div className='conoce-texto-section'>
                    <p className='texto-variant-1'>Descubre paisajes impresionantes, sumérgete en la historia y cultura del municipio y déjate sorprender por cada uno
de los rincones del municipio.
Prepárate para una aventura inolvidable.</p>
                </div>
                <button className="btn custom-btn-8 variant-3">Conocer mas</button>
            </div>
            <div className='container-conoce-4'>
                <div className='conoce-content-section-1'>
                    <div className='conoce-titulo-section'>
                        <p className='conoce-titulo-2 weight-normal'style={{fontSize:'2.75rem'}}>Descarga el mapa</p>
                        <p className='conoce-titulo-2' style={{marginTop:'-40px' ,fontSize:'2.75rem'}}>del municipio</p>
                    </div>
                    <div className='conoce-texto-section-2'>
                        <p className='f-size-0-75r'>Explora Santiago Tulantepec con nuestro mapa detallado que te brindará una visión
completa del municipio, mostrando no solo su distribución geográfica, sino también
resaltando lugares emblemáticos y áreas de importancia para la comunidad. </p>
                        <p className='f-size-0-75r' style={{marginTop:'-10px'}}>Mantenemos nuestro mapa actualizado regularmente para reflejar con precisión los
                        cambios y mejoras en nuestra localidad.</p>
                        <button className="btn custom-btn-8 variant-3">Descargar</button>
                    </div>
                    
                </div>
            </div>
            <div className='container-conoce-5'>
                <div className='conoce-content-section-2'>
                    <div className='conoce-content-2'>
                        <img src={telefono} className='conoce-telefono-img'></img>
                    </div>
                    <div className='conoce-content-3'>
                        <p className='f-size-1-5r weight-bold f-color-white'>APP Gobierno Santiago Tulantepec</p>
                        <p className='f-color-white'>La aplicación de gobierno creada por la administración de Santiago
Tulantepec ofrece a los ciudadanos acceso a información sobre
trámites y servicios, noticias, avisos importantes, y la opción de
enviar comentarios y sugerencias para una atención más eficiente
por parte de la administración</p>
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
  
  export default Conoce;

