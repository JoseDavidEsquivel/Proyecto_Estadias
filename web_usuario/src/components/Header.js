import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './Header.css';  // Asegúrate de que tus estilos personalizados estén siendo importados

function Header() {
  const [logoUrl, setLogoUrl] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/logo')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { archivo, ruta } = data[0];
          setLogoUrl(`http://localhost:8000/${ruta}${archivo}`);
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
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title="Turismo" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'turismo' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('turismo')}
          >
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title="Tramites y Servicios" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'tramites' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('tramites')}
          >
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown 
            title="Transparencia" 
            id="basic-nav-dropdown" 
            className={`navbar-nav-scroll ${activeDropdown === 'transparencia' ? 'active-dropdown' : ''}`}
            align={{lg:"end"}}
            onClick={() => handleDropdownClick('transparencia')}
          >
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
            <NavDropdown.Item href="#">Sample Text</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/about">Noticias</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
