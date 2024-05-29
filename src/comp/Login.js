import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='Enter-form content-container'>
      <h1>התחברות</h1>
      <br />
      <label>
        שם משתמש:
        <input type='text' className='form-control' />
      </label>
      <br />
      <label>
        סיסמא:
        <input type='password' className='form-control' />
      </label>
      <div className="form-check">
        <input className="form-check-input" type="radio" value="user" id="flexRadioDefault1" name="flexRadioDefault" />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          משתמש רגיל
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" value="admin" id="flexRadioDefault2" name="flexRadioDefault" checked />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          מנהל
        </label>
      </div>
      <button>כניסה</button>
      <button>שכחתי סיסמא</button>
    </div>
  );
}

export default Login;
