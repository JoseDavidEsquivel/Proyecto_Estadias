import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Header.css';  // Estilos para el header
import { host } from '../../conexion.js' // Importar el host actual


function Header() {
  const [logoUrl, setLogoUrl] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetch( host + '/logo')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { archivo, ruta } = data[0];
          setLogoUrl(`${ruta}`);
        }
      })
      .catch(error => {
        console.error('Error fetching the logo:', error);
      });
  }, []);

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(dropdown === activeDropdown ? null : dropdown);
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand href="/" className="logo_header">
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            className="d-inline-block align-top"
          />
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown 
            title="Gobierno" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'gobierno' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('gobierno')}
          >
            <NavDropdown.Item href="/gobierno/plan_municipal">Plan Municipal</NavDropdown.Item>
            <NavDropdown.Item href="/gobierno/mision_vision">Misión, Visión</NavDropdown.Item>
            <NavDropdown.Item href="/gobierno/directorio">Directorio</NavDropdown.Item>
            <NavDropdown.Item href="/gobierno/dependencias">Dependencias</NavDropdown.Item>
            <NavDropdown.Item href="/gobierno/historia_municipio">Historia del Municipio</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title="Turismo" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'turismo' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('turismo')}
          >
            <NavDropdown.Item href="/turismo">Turismo</NavDropdown.Item>
            <NavDropdown.Item href="/turismo/eventos">Eventos</NavDropdown.Item>
            <NavDropdown.Item href="/turismo/conoce">Conoce Santiago</NavDropdown.Item>
            <NavDropdown.Item href="/turismo/tips">Tips para Turistas</NavDropdown.Item>
            <NavDropdown.Item href="/turismo/explora">Explora Santiago</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/tramites_servicios">Tramites y Servicios</Nav.Link>
          <NavDropdown 
            title="Transparencia" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'transparencia' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('transparencia')}
          >
            <NavDropdown.Item href="/transparencia/conac">Conac</NavDropdown.Item>
            <NavDropdown.Item href="/transparencia/ley_general">Ley General</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/noticias">Noticias</Nav.Link>
          <Nav.Link href="/encuestas">Encuestas</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
