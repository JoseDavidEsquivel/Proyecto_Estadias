// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Gobierno.css'; // Estilos para la pagina landing Home
import { host } from '../conexion.js'; // Importar el host actual
import Navigator from '../components/Navigator/Navigator.js';


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

const svgDirectorio = (
    <svg className='icon-svg-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z" fill="#ffffff"></path> <path d="M8.68965 17.1351H7.47341C6.39395 17.1351 6.01657 17.1421 5.72738 17.218C4.93365 17.4264 4.30088 18.0044 4.02952 18.7558C4.0463 19.1382 4.07259 19.4746 4.11382 19.775C4.22268 20.5683 4.42179 20.9884 4.72718 21.2876C5.03258 21.5868 5.46135 21.7818 6.27103 21.8885C7.10452 21.9983 8.2092 22 9.7931 22H14.2069C15.7908 22 16.8955 21.9983 17.729 21.8885C18.5387 21.7818 18.9674 21.5868 19.2728 21.2876C19.5782 20.9884 19.7773 20.5683 19.8862 19.775C19.9776 19.1088 19.9956 18.2657 19.9991 17.1351H13.1034V20.1417C13.1034 20.4397 13.1034 20.5886 12.9988 20.6488C12.8941 20.709 12.751 20.6424 12.4647 20.5092L11.0939 19.8713C10.9971 19.8262 10.9486 19.8037 10.8966 19.8037C10.8445 19.8037 10.796 19.8262 10.6992 19.8713L9.32842 20.5092C9.04213 20.6424 8.89899 20.709 8.79432 20.6488C8.68965 20.5886 8.68965 20.4397 8.68965 20.1417V17.1351Z" fill="#ffffff"></path> </g></svg>
);

const svgDependencias = (
    <svg className='icon-svg-2' viewBox="0 0 15 15" version="1.1" id="town-hall" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00015000000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13,4H9l0-3L7.5,0L6,1v3H2L1,5v1h13V5L13,4z M7.5,1.5c0.4,0,0.7,0.3,0.7,0.8S7.9,3,7.5,3S6.7,2.7,6.7,2.2
	C6.7,1.8,7.1,1.5,7.5,1.5z M13,7H2v4l-1,1.5V14h13v-1.5L13,11V7z M5,12.5H4V8h1V12.5z M8,12.5H7V8h1V12.5z M11,12.5h-1V8h1V12.5z"></path> </g></svg>
);

const svgPlan = (
    <svg className='icon-svg-2' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
);



function Gobierno() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '#', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='menu-container'>
                        <Row>
                            <h1 className='title-section'>GOBIERNO</h1>
                        </Row>
                        <Row className='button-content'>
                            <div className='button-gobierno-container'>
                                <a href='/gobierno/plan_municipal' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgPlan} 
                                        Plan Municipal
                                    </button>
                                </a>
                                <a href='/gobierno/mision_vision' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgDecreto} 
                                        Misión y Visión
                                    </button>
                                </a>
                                <a href='/gobierno/directorio' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgDirectorio}
                                        Directorio
                                    </button>
                                </a>
                            </div>
                            <div className='button-gobierno-container'>
                                <a href='/gobierno/dependencias' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgDependencias} 
                                        Dependencias
                                    </button>
                                </a>
                                <a href='/gobierno/historia_municipio' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-3">
                                        {svgHistory}  
                                        Historia del Municipio
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
  
  export default Gobierno;