import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
// import Sidebar from './Sidebar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col md={2}>
          </Col>
          <Col md={10}>
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
