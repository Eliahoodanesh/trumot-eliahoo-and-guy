import React from 'react'

export default function Error() {
  return (
    <div className='container'>
        <h1 className='text-center'>
        סליחה, דף זה לא קיים
        </h1> 
        {/* Display error message in Hebrew */}
        
        <div className='text-center'>
        <img src={"https://cdn-icons-png.flaticon.com/512/755/755014.png"} className='img-fluid'></img>
        {/* Display image with 'img-fluid' class for responsive design */}
        </div>
    </div>
  )
}
