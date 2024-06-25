// import React, { useState, useEffect } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './Personajes.ilustres.css'; // Estilos para la pagina landing Home
// import { host } from '../../conexion.js'; // Importar el host actual
// import document_pdf from '../../static/documents/PMD SANTIAGO TULANTEPEC ACTUALIZACION.pdf'
import Navigator from '../../../components/Navigator/Navigator.js';

function Personajes() {
    const navigatorLinks = [
        { name: 'Inicio', path: '/', current: false },
        { name: 'Gobierno', path: '/Gobierno', current: false },
        { name: 'Historia del Municipio', path: '/Gobierno/Historia_municipio', current: false },
        { name: 'Decreto del Municipio', path: '/Gobierno/Historia_municipio/Decreto', current: true },
      ];

    return (
        <Container className="p-5 my-5 rounded-3">
            <Row className="mt-5">
                <Col>
                    <Navigator links={navigatorLinks}/>

                    <hr className="separator" />

                    <div className='personajes-container'>
                        <Row>
                            <h1 className='title-section'>PERSONAJES ILUSTRES</h1>
                        </Row>
                        <Row>
                            <div>
                                <p>Dentro del Municipio, a lo largo de su historia se encuentran diversos personajes ilustres, quienes destacaron por sus obras en beneficio
                                de su comunidad.</p>
                            </div>
                            <div className='personajes-child'>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Rosendo León Morales</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Introduce los primeros autobuses que ofrece el transporte en el municipio, ya que en esta época se transportaban
    en carretas. Posteriormente se organizaron más personas interesadas en mejorar el transporte y fundan una
    cooperativa a la cual ponen por nombre "Héroes de la Revolución", y surge la agrupación que consigue
    concesiones de transporte en la modalidad de taxis y colectivos.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Martín Urrutía Ezcurra</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Empresario de origen Vasco, cursó sus primeros estudios en una escuela de Aldoz, en Larraun y más tarde asistió
a un internado en Sumbilla. Destacó por la creación de una importante industria textil de inigualable calidad en
sus productos y de una fuente de trabajo que por más de 100 años ha sido el sostén de muchas familias. De
alguna manera esta fábrica atrajo a muchas familias a vivir en el pequeño pueblo de Santiago a fines del siglo XIX.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Martín Urrutía Ezcurra y su esposa la Sra. Carmen Lanzagorta de Urrutia</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Dueños de la fábrica Santiago, financian la construcción de las escuelas primarias que llevan sus nombres,
posteriormente sus herederos hacen lo mismo para las escuelas Centro Escolar Tulantepec y la escuela
secundaria de este municipio.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Don Cristóbal Olvera Arriaga</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Funda la primera asociación de charros del municipio.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Raúl García Mondragón</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Realiza una gira por la Unión Americana, representando al charro mexicano y enalteciendo el nombre de México,
                                        de Hidalgo y sobre todo del municipio de Santiago Tulantepec.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Conrado Muntane</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>De origen español, organiza y dirige los primeros equipos de fútbol, representado a Santiago y ganando varios
                                        torneos.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Profesor Abundio Álvarez Meléndez</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Gran músico local, aporta su conocimiento para engrandecer el acervo cultural de este municipio.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Profesor Porfirio García León</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Mentor de primaria y secundaria en las asignaturas de Biología y Química. Junto con otras personas inicia la
fundación de la Col. Francisco Villa, realizando pagos de su bolsillo para la pavimentación de algunas calles y
mantenimiento del jardín de esa colonia.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Arturo Cárdenas Moreno</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Destacado futbolista, beisbolista pero sobre todo atleta, obtuvo varios campeonatos de maratón en la categoría
                                        master.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Galdino Alarcón Quintero</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Practicó el ciclismo desde el año de 1961 hasta 1975; en 1977 se inició en el fisicoculturismo con una trayectoria
de 3 años logrando el 3er lugar a nivel nacional en el Congreso Mister México en la categoría de veteranos. En
1980 obtuvo el título Mr. Hidalgo en la categoría juvenil.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Heriberto Bautista Vargas</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>Se inició en el fisicoculturismo en el año 1968, en julio de 1979 obtuvo el título Mister Estado de Hidalgo y en
septiembre del mismo año el de Mister Pachuca posteriormente en el año de 1980 obtuvo un segundo lugar en
Mister Atlántico en la Ciudad de Poza Rica, Veracruz. El 28 de Octubre de 1979 ganó el título de Mister México y
trofeo en el concurso Nacional de Fisicoculturismo, dentro de la categoría alta.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='subtitle-section'>
                                        <p>Sr. Brígido Barrón Rodríguez</p>
                                    </div>
                                    <div className='personajes-content'>
                                        <p>En 1936 gestionó la construcción del puente de Av. México y Niños Héroes y electrificación del municipio.</p>
                                    </div>
                                </div>

                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default Personajes;