import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';
import { useLogout } from '../functionsFirebase/AuthUser';
import { auth, firestore } from '../config/Firebase'; // Ensure correct import of auth and firestore
import { doc, getDoc } from 'firebase/firestore';

export default function Header({ onLogout }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      } else {
        setUsername(''); // Clear username if user is logged out
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/MyForm"); // Redirect to MyForm page after logout
      if (onLogout) {
        onLogout();
      }
    } catch (err) {
      console.error('Error signing out:', err);
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <div className='container'>
      <header className='custom-header d-flex flex-wrap align-items-center justify-content-between'>
        <div className="d-flex flex-wrap align-items-center">
          <img src={photo_trumot} alt='logo' className='App-img'></img>
          <Link to="/" className='custom-link'>בית</Link>
          <span className="mx-2"> </span>
          <Link to="/Upload" className='custom-link'>העלה פריט</Link>
          <span className="mx-2"> </span>
          <Link to="/About" className='custom-link'>אודות</Link>
          <span className="mx-2"> </span>
          <Link to="/Contact" className='custom-link'>צור קשר</Link>
          <span className="mx-2"> </span>
          <Link to="/Query" className='custom-link'>חפש</Link>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end align-items-center">
          {username && <span className="mx-3">שלום, {username}</span>}
          <button className="btn btn-primary mx-3" onClick={handleSignOut}>התנתק</button>
        </div>
      </header>
    </div>
  );
}
