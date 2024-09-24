import React, { useState, useEffect } from 'react';
import { signUp } from '../functionsFirebase/AuthUser'; // ייבוא נכון של פונקציית signUp
import { useNavigate } from 'react-router-dom';

function Register() {
  const [cities, setCities] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const apiUrl = "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1272";

  const navigate = useNavigate();
  
  // Fetching cities from API
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cityRecords = data.result.records.map(record => ({ id: record._id, name: record['שם_ישוב'] }));
        setCities(cityRecords);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }
    fetchCities();
  }, []);

  // Function for signing up the user
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("הסיסמאות אינן תואמות!");
      return;
    }

    // Checking if all fields are filled
    if (!firstName || !lastName || !location || !phoneNumber || !email || !username || !password) {
      alert("נא למלא את כל השדות");
      return;
    }

    try {
      await signUp(firstName, lastName, location, phoneNumber, email, username, password); 
      alert("משתמש נרשם בהצלחה");
      navigate("/"); // Redirecting to homepage after successful registration
    } catch (error) {
      console.error("שגיאה בהרשמה:", error);
    }
  };

  return (
    <div className='Enter-form-register login-container container-fluid'>
      <h1>הרשמה</h1>
      <br />
      <div className='container'>
        {/* Personal Details */}
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              שם פרטי:
              <input type='text' className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              שם משפחה:
              <input type='text' className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>
        </div>

        {/* Location and Phone */}
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              מיקום בארץ:
              <select className='form-control' value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value='' disabled>בחר אזור בארץ</option>
                {cities.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              מספר טלפון:
              <input 
                type='text' 
                className='form-control' 
                value={phoneNumber} 
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                    setPhoneNumber(value);
                  }
                }} 
              />
            </label>
          </div>
        </div>

        {/* Email and Username */}
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              אימייל:
              <input type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              שם משתמש:
              <input type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
          </div>
        </div>

        {/* Password and Confirm Password */}
        <div className='row'>
          <div className='col-sm-6'>
            <label>
              סיסמא:
              <input type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <div className='col-sm-6'>
            <label>
              אימות סיסמא:
              <input type='password' className='form-control' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <br />
      {/* Sign Up Button */}
      <button className='btn btn-primary' onClick={handleSignUp}>הרשמה</button>
    </div>
  );
}

export default Register;
