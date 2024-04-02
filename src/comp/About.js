import React from 'react';
import { Col, Container, Form, Navbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

export default function About() {
  return (
    <div>
      <Navbar expand="lg" className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='#home'>בית</Navbar.Brand>
          <Navbar.Brand href='#about'>אודות</Navbar.Brand>
          <Navbar.Brand href='#upload'>העלאת פריט</Navbar.Brand>
          <Navbar.Brand href='#contact'>צור קשר</Navbar.Brand>
        </Container>
        <Form inline>
          <Container>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder='חיפוש'
                  className='mr-sm-2'
                />
              </Col>
              <Col xs="auto">
                <Button type='Submit'>חפש</Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Navbar>
      <h2>אודות האתר</h2>
    </div>
  )
}
