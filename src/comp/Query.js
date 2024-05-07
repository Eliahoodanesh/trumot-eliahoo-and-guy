import React, { useState } from 'react';
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';

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
    <div className='container'>
      <h1>חפש לפי...</h1>
      <div className='container-sm text-center'>
        <div className='row'>
          <div className='col-sm-6 mb-3'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-area'>
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
          </div>
          <div className='col-sm-6 mb-3'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-item'>
                פריט
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <InputGroup>
                  <FormControl
                    placeholder='חפש לפי פריט'
                    aria-label='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button onClick={handleSearch}>חפש</Button>
                </InputGroup>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
