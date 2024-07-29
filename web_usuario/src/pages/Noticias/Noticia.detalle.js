import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { host } from '../../conexion.js'; // Asegúrate de que la ruta a tu archivo de conexión sea correcta
// import './Evento.detalle.css'; // Asegúrate de importar los estilos necesarios
import Mapa from '../../components/Mapa/Mapa.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Importación de svgs
import { svgUbicacion , svgCalendar, svgClock } from '../../components/svgs.js';


const Noticia_detalle = () => {
    const { id_noticia } = useParams();
    const [noticia, setNoticia] = useState(null);

    const position = [20.0390693,-98.3573029]; // Coordenadas iniciales del mapa

    useEffect(() => {
        fetch(`${host}/noticia/${id_noticia}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
            setNoticia(data[0]);
            }
        })
        .catch(error => console.error('Error fetching event detail:', error));
    }, [id_noticia]);

    
  
    if (!noticia) {
      return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <div className='evento-detalle-main'>
                        <div>Cargando...</div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
    }
  
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    const formatTime = (seconds) => {
      const date = new Date(seconds * 1000);
      return date.toISOString().substr(11, 8);
    };

  return (
    <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <div className='evento-detalle-main'>
                        <div className='evento-detalle-container-1'>
                            <div className='evento-detalle-imagen-container'>
                                <img className='evento-detalle-imagen' src={noticia.ruta}></img>
                            </div>
                            <div className='evento-detalle-info'>
                                <div className='evento-detalle-titulo'>
                                    <p>{noticia.titulo}</p>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {svgCalendar}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Fecha</p>
                                        <p className='info-info'>Datos de Fecha</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='evento-detalle-container-2'>
                            <p className='evento-descripcion-titulo'>Acerca de </p>
                            <p className='evento-descripcion-descripcion'>{noticia.contenido}</p>
                        </div>
                        {/* <div className='evento-detalle-container-3'>
                            <Row>
                                <h1 className='title-section'>¿Como llegar?</h1>
                            </Row>
                            <div className='mapa-container-1'>
                                <Mapa position={position} markerText={evento.titulo} />
                            </div>
                        </div> */}
                    </div>
                </Col>
            </Row>
    </Container>    
  );
};

export default Noticia_detalle;
