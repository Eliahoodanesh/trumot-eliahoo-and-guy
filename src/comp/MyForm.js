import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import photo_trumot from '../img/photo_trumot.jpg';

function MyForm() {
  return (
    <div className='Enter-form'>
      <h1>ברוכים הבאים!</h1>
      <img src={photo_trumot} alt='logo' className='App-img'></img>
      <Link to="/Login">
      <button type='button' className='btn btn-primary'>התחברות</button>
      </Link>
      <Link to="/Register">
      <button type='button' className='btn btn-primary'>הרשמה</button>
      </Link>
      <br></br>
    </div>
  );
}

export default MyForm;
