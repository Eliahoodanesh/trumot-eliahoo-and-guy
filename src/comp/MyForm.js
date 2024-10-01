import React from 'react'; // Import React library
import { Link } from 'react-router-dom'; // Import Link component for navigation
import '../App.css'; // Import custom CSS styles
import photo_trumot from '../img/photo_trumot.jpg'; // Import logo image

function MyForm() {
  return (
    <div className='Enter-form login-container text-center container-fluid'> {/* Main container with styling */}
      <h1 className='mb-4'>ברוכים הבאים!</h1> {/* Welcome message */}
      <img src={photo_trumot} alt='logo' className='App-img mb-4' /> {/* Logo image */}
      
      <p className='lead mb-4'>
        האתר שלנו נועד לעזור לאנשים לתרום ציוד זה לזה בקלות. <br />
        הצטרפו אלינו והתחילו לעזור לקהילה כבר עכשיו! {/* Description of the website's purpose */}
      </p>

      <Link to="/Login" className='mx-2'> {/* Link to login page */}
        <button type='button' className='btn btn-primary'>התחברות</button> {/* Login button */}
      </Link>
      <Link to="/Register" className='mx-2'> {/* Link to registration page */}
        <button type='button' className='btn btn-primary'>הרשמה</button> {/* Registration button */}
      </Link>
    </div>
  );
}

export default MyForm; // Export the MyForm component
