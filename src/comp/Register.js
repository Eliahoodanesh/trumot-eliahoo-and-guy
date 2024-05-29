import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className='Enter-form-register content-container'>
      <h1>הרשמה</h1>
      <br />
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              שם פרטי:
              <input type='text' className='form-control' />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              שם משפחה:
              <input type='text' className='form-control' />
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              מיקום בארץ:
              <input type='text' className='form-control' />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              מספר טלפון:
              <input type='text' className='form-control' />
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              שם משתמש:
              <input type='text' className='form-control' />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              סיסמא:
              <input type='password' className='form-control' />
            </label>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-sm-6'>
            <label>
              אימות סיסמא:
              <input type='password' className='form-control' />
            </label>
          </div>
        </div>
      </div>
      <br />
      <button className='btn btn-primary'>הרשמה</button>
    </div>
  );
}

export default Register;
