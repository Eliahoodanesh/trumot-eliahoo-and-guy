import React from 'react';
import { Link } from 'react-router-dom';
import {Auth} from "../functionsFirebase/AuthUser";

function Login() {
  return (
    <div className='Enter-form content-container'>
      <h1>התחברות</h1>
      <br />
      <Auth/>
      <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
      <label class="form-check-label" for="flexSwitchCheckDefault">אני מנהל</label>
      </div>
      <Link to="/MyForm">
        <button>חזור</button>
      </Link>
    </div>
  );
}

export default Login;