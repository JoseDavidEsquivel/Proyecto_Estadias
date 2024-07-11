import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { host } from '../../../conexion.js'; // Asegúrate de que la ruta a tu archivo de conexión sea correcta
import './Explora.detalle.css'; // Asegúrate de importar los estilos necesarios
import Mapa from '../../../components/Mapa/Mapa.js';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Importación de svgs
import { svgUbicacion , svgCalendar, svgClock } from '../../../components/svgs.js';



const Explora_detalle = () => {
    const { id_explora } = useParams();
    const [explora, setExplora] = useState(null);

    useEffect(() => {
        fetch(`${host}/explora/${id_explora}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setExplora(data);
                } else {
                    console.warn('No se encontraron datos válidos en la respuesta:', data);
                }
            })
            .catch(error => console.error('Error fetching explora detail:', error));
    }, [id_explora]);

    if (!explora) {
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

    const position = [explora.longitud, explora.latitud];

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
                                    <p>{explora.nombre_sitio}</p>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {svgUbicacion}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Ubicacion</p>
                                        <p className='info-info'>Datos de Ubicacion</p>
                                    </div>
                                </div>
                                <div className='evento-detalle-extra'>
                                    {/* {svgClock}
                                    <div className='evento-extra-container'>
                                        <p className='info-subtitlo'>Horario</p>
                                        <p className='info-info'>{formatTime(evento.hora)}</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className='evento-detalle-container-2'>
                            <p className='evento-descripcion-titulo'>Descripción</p>
                            <p className='evento-descripcion-descripcion'>{explora.descripcion}</p>
                        </div>
                        <div className='evento-detalle-container-3'>
                            <Row>
                                <h1 className='title-section'>¿Como llegar?</h1>
                            </Row>
                            <div className='mapa-container-1'>
                                <Mapa position={position} markerText={explora.nombre_sitio} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
    </Container>    
  );
};

export default Explora_detalle;
