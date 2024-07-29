import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Dependencia.estilos.css'; // Estilos para la pagina landing Home
import { host } from '../../../conexion.js'; // Importar el host actual
import Navigator from '../../../components/Navigator/Navigator.js';


const svgEmail = (
    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22,5V9L12,13,2,9V5A1,1,0,0,1,3,4H21A1,1,0,0,1,22,5ZM2,11.154V19a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1V11.154l-10,4Z"></path></g></svg>
);

const svgUbicacion = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path

          d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
            C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
            C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
        ></path>
      </g>
    </svg>
  );

  const svgPhone = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z"></path> </g></svg>
  );

  const svgClock = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> 
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#78b42c"></path> 
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="white"></path> 
      </g></svg>
  );

  const svgFacebook = (
    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>facebook</title> <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"></path> </g></svg>
  );
  const svgXtwitter = (
    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 462.799"><path fill-rule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/></svg>
  );
  const svgYoutube = (
    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path> </g></svg>
  );

function Proteccion() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/gobierno', current: false },
        { name: 'Dependencias', path: '/gobierno/dependencias', current: false },
        { name: 'Presidencia', path: '#', current: true },
      ];

    const [contacto, setContacto] = useState(null);

    useEffect(() => {
        const fetchContacto = async () => {
            try {
                const response = await fetch(`${host}/contacto`);
                if (!response.ok) {
                    throw new Error('Error fetching contacto');
                }
                const data = await response.json();
                const presidenciaContacto = data.find(item => item.nombre_institucion === "Seguridad Publica");
                setContacto(presidenciaContacto);
            } catch (error) {
                console.error('Error fetching contacto:', error);
            }
        };

        fetchContacto();
    }, []);

    const [funcionario, setFuncionario] = useState(null);

    useEffect(() => {
        const fetchFuncionario = async () => {
            try {
                const response = await fetch(`${host}/funcionario`);
                if (!response.ok) {
                    throw new Error('Error fetching funcionario');
                }
                const data = await response.json();
                const presidente = data.find(item => item.puesto === 'Bomberos y Protección Civil');
                setFuncionario(presidente);
            } catch (error) {
                console.error('Error fetching funcionario:', error);
            }
        };

        fetchFuncionario();
    }, []);

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>BOMBEROS Y PROTECCIÓN CIVIL</h1>
                        </Row>
                    
                        {funcionario ? (
                            <div className='dependencia-datos'>
                                <div className='dependencia-datos-imagen-container'>
                                    <img 
                                        src={`${funcionario.ruta}`} 
                                        alt={funcionario.nombre_funcionario} 
                                        className='dependencia-datos-imagen'
                                    />
                                </div>
                                <div className='dependencia-datos-texto'>
                                    <p className='dependencia-datos-nombre'>{funcionario.nombre_funcionario}</p>
                                    <p className='dependencia-datos-cargo'>{funcionario.puesto}</p>
                                    <div className='svg-container-text'>
                                        {svgPhone}
                                        <p className='dependencia-datos-contactos-1'>{funcionario.telefono}</p>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgEmail}
                                        <p className='dependencia-datos-contactos-1'>{funcionario.correo}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                        
                        
                    </div>

                    <hr className="separator" />

                    <div className='generic-container'>
                        <Row>
                            <h1 className='title-section'>CONTACTO</h1>
                        </Row>
                    
                        {contacto && (
                            <div className='dependencia-contactos-container'>
                                <div>
                                    <div className='svg-container-text'>
                                        {svgUbicacion}
                                            <p className='dependencia-datos-contactos-1'>{contacto.direccion}</p>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgPhone}
                                        <div>
                                            <p className='dependencia-datos-contactos-1'>{contacto.telefono}</p>
                                            <a href='#'><p>Ver más</p></a>
                                        </div>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgClock}
                                        <p className='dependencia-datos-contactos-1'>{contacto.horario}</p>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgEmail}
                                        <p className='dependencia-datos-contactos-1'>{contacto.email}</p>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgFacebook}
                                        <a href={contacto.facebook || '#'} rel="noopener noreferrer"><p className='dependencia-datos-contactos-1'>{contacto.facebook ? 'Página de Facebook' : 'No disponible'}</p></a>
                                        
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgXtwitter}
                                        <a href={contacto.x || '#'} rel="noopener noreferrer"><p className='dependencia-datos-contactos-1'>{contacto.x ? 'Página de Twitter' : 'No disponible'}</p></a>
                                    </div>
                                    <div className='svg-container-text'>
                                        {svgYoutube}
                                        <a href={contacto.youtube || '#'} rel="noopener noreferrer"><p className='dependencia-datos-contactos-1'>{contacto.youtube ? 'Página de Youtube' : 'No disponible'}</p></a>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>

                    <hr className="separator" />

                    <div className='generic-container generic-container-variant-1'>
                        <Row>
                            <h1 className='title-section'>TRAMITES Y SERVICIOS</h1>
                        </Row>
                        <div className='dependencia-tramites-container'>
                            <div className='dependencia-tramites-fila'>
                                <a href='/tramites_servicios' rel="noopener noreferrer">
                                    <button type="button" className="btn custom-btn-7">
                                        Ir a Tramites y Servicios
                                    </button>
                                </a>
                            </div>
                        </div>
                        
                    </div>
                    <hr className="separator" />

                    <div className='generic-container generic-container-variant-1'>
                        <Row>
                            <h1 className='title-section'>ACERCA DE ESTA DEPENDENCIA</h1>
                        </Row>
                        <div className='dependencia-responsabilidad-container'>
                            <p>Bomberos y Protección Civil son fundamentales para garantizar la seguridad, protección y asistencia
en situaciones de emergencia y desastres, son responsables de prevenir incendios a través de
inspecciones de seguridad, educación pública y cumplimiento de códigos de construcción. En caso
de incendio, su función principal es extinguir el fuego de manera rápida y segura para proteger vidas
y propiedades, así como realizar operaciones de rescate en situaciones de emergencia, como
accidentes de tráfico, derrumbes, inundaciones, y rescate en alturas. Utilizan técnicas
especializadas y equipo de rescate para salvar vidas y brindar asistencia inmediata a personas
atrapadas o en peligro.</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Proteccion;