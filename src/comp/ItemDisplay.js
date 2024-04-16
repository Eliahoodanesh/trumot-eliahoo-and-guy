import React from 'react'

export default function ItemDisplay({imageUrl}) {
  return (
    <div>
      <div className='row'>
          <div className='col-md d-flex align-items-center border p-2'>
            <img src={imageUrl} className='fluid-start me-2 w-25'></img>
            <div className='container-sm'>
              <h5>תורם</h5>
              <br></br>
              <h5>אזור</h5>
              <br></br>
              <h5>טלפון</h5>
              <br></br>
              <h5>תיאור פריט</h5>
              <br></br>
              <h5>סוג פריט</h5>
            </div>
        </div>
      </div>
    </div>
  )
}
