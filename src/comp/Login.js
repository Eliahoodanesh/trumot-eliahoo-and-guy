import React from 'react';
import { Link } from 'react-router-dom';
import {Auth} from "../functionsFirebase/AuthUser";

function Login() {
  return (
    <div className='Enter-form login-container'>
      <h1>התחברות</h1>
      <br />
      <Auth/>
      <Link to="/MyForm">
        <button>חזור</button>
      </Link>
    </div>
  );
}

export default Login;