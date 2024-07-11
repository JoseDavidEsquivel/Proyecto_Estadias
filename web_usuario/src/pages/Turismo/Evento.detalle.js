import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { host } from '../../conexion.js'; // Asegúrate de que la ruta a tu archivo de conexión sea correcta
import './Evento.detalle.css'; // Asegúrate de importar los estilos necesarios
import Mapa from '../../components/Mapa/Mapa.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Importación de svgs
import { svgUbicacion , svgCalendar, svgClock } from '../../components/svgs.js';


const Eventos_detalle = () => {
    const { id_evento } = useParams();
    const [evento, setEvento] = useState(null);

    const position = [20.0390693,-98.3573029]; // Coordenadas iniciales del mapa

    useEffect(() => {
        fetch(`${host}/evento/${id_evento}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
            setEvento(data[0]);
            }
        })
        .catch(error => console.error('Error fetching event detail:', error));
    }, [id_evento]);

    
  
    if (!evento) {
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
                                <img className='evento-detalle-imagen' src='#'></img>
                            </div>
                            <div className='evento-detalle-info'>
                                <div className='evento-detalle-titulo'>
                                    <p>{evento.titulo}</p>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {svgUbicacion}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Ubicacion</p>
                                        <p className='info-info'>Datos de Ubicacion</p>
                                    </div>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {svgCalendar}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Fecha</p>
                                        <p className='info-info'>{formatDate(evento.fecha)}</p>
                                    </div>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {svgClock}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Horario</p>
                                        <p className='info-info'>{formatTime(evento.hora)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='evento-detalle-container-2'>
                            <p className='evento-descripcion-titulo'>Descripción</p>
                            <p className='evento-descripcion-descripcion'>{evento.descripcion}</p>
                        </div>
                        <div className='evento-detalle-container-3'>
                            <Row>
                                <h1 className='title-section'>¿Como llegar?</h1>
                            </Row>
                            <div className='mapa-container-1'>
                                <Mapa position={position} markerText={evento.titulo} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
    </Container>    
  );
};

export default Eventos_detalle;
