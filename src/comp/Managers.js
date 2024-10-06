import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab'; // Import Tab component from React Bootstrap
import Tabs from 'react-bootstrap/Tabs'; // Import Tabs component from React Bootstrap
import ContactEditor from './ContactEditor'; // Import the ContactEditor component
import AboutEditor from './AboutEditor'; // Import the AboutEditor component
import DeleteUsers from './DeleteUsers'; // Import the DeleteUsers component
import Report from './Report'; // Import the Report component
import DeleteUpload from './DeleteUpload'; // Import the DeleteUpload component
import FeedbackManager from './FeedbackManager';

export default function Managers() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track if user is logged in
  const [password, setPassword] = useState(''); // State to store the password input
  const [error, setError] = useState(''); // State to store error messages

  const handleLogin = () => {
    // Simulate password check
    if (password === 'admin1') { // Check if the password is correct
      setLoggedIn(true); // Set loggedIn to true if password matches
      setError(''); // Clear any previous error messages
    } else {
      setError('סיסמה שגויה'); // Set error message for incorrect password
    }
  };

  if (!loggedIn) { // If user is not logged in, show the login form
    return (
      <div className="content-container container d-flex justify-content-center align-items-center" style={{ height: '25vh' }}>
        <div className="col-md-6">
          <label htmlFor="password">הכנס סיסמה:</label> {/* Label for password input */}
          <input
            className='form-control'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
          />
          <button className='btn btn-primary mt-3' onClick={handleLogin}>היכנס</button> {/* Button to submit password */}
          {error && <p className="mt-3" style={{ color: 'red' }}>{error}</p>} {/* Show error message if exists */}
        </div>
      </div>
    );      
  }

  return (
    <div className='content-container'>
      <br />
      <Tabs
        defaultActiveKey="editContact" // Set default active tab
        id="admin-tabs"
        className="mb-3"
      >
        <Tab eventKey="editContact" title="ערוך צור קשר"> {/* Tab for editing contact information */}
          <ContactEditor />
        </Tab>
        <Tab eventKey="editAbout" title="ערוך אודות"> {/* Tab for editing about information */}
          <AboutEditor />
        </Tab>
        <Tab eventKey="deleteUsers" title="מחק משתמשים"> {/* Tab for deleting users */}
          <DeleteUsers />
        </Tab>
        <Tab eventKey="report" title="דווח"> {/* Tab for reporting */}
          <Report/>
        </Tab>
        <Tab eventKey="deteleUpload" title="מחק פריטים"> {/* Tab for deleting uploads */}
          <DeleteUpload/>
        </Tab>
        <Tab eventKey="feedbacks" title="משובים"> {/* Tab for deleting uploads */}
          <FeedbackManager/>
        </Tab>
      </Tabs>
    </div>
  );
}
