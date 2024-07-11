// src/components/Mapa/Mapa.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Reemplaza con la ruta a tu imagen personalizada
const customMarker = new L.Icon({
  iconUrl: require('../../static/images/mark.png'), // Asegúrate de que la ruta a la imagen sea correcta
  iconSize: [25, 41], // Tamaño del icono
  iconAnchor: [12, 41], // Punto del icono que se corresponderá con la ubicación del marcador
  popupAnchor: [1, -34], // Punto desde donde el pop-up se "disparará" hacia arriba
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Mapa = ({ position, markerText }) => {
  return (
    <MapContainer center={position} zoom={18} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customMarker}>
        <Popup>{markerText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapa;
