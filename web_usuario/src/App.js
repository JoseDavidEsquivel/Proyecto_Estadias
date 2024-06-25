import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Estilos Generales de la aplicación Web
import './App.css';
import './index.css';

// Importar la forma del layout
import Layout from './components/Layout';
// Importar las paginas para la navegación
import Home from './pages/Home';
import About from './pages/About';

import Principal_turismo from './pages/Turismo/Principal.turismo';

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

import Noticias from './pages/Noticias';
import Dependencia_1 from './pages/Gobierno/Dependencias/Presidencia.dep';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Turismo" element={<Principal_turismo/>} />
      </Routes>
      
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Noticias" element={<Noticias />} />
          <Route path="/About" element={<About />} />

          

          <Route path="/Transparencia" element={<Transparencia/>} />
          <Route path="/Transparencia/Ley_General" element={<Ley_general/>} />
          <Route path="/Transparencia/Conac" element={<Conac/>} />


          <Route path="/Gobierno" element={<Gobierno />} />

          <Route path='/Gobierno/Plan_municipal' element={<Plan_municipal/>} />
          <Route path='/Gobierno/Mision_vision' element={<Mision_vision/>} />
          <Route path="/Gobierno/Directorio" element={<Directorio/>} />


          <Route path="/Gobierno/Dependencias" element={<Depencencias/>} />
          <Route path="/Gobierno/Dependencias/Presidencia_municipal" element={<Dependencia_1/>} />

          <Route path='/Gobierno/Historia_municipio' element={<Historia_menu/>} />
          <Route path="/Gobierno/Historia_municipio/Decreto" element={<Decreto/>} />
          <Route path="/Gobierno/Historia_municipio/Personajes_ilustres" element={<Personajes/>} />
          <Route path="/Gobierno/Hisrotia_municipio/Expresidentes" element={<Expresidentes/>} />


          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
