import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  const svgIcon = (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#ffffff"
          d="M32,0C18.746,0,8,10.746,8,24c0,5.219,1.711,10.008,4.555,13.93c0.051,0.094,0.059,0.199,0.117,0.289l16,24
            C29.414,63.332,30.664,64,32,64s2.586-0.668,3.328-1.781l16-24c0.059-0.09,0.066-0.195,0.117-0.289C54.289,34.008,56,29.219,56,24
            C56,10.746,45.254,0,32,0z M32,32c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S36.418,32,32,32z"
        ></path>
      </g>
    </svg>
  );

  return (
    <footer className="footer mt-5 p-4">
      <Container>
        <Row>
          <Col className="footer-section">
            <img src="static/images/white.png" alt="Footer Image" className="footer-image" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Col>
          <Col className="footer-section">
            <div className="footer-paragraph">
              {svgIcon}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="footer-paragraph">
              {svgIcon}
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Col>
          <Col className="footer-section">
            <ul className="footer-list">
              <li><a href="#">Sample Link</a></li>
              <li><a href="#">Sample Link</a></li>
              <li><a href="#">Sample Link</a></li>
              <li><a href="#">Sample Link</a></li>
              <li><a href="#">Sample Link</a></li>
            </ul>
          </Col>
          <Col className="footer-section">
            <p>Lorem Ipsum</p>
            <div className="footer-icons">
              {svgIcon}
              {svgIcon}
              {svgIcon}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
