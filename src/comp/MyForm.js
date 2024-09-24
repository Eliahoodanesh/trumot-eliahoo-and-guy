import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import photo_trumot from '../img/photo_trumot.jpg';

function MyForm() {
  return (
    <div className='Enter-form login-container text-center container-fluid'>
      <h1 className='mb-4'>ברוכים הבאים!</h1>
      <img src={photo_trumot} alt='logo' className='App-img mb-4' />
      
      <p className='lead mb-4'>
        האתר שלנו נועד לעזור לאנשים לתרום ציוד זה לזה בקלות. <br />
        הצטרפו אלינו והתחילו לעזור לקהילה כבר עכשיו!
      </p>

      <Link to="/Login" className='mx-2'>
        <button type='button' className='btn btn-primary'>התחברות</button>
      </Link>
      <Link to="/Register" className='mx-2'>
        <button type='button' className='btn btn-primary'>הרשמה</button>
      </Link>
    </div>
  );
}

export default MyForm;
