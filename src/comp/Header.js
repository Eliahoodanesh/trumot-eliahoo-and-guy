import React from 'react'
import {Link} from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';

export default function Header() {
  return (
  <div className='container'>
    <header className='custom-header'>
        <img src={photo_trumot} alt='logo' className='App-img'></img>
            <Link to="/" className='custom-link'>בית</Link>
            <span> </span>
            <Link to="/About" className='custom-link'>אודות</Link>
    </header>
    </div>
  )
}
