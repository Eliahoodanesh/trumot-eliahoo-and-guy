import React from 'react';

export default function ItemDisplay(props) {
const {imageUrl, donatingUser, region, phoneNum, itemDesc, itemType} = props;

  return (
    <div>
      <div className='row'>
          <div className='col-md d-flex align-items-center border p-2'>
            <img src={imageUrl} className='fluid-start me-2 w-25'></img>
            <div className='container-sm'>
              <h5>תורם : {donatingUser}</h5>
              <br></br>
              <h5>אזור : {region}</h5>
              <br></br>
              <h5>טלפון : {phoneNum}</h5>
              <br></br>
              <h5>תיאור פריט : {itemDesc}</h5>
              <br></br>
              <h5>סוג פריט : {itemType}</h5>
            </div>
        </div>
      </div>
      <br></br>
    </div>
  )
}
