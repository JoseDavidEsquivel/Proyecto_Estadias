// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Historia.menu.css'; // Estilos para la pagina landing Home
// import { host } from '../../conexion.js'; // Importar el host actual
// import document_pdf from '../../static/documents/PMD SANTIAGO TULANTEPEC ACTUALIZACION.pdf'
import Navigator from '../../components/Navigator/Navigator.js';


const svgHistory = (
    <svg className='icon-svg-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier"> 
            <path d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z" fill="#ffffff">
                </path> 
                <path d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z" fill="#ffffff"></path> 
        </g>
        </svg>
);

const svgDecreto = (
    <svg className='icon-svg-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V20C21 21.6569 19.6569 23 18 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H18C18.5523 21 19 20.5523 19 20V4C19 3.44772 18.5523 3 18 3ZM6.41421 7H9V4.41421L6.41421 7ZM7 13C7 12.4477 7.44772 12 8 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H8C7.44772 14 7 13.5523 7 13ZM7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z" fill="#ffffff"></path> </g></svg>
);

const svgPersonajes = (
<svg className='icon-svg-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 8.5C15 10.433 13.433 12 11.5 12C9.567 12 8 10.433 8 8.5C8 6.567 9.567 5 11.5 5C13.433 5 15 6.567 15 8.5Z" fill="#ffffff"></path> <path d="M17.6305 20H5.94623C5.54449 20 5.31716 19.559 5.56788 19.2451C6.68379 17.8479 9.29072 15 12 15C14.7275 15 17.0627 17.8864 18.0272 19.2731C18.2474 19.5897 18.0161 20 17.6305 20Z" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>);

const svgPresidente = (
<svg className='icon-svg-2' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 8L17.75 10.5L15.6666 8Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6666 13L17.75 10.5L15.6666 13Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.5 10.5L10 10.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <line x1="4" y1="3.5" x2="13" y2="3.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></line> <line x1="4" y1="17.5" x2="13" y2="17.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></line> <path d="M13 3.5V7.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <path d="M13 13.5V17.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> <path d="M4 3.5L4 17.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path> </g></svg>);


function Historia_menu() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
        { name: 'Historia del Municipio', path: '#', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='menu-container'>
                        <Row>
                            <h1 className='title-section'>HISTORIA DEL MUNICIPIO</h1>
                        </Row>
                        <Row className='button-content'>
                            <div className='button-container-2'>
                                <a href='#' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgHistory} 
                                        Historia
                                    </button>
                                </a>
                                <a href='/gobierno/historia_municipio/Decreto' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgDecreto} 
                                        Decreto del Municipio
                                    </button>
                                </a>
                            </div>
                            <div className='button-container'>
                                <a href='/gobierno/historia_municipio/Personajes_ilustres' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgPersonajes} 
                                        Personajes Ilustres
                                    </button>
                                </a>
                                <a href='/gobierno/hisrotia_municipio/Expresidentes' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgPresidente} 
                                        Expresidentes
                                    </button>
                                </a>
                            </div>
                        </Row>
                    </div>

                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Historia_menu;