import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';
import { useLogout } from '../functionsFirebase/AuthUser';
import { auth, firestore } from '../config/Firebase'; // Corrected path to firebase.js
import { doc, getDoc } from 'firebase/firestore';

export default function HeaderAdmin({ onLogout }) {
  const [AdminName, setAdminName] = useState('');
  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'admins', user.uid));
          if (userDoc.exists()) {
            setAdminName(userDoc.data().AdminName);
          }
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      } else {
        setAdminName('');
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/login");
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
          <Link to="/admin-dashboard/edit-about" className='custom-link'>לערוך אודות</Link>
          <span className="mx-2"> </span>
          <Link to="/admin-dashboard/manage-users" className='custom-link'>ערוך משתמשים</Link>
          <span className="mx-2"> </span>
          <Link to="/admin-dashboard/add-admin" className='custom-link'>הוספת מנהל</Link>
          <span className="mx-2"> </span>
          <Link to="/admin-dashboard/edit-contact" className='custom-link'>ערוך צור קשר</Link>
        </div>
        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end align-items-center">
          {AdminName && <span className="mx-3">שלום, המנהל {AdminName}</span>}
          <button className="btn btn-primary mx-3" onClick={handleSignOut}>התנתק</button>
        </div>
      </header>
    </div>
  );
}
