import React from 'react';
import { Link } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';

export default function Header({onLogout}) {
  return (
    <div className='container'>
      <header className='custom-header d-flex flex-wrap align-items-center justify-content-between'>
        <div className="d-flex flex-wrap align-items-center">
          <img src={photo_trumot} alt='logo' className='App-img'></img>
          <Link to="/" className='custom-link'>בית</Link>
          <span className="mx-2"> </span>
          <Link to="/Upload" className='custom-link'>העלה פריט</Link>
          <span className="mx-2"> </span>
          <Link to="/About" className='custom-link'>אודות</Link>
          <span className="mx-2"> </span>
          <Link to="/Contact" className='custom-link'>צור קשר</Link>
          <span className="mx-2"> </span>
          <Link to="/Query" className='custom-link'>חפש</Link>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end">
          <Link to="MyForm"><button className="btn btn-primary mx-3" onClick={onLogout}>התנתק</button></Link>
        </div>
      </header>
    </div>
  )
}
