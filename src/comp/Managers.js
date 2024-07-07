import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Managers() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simulate password check
    if (password === 'admin1') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('סיסמה שגויה');
    }
  };

  if (!loggedIn) {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '25vh' }}>
          <div className="col-md-6">
            <label htmlFor="password">הכנס סיסמה:</label>
            <input
              className='form-control'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className='btn btn-primary mt-3' onClick={handleLogin}>היכנס</button>
            {error && <p className="mt-3" style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      );      
  }

  return (
    <div className='container'>
      <br />
      <Tabs
        defaultActiveKey="editContact"
        id="admin-tabs"
        className="mb-3"
      >
        <Tab eventKey="editContact" title="ערוך צור קשר">
          תוכן לעריכת צור קשר
        </Tab>
        <Tab eventKey="editAbout" title="ערוך אודות">
          תוכן לעריכת אודות
        </Tab>
        <Tab eventKey="deleteUsers" title="מחק משתמשים">
          תוכן למחיקת משתמשים
        </Tab>
      </Tabs>
    </div>
  );
}
