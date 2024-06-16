import React from 'react';

export default function ItemDisplay(props) {
const {imageUrl, donatingUser, city, phoneNum, itemDesc, itemName} = props;

  return (
    <div className='item'>
          <div className='col-md d-flex align-items-center border p-2'>
            <img src={imageUrl} className='fluid-start me-2 w-25'></img>
            <div className='container-sm'>
              <h6>תורם : {donatingUser}</h6>
              <br></br>
              <h6>עיר : {city}</h6>
              <br></br>
              <h6>טלפון : {phoneNum}</h6>
              <br></br>
              <h6>תיאור פריט : {itemDesc}</h6>
              <br></br>
              <h6>שם פריט : {itemName}</h6>
            </div>
        </div>
    </div>
  )
}
