import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';


function MyForm() {
  return (
    <div className='Enter-form'>
      <h1>ברוכים הבאים!</h1>
      <br></br>
      <button onClick={handleLogin}>התחברות</button>
      <br></br>
      <button onClick={handleRegister}>הרשמה</button>
    </div>
  );
}

function handleLogin() {
  // מנהל כניסה למערכת
  <Link to={Login}></Link>
  // יכול להיות כאן קוד לפתיחת חלון כניסה או התקשרות ל-API
}

function handleRegister() {
  // מנהל הרשמה למערכת
  console.log('הרשמה נלחצה');
  // יכול להיות כאן קוד לפתיחת חלון הרשמה או התקשרות ל-API
}

export default MyForm;
