import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Carousel, Modal, Button} from 'react-bootstrap';
import './Home.css'; // Estilos para la pagina landing Home
import { host } from '../conexion.js'; // Importar el host actual
import CalendarWithEvents from '../components/Calendar/Calendar.js';
// import updateScssFile from '../components/update-scss.js';

import defaultCarrusel from '../static/images/no_image_default_aviso.png'

const svgCalendar = (
  <svg className='svg-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier"> 
      <path d="M7.75 2.5C7.75 2.08579 7.41421 1.75 7 1.75C6.58579 1.75 6.25 2.08579 6.25 2.5V4.07926C4.81067 4.19451 3.86577 4.47737 3.17157 5.17157C2.47737 5.86577 2.19451 6.81067 2.07926 8.25H21.9207C21.8055 6.81067 21.5226 5.86577 20.8284 5.17157C20.1342 4.47737 19.1893 4.19451 17.75 4.07926V2.5C17.75 2.08579 17.4142 1.75 17 1.75C16.5858 1.75 16.25 2.08579 16.25 2.5V4.0129C15.5847 4 14.839 4 14 4H10C9.16097 4 8.41527 4 7.75 4.0129V2.5Z" fill="#78b42c"></path> 
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 11.161 2 10.4153 2.0129 9.75H21.9871C22 10.4153 22 11.161 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12ZM17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14ZM17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13ZM13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17ZM7 14C7.55228 14 8 13.5523 8 13C8 12.4477 7.55228 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14ZM7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z" fill="#78b42c"></path>
      </g>
    </svg>
);

const svgClock = (
  <svg className='svg-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier"> 
    <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#78b42c"></path> 
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="white"></path> 
    </g></svg>
);

const svgLeft = (
  <svg fill="#e83c4c" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#e83c4c" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(6,6), scale(0.5)"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.293 15.707-1.414-1.414L13.586 12 9.293 7.707l1.414-1.414L16.414 12l-5.707 5.707z"></path></g></svg>
);

const svgRight = (
<svg fill="#e83c4c" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" stroke="#e83c4c" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(6,6), scale(0.5)"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.293 15.707-1.414-1.414L13.586 12 9.293 7.707l1.414-1.414L16.414 12l-5.707 5.707z"></path></g></svg>
);

function Home() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  // useEffect(() => {
  //   updateScssFile();
  // }, []);

  useEffect(() => {
    fetch(`${host}/avisos/activos`)
      .then(response => response.json())
      .then(data => {
        setCarouselItems(data);
      })
      .catch(error => console.error('Error fetching active notices:', error));
  }, []);

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const response = await fetch(`${host}/contacto`);
        if (!response.ok) {
          throw new Error('Error fetching contactos');
        }
        const data = await response.json();
        setContactos(data);
      } catch (error) {
        console.error('Error fetching contactos:', error);
      }
    };

    fetchContactos();
  }, []);

  const [noticias, setNoticias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState(null);


  useEffect(() => {
    fetch(`${host}/noticia`)
      .then(response => response.json())
      .then(data => setNoticias(data.slice(0, 3))) // Limitar a un máximo de 3 noticias
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  const handleShowModal = (noticia) => {
    setSelectedNoticia(noticia);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNoticia(null);
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(host + '/evento');
        const data = await response.json();
        setEventos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, []);

  const convertToUTC = (dateString) => {
    const date = new Date(dateString);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
};

  const formatDate = (dateString) => {
      const date = convertToUTC(dateString);
      return date.toLocaleDateString('es-MX', { timeZone: 'UTC' });
  };

  useEffect(() => {
    if (selectedDate) {
      const selectedDateEvents = eventos.filter(event =>
        new Date(event.fecha).toISOString().substring(0, 10) === selectedDate.substring(0, 10)
      );
      setSelectedEvents(selectedDateEvents);
    } else {
      setSelectedEvents([]);
    }
  }, [selectedDate, eventos]);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [comentarios, setComentarios] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nombre,
      telefono,
      correo,
      comentarios,
    };

    try {
      const response = await fetch(host + '/buzon/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Formulario enviado con éxito');
        // Limpiar el formulario después del envío exitoso
        setNombre('');
        setTelefono('');
        setCorreo('');
        setComentarios('');
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el formulario');
    }
  };





  return (
    <Container className="p-4 my-5 rounded-3">
      <Row className="mt-5">
        <Col> 
        <div className="carousel-container">
      <Carousel
        nextIcon={<span className="carousel-control-custom">{svgRight}</span>}
        prevIcon={<span className="carousel-control-custom">{svgLeft}</span>}
      >
        {carouselItems.length > 0 ? (
          carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-100 carousel-image"
                  src={`${item.ruta}`}
                  alt={`Slide ${index + 1}`}
                />
              </a>
            </Carousel.Item>
          ))
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src={defaultCarrusel}
              alt="Imagen por defecto"
            />
          </Carousel.Item>
        )}
      </Carousel>
    </div>

          <hr className="separator" />

          <div className='contactos-container'>
            <Row>
              <h1 className='title-section'>CONTACTOS</h1>
            </Row>
            <Row className='contactos-content-main'>
              {contactos.map(contacto => (
                <div key={contacto.id_contacto} className='contacto-cuadro'>
                  <div className='contacto-imagen-container'>
                    <img
                      src={`${contacto.ruta}`}
                      alt={contacto.nombre_institucion}
                      className='noticia-image'
                    />
                  </div>
                  <div className='contacto-texto-container'>
                    <div className='contacto-institucion'>{contacto.nombre_institucion}</div>
                    <div className='contacto-contacto'>{contacto.telefono}</div>
                    <div className='contacto-contacto'>{contacto.email}</div>
                    <div className='contacto-horario'>{contacto.horario}</div>
                    <button
                      type='button'
                      className='btn custom-btn-2'
                      onClick={() => window.location.href = `tel:${contacto.contacto}`}
                    >
                      Llamar
                    </button>
                  </div>
                </div>
              ))}
            </Row>
          </div>

          <hr className="separator" />

          <div className='noticias-container'>
            <Row>
              <h1 className='title-section'>NOTICIAS</h1>
            </Row>
            <Row>
              {/* Renderización de noticias */}
              {noticias.map((noticia, index) => (
                <div className='noticia-cuadro' key={index}>
                  <div className='noticia-imagen-container'>
                    <img src={`${noticia.ruta}`} className="noticia-image" alt="noticia" />
                  </div>
                  <div className='noticia-texto-container'>
                    <div className='noticia-titulo'><p>{noticia.titulo}</p></div>
                    <div className='noticia-fecha'><p>{new Date(noticia.fecha).toLocaleDateString()}</p></div>
                    <div className='noticia-link'>
                      <p><a onClick={() => handleShowModal(noticia)}>Leer más</a></p>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
            <Row>
              
              <div className='noticia-button-container-home'>
                <a href='/noticias'>
                  <button type="button" className="btn custom-btn-1">Ver más</button>
                </a>
              </div>
            </Row>

            {selectedNoticia && (
              <Modal show={showModal} onHide={handleCloseModal} className='ventana-emergente'>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedNoticia.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img src={`${selectedNoticia.ruta}`} alt="noticia" className="img-fluid" />
                  <p>{selectedNoticia.descripcion}</p>
                  <p>{selectedNoticia.contenido}</p>
                  <p><strong>Fecha:</strong> {new Date(selectedNoticia.fecha).toLocaleDateString()}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="btn custom-btn-1" href={`/noticias/${selectedNoticia.id_noticia}`} onClick={handleCloseModal}>
                    Leer mas
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>

          <hr className="separator" />

          <div className='eventos-container'>
            <Row>
              <h1 className='title-section'>EVENTOS</h1>
            </Row>
            <Row className='evento-home-content'>
              <div className='evento-cuadro1'>
                <CalendarWithEvents events={eventos} onDateClick={setSelectedDate} />
              </div>
              <div className='evento-cuadro2'>
                {selectedEvents.length > 0 ? (
                  selectedEvents.map(event => (
                    <div key={event.id_evento}>
                      <div className='evento-title'>
                        <p>{event.titulo}</p>
                      </div>
                      <hr className="separator-content" />
                      <div className='evento-desc'>
                        <p>{event.descripcion}</p>
                      </div>
                      <div className='evento-extra'>
                        <div className='evento-extra-fila'>{svgCalendar}<p>{formatDate(event.fecha)}</p></div>
                        <div className='evento-extra-fila'>{svgClock}<p>{new Date(event.hora * 1000).toLocaleTimeString()}</p></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='evento-title'>
                    <p>No hay ningun evento en esta fecha</p>
                  </div>
                )}
              </div>
            </Row>
            <Row>
              <div className='noticia-button-container-home'>
                <a href='/turismo/eventos'>
                  <button type="button" className="btn custom-btn-1">Ver más</button>
                </a>
              </div>
            </Row>
          </div>

          <hr className="separator" />

          <div className='buzon-container'>
            <Row>
              <h1 className='title-section'>BUZÓN CIUDADANO</h1>
            </Row>
            <Row>
              <div className='buzon-content'>
                <div className='buzon-leyenda'>
                    <div>
                      <p>Queremos escucharte, conocer de
                      primera mano las necesidades e
                      inquietudes de la ciudadanía.
                      Utiliza este espacio como
                      herramienta de cercanía que nos
                      ayuda a mantener el trabajo de
                      gobierno al alcance de todas y
                      todos.
                      </p>
                    </div>
                </div>
                <form className='buzon-form' onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nombre"
                      aria-label="nombre"
                      aria-describedby="basic-addon1"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Teléfono"
                      aria-label="telefono"
                      aria-describedby="basic-addon1"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                    />
                  </div>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electrónico"
                    aria-label="correo"
                    aria-describedby="basic-addon1"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Comentarios"
                    aria-label="comentarios"
                    aria-describedby="basic-addon1"
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className='noticia-button-container'>
                  <button type="submit" className="btn custom-btn-1">Enviar</button>
                </div>
              </form>
              </div>
            </Row>
          </div>

        </Col>
      </Row>
    </Container>
  );
}

export default Home;
