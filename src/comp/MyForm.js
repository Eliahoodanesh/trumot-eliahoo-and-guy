import React from 'react';
import { Link } from 'react-router-dom';

function MyForm() {
  return (
    <div className='Enter-form'>
      <h1>ברוכים הבאים!</h1>
      <br></br>
      <Link to="/login"><button>התחברות</button></Link>
      <br></br>
      <Link to="/register"><button>הרשמה</button></Link>
    </div>
  );
}

export default MyForm;
