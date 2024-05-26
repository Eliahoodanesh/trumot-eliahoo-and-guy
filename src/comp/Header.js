import React from 'react';
import { Link } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';
import Search from './Search';

export default function Header() {
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
        </div>
        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end"> {/* Center the Search component and align to end on medium and larger screens */}
          <Search />
        </div>
      </header>
    </div>
  )
}
