import React from 'react';

export default function ItemDisplay(props) {
const {imageUrl, donatingUser, region, phoneNum, itemDesc, itemType} = props;

  return (
    <div>
          <div className='col-md d-flex align-items-center border p-2'>
            <img src={imageUrl} className='fluid-start me-2 w-25'></img>
            <div className='container-sm'>
              <h6>תורם : {donatingUser}</h6>
              <br></br>
              <h6>אזור : {region}</h6>
              <br></br>
              <h6>טלפון : {phoneNum}</h6>
              <br></br>
              <h6>תיאור פריט : {itemDesc}</h6>
              <br></br>
              <h6>סוג פריט : {itemType}</h6>
            </div>
        </div>
      <br></br>
    </div>
  )
}
