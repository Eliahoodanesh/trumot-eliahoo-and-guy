import React, { useState } from 'react';
import { Button, Dropdown, FormControl, InputGroup, Container, Row, Col, Card } from 'react-bootstrap';

const areas = ['צפון', 'מרכז', 'דרום'];

export default function Query() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6}>
          <Card className='p-4 shadow'>
            <h1 className='text-center mb-4'>חפש לפי...</h1>
            <Row className='text-center mb-3'>
              <Col sm={6}>
                <Dropdown>
                  <Dropdown.Toggle variant='success' id='dropdown-area' className='w-100'>
                    {selectedArea ? selectedArea : 'אזור'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {areas.map((area, index) => (
                      <Dropdown.Item key={index} onClick={() => handleAreaSelect(area)}>
                        {area}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col sm={6}>
                <InputGroup>
                  <FormControl
                    placeholder='חפש לפי פריט'
                    aria-label='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant='primary' onClick={handleSearch}>
                    חפש
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
