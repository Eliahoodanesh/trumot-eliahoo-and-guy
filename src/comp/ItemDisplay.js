import React from 'react';
import { Carousel } from 'react-bootstrap'; // או כל ספריית קרוסלה אחרת שתשתמש בה

export default function ItemDisplay({ imageUrls, donatingUser, city, phoneNum, itemDesc, itemName, onEmailUser, donorEmail }) {
  return (
    <div className='item mb-3'>
      <div className='col-md d-flex align-items-center border p-2'>
        <Carousel>
          {imageUrls && imageUrls.map((url, index) => (
            <Carousel.Item key={index}>
              <img src={url} alt={itemName} className='d-block w-100 img-fluid' style={{ maxHeight: '300px', objectFit: 'cover' }} />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className='container-sm'>
          <h6>תורם: {donatingUser}</h6>
          <br />
          <h6>מיקום איסוף: {city}</h6>
          <br />
          <h6>טלפון: {phoneNum}</h6>
          <br />
          <h6>תיאור פריט: {itemDesc}</h6>
          <br />
          <h6>שם פריט: {itemName}</h6>
          <br />
          <button className='btn btn-primary' onClick={() => onEmailUser(donorEmail)}>צור קשר באמצעות מייל</button>
        </div>
      </div>
    </div>
  );
}
