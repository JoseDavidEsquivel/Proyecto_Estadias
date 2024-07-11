// src/Weather.js
import React, { useState, useEffect } from 'react';
import './Clima.css';
import '../Fonts.styles.css';
import { svgUbicacion } from '../svgs';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener el día de la semana en español
  const getDayName = (date) => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[date.getDay()];
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Santiago%20Tulantepec&appid=f88d3bb9261fe3e64d8e894880550096&units=metric`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Redondear la temperatura antes de establecer el estado
        data.main.temp = Math.round(data.main.temp);
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Obtener el código de icono del clima
  const weatherIconCode = weather.weather[0].icon;

  // Construir la URL de la imagen
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@4x.png`;

  // Obtener el día actual en español
  const today = new Date();
  const dayName = getDayName(today);

  return (
    <div className='clima-container'>
        <div className='clima-dia'>
            <p>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</p>
        </div>
        <div className='clima-content'>
            <div className='clima-info'>
                <p className='f-size-4-5r f-color-primary-text'>{weather.main.temp}°</p>
                <div className='clima-lugar'>
                    {svgUbicacion}
                    <p>Santiago Tpec.</p>
                </div>
            </div>
            <div className='clima-imagen'>
                <img src={weatherIconUrl} alt={weather.weather[0].description}></img>
            </div>
        </div>
    </div>
  );
};

export default Weather;
