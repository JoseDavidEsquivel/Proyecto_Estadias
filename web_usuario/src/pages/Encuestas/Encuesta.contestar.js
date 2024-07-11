import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Encuesta.contestar.css'; // Estilos para la página landing Home
import { host } from '../../conexion.js'; // Importar el host actual

function Encuesta_contestar() {
  const { id_encuesta } = useParams(); // Obtener el id_encuesta de los params
  const [encuesta, setEncuesta] = useState(null);
  const [respuestas, setRespuestas] = useState({});

  useEffect(() => {
    fetch(`${host}/buscador_encuesta/${id_encuesta}`)
      .then(response => response.json())
      .then(data => setEncuesta(data))
      .catch(error => console.error('Error fetching the survey:', error));
  }, [id_encuesta]);

  const handleChange = (e, idPregunta, idOpcion) => {
    const { name, value, type, checked } = e.target;

    setRespuestas(prevRespuestas => {
      if (type === 'checkbox') {
        const opciones = prevRespuestas[idPregunta] || [];
        if (checked) {
          return {
            ...prevRespuestas,
            [idPregunta]: [...opciones, idOpcion]
          };
        } else {
          return {
            ...prevRespuestas,
            [idPregunta]: opciones.filter(op => op !== idOpcion)
          };
        }
      } else {
        return {
          ...prevRespuestas,
          [name]: type === 'radio' ? idOpcion : value
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const [idPregunta, respuesta] of Object.entries(respuestas)) {
        const pregunta = encuesta.preguntas.find(p => p.id_pregunta === parseInt(idPregunta));
        
        if (pregunta.tipo === 'text') {
          await fetch(`${host}/respuesta_abierta/crear`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_pregunta: pregunta.id_pregunta,
              id_encuesta: encuesta.id_encuesta,
              respuesta,
            }),
          });
        } else if (pregunta.tipo === 'radio') {
          await fetch(`${host}/respuesta_cerrada/crear`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_opcion: respuesta,
              id_pregunta: pregunta.id_pregunta,
              id_encuesta: encuesta.id_encuesta,
            }),
          });
        } else if (pregunta.tipo === 'checkbox') {
          for (const idOpcion of respuesta) {
            await fetch(`${host}/respuesta_cerrada/crear`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_opcion: idOpcion,
                id_pregunta: pregunta.id_pregunta,
                id_encuesta: encuesta.id_encuesta,
              }),
            });
          }
        }
      }
      alert('Respuestas enviadas correctamente.');
    } catch (error) {
      console.error('Error submitting responses:', error);
      alert('Hubo un error al enviar las respuestas.');
    }
  };

  if (!encuesta) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="p-5 my-5 rounded-3">
      <Row className="mt-5">
        <Col>
          <form onSubmit={handleSubmit}>
            <div className='encuesta-titulo-container'>
              <div className='encuesta-titulo-decoracion'></div>
              <p className='encuesta-titulo'>{encuesta.titulo}</p>
            </div>
            
            {encuesta.preguntas.map(pregunta => (
              <div key={pregunta.id_pregunta} className='encuesta-pregunta-container'>
                <div className='encuesta-pregunta-content'>
                  <div className='encuesta-pregunta'>
                    <label>{pregunta.pregunta}</label>
                  </div>
                  <div className='encuesta-pregunta-opciones'>
                    {pregunta.tipo === 'text' && (
                      <div className='encuesta-opcion'>
                        <input
                          className='encuesta-texto'
                          type="text"
                          name={pregunta.id_pregunta}
                          placeholder='Tu respuesta'
                          onChange={(e) => handleChange(e, pregunta.id_pregunta)}
                        />
                      </div>
                    )}
                    {pregunta.tipo === 'radio' && (
                      pregunta.opciones.map(opcion => (
                        <div key={opcion.id_opcion} className='encuesta-opcion'>
                          <input
                            className='form-check-input'
                            type="radio"
                            id={`opcion-${opcion.id_opcion}`}
                            name={pregunta.id_pregunta}
                            value={opcion.opcion}
                            onChange={(e) => handleChange(e, pregunta.id_pregunta, opcion.id_opcion)}
                          />
                          <label htmlFor={`opcion-${opcion.id_opcion}`}>{opcion.opcion}</label>
                        </div>
                      ))
                    )}
                    {pregunta.tipo === 'checkbox' && (
                      pregunta.opciones.map(opcion => (
                        <div key={opcion.id_opcion} className='encuesta-opcion'>
                          <input
                            className='form-check-input'
                            type="checkbox"
                            id={`opcion-${opcion.id_opcion}`}
                            name={pregunta.id_pregunta}
                            value={opcion.opcion}
                            onChange={(e) => handleChange(e, pregunta.id_pregunta, opcion.id_opcion)}
                          />
                          <label htmlFor={`opcion-${opcion.id_opcion}`}>{opcion.opcion}</label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className='encuesta-button-container'>
                {/* <Button type="submit" className="btn custom-btn-form">Enviar</Button> */}
                <button type="submit" className='btn custom-btn-form'>Enviar</button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Encuesta_contestar;



