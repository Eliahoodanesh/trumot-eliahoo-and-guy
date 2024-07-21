import React from 'react';
import { Carousel } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function ItemDisplay({ imageUrls, donatingUser, city, phoneNum, itemDesc, itemName, onEmailUser, donorEmail }) {
  return (
    <Card className='h-100'>
      <Carousel>
        {imageUrls && imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img src={url} alt={itemName} className='d-block w-100 img-fluid' style={{ maxHeight: '200px', objectFit: 'contain' }} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text>
          <strong>תורם:</strong> {donatingUser}<br />
          <strong>מיקום איסוף:</strong> {city}<br />
          <strong>טלפון:</strong> {phoneNum}<br />
          <strong>תיאור פריט:</strong> {itemDesc}
        </Card.Text>
        <button className='btn btn-primary' onClick={() => onEmailUser(donorEmail)}>צור קשר באמצעות מייל</button>
      </Card.Body>
    </Card>
  );
}
