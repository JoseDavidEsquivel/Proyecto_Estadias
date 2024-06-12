import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './Layout.css'; // // Estilos para el layout

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container fluid className="d-flex flex-column min-vh-100">
        <Row className="justify-content-center flex-grow-1">
          <Col className="content-padding">
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
