import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css'; // // Estilos para el layout

import ChatbotComponent from './ChatBot/ChatBot';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <Container fluid className="d-flex flex-column fade-in">
        <Row className="justify-content-center flex-grow-1">
          <ChatbotComponent className='chatbot-font'></ChatbotComponent>
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
