import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Estilos Generales de la aplicación Web
import './App.css';
import './index.css';

// Importar la forma del layout
import Layout from './components/Layout';
// Importar las paginas para la navegación
import Home from './pages/Home';

import Principal_turismo from './pages/Turismo/Principal.turismo';
import Eventos from './pages/Turismo/Eventos';
import Eventos_detalle from './pages/Turismo/Evento.detalle';
import Conoce from './pages/Turismo/Conoce';
import Explora from './pages/Turismo/Explora';
import Explora_categoria from './pages/Turismo/Explora/Explora.categoria'
import Explora_detalle from './pages/Turismo/Explora/Explora.detalle';
import Tips from './pages/Turismo/Tips';


import Transparencia from './pages/Transparencia';
import Ley_general from './pages/Transparencia/Ley.general';
import Conac from './pages/Transparencia/Conac';


import Gobierno from './pages/Gobierno'
import Plan_municipal from './pages/Gobierno/Plan.municipal';
import Directorio from './pages/Gobierno/Directorio';
import Mision_vision from './pages/Gobierno/Mision.vision';
import Depencencias from './pages/Gobierno/Dependencias';

import Historia_menu from './pages/Gobierno/Historia.menu';
import Decreto from './pages/Gobierno/Historia/Decreto';
import Personajes from './pages/Gobierno/Historia/Personajes.ilustres';
import Expresidentes from './pages/Gobierno/Historia/Expresidentes';

import Presidencia_municipal from './pages/Gobierno/Dependencias/Presidencia.dep';
import Agua_potable from './pages/Gobierno/Dependencias/Agua.potable';
import Dif from './pages/Gobierno/Dependencias/Dif';
import Bibliotecas from './pages/Gobierno/Dependencias/Bibliotecas';
import Seguridad from './pages/Gobierno/Dependencias/Seguridad';
import Proteccion from './pages/Gobierno/Dependencias/Proteccion';

import Noticias from './pages/Noticias/Noticias';
import Noticia_detalle from './pages/Noticias/Noticia.detalle';


import Tramites from './pages/Tramites/Tramites';
import Tramites_detalles from './pages/Tramites/Tramite.detalle';
import Encuesta_lista from './pages/Encuestas/Encuestas';
import Encuesta_contestar from './pages/Encuestas/Encuesta.contestar';
import Conac_trimestre from './pages/Transparencia/Conac.trimestre';
import Historia from './pages/Gobierno/Historia/Historia';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/turismo" element={<Principal_turismo/>} />
        <Route path="/turismo/eventos" element={<Eventos/>} />
        <Route path="/turismo/conoce" element={<Conoce/>} />
        <Route path="/turismo/tips" element={<Tips/>} />
        <Route path="/turismo/explora" element={<Explora/>} />
        <Route path="/turismo/explora/:categoria" element={<Explora_categoria />} />
        <Route path="/turismo/explora/:categoria/:id_explora" element={<Explora_detalle />} />
        {/* <Route path="/Turismo/Eventos/:id_evento" element={<Eventos_detalle />} /> */}

        <Route path="/noticias" element={<Noticias/>} />
      </Routes>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turismo/eventos/:id_evento" element={<Eventos_detalle />} />
          <Route path="/noticias/:id_noticia" element={<Noticia_detalle />} />

          <Route path="/transparencia" element={<Transparencia/>} />
          <Route path="/transparencia/ley_General" element={<Ley_general/>} />
          <Route path="/transparencia/conac" element={<Conac/>} />
          <Route path="/transparencia/conac/:tomo/:year/:trimestre" element={<Conac_trimestre/>} />

          <Route path="/gobierno" element={<Gobierno />} />

          <Route path='/gobierno/plan_municipal' element={<Plan_municipal/>} />
          <Route path='/gobierno/mision_vision' element={<Mision_vision/>} />
          <Route path="/gobierno/directorio" element={<Directorio/>} />

          <Route path="/gobierno/dependencias" element={<Depencencias/>} />
          <Route path="/gobierno/dependencias/presidencia_municipal" element={<Presidencia_municipal/>} />
          <Route path="/gobierno/dependencias/agua_potable" element={<Agua_potable/>} />
          <Route path="/gobierno/dependencias/dif" element={<Dif/>} />
          <Route path="/gobierno/dependencias/bibliotecas" element={<Bibliotecas/>} />
          <Route path="/gobierno/dependencias/seguridad" element={<Seguridad/>} />
          <Route path="/gobierno/dependencias/proteccion_civil" element={<Proteccion/>} />

          <Route path='/gobierno/historia_municipio' element={<Historia_menu/>} />
          <Route path="/gobierno/historia_municipio/decreto" element={<Decreto/>} />
          <Route path="/gobierno/historia_municipio/personajes_ilustres" element={<Personajes/>} />
          <Route path="/gobierno/historia_municipio/expresidentes" element={<Expresidentes/>} />
          <Route path="/gobierno/historia_municipio/historia" element={<Historia/>} />


          <Route path="/tramites_servicios" element={<Tramites/>} />
          <Route path="/tramites_servicios/:documento" element={<Tramites_detalles/>} />

          <Route path="/encuestas" element={<Encuesta_lista/>} />
          <Route path="/encuestas/:id_encuesta" element={<Encuesta_contestar/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
