import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="p-5 my-5 bg-light rounded-3">
      <Row>
        <Col>
          <h1>Welcome to My Website</h1>
          <p>
            This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
