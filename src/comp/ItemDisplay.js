import React from 'react';

export default function ItemDisplay({ imageUrl, donatingUser, city, phoneNum, itemDesc, itemName, onEmailUser }) {
  return (
    <div className='item'>
      <div className='col-md d-flex align-items-center border p-2'>
        <img src={imageUrl} alt={itemName} className='fluid-start me-2 w-25' />
        <div className='container-sm'>
          <h6>תורם: {donatingUser}</h6>
          <br />
          <h6>עיר: {city}</h6>
          <br />
          <h6>טלפון: {phoneNum}</h6>
          <br />
          <h6>תיאור פריט: {itemDesc}</h6>
          <br />
          <h6>שם פריט: {itemName}</h6>
          <br />
          <button className='btn btn-primary' onClick={onEmailUser}>צור קשר באמצעות מייל</button>
        </div>
      </div>
    </div>
  );
}
