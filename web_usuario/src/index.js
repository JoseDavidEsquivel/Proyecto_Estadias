import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Estilos 
import './index.css'; // Tus estilos personalizados
import './components/Header/Header.css'; // Ajusta la ruta según la ubicación de tu archivo CSS


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
