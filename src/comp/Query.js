import React from 'react'
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap'

export default function Query() {
  return (
    <div className='container'>
      <h1>חפש לפי...</h1>
      <div className='container-sm text-center'>
        <div className='row'>
            <div className='col-sm-6 mb-3'>
                <Dropdown>
                    <Dropdown.Toggle variant='success' id='dropdown-basic'>
                        אזור
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>צפון</Dropdown.Item>
                        <Dropdown.Item>מרכז</Dropdown.Item>
                        <Dropdown.Item>דרום</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='col-sm-6 mb-3'>
            <Dropdown>
                <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    פריט
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <InputGroup>
                    <FormControl
                        placeholder='חפש לפי פריט'
                        aria-label='search'
                    />
                    <Button>חפש</Button>
                    </InputGroup>
                </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
      </div>
    </div>
  )
}
