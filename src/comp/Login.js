import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { Auth } from "../functionsFirebase/AuthUser"; // Import the Auth component

function Login() {
  return (
    <div className='Enter-form login-container container-fluid'>
      <h1>התחברות</h1> {/* Login page header */}
      <br />
      {/* Rendering the Auth component, which likely handles authentication logic */}
      <Auth />
      {/* Link back to "MyForm" page */}
      <Link to="/MyForm">
        <button>חזור</button> {/* "Back" button */}
      </Link>
    </div>
  );
}

export default Login;
