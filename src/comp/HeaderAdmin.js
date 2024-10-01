import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';
import { useLogout } from '../functionsFirebase/AuthUser';
import { auth, firestore } from '../config/Firebase'; // Corrected path to firebase.js
import { doc, getDoc } from 'firebase/firestore';

export default function HeaderAdmin({ onLogout }) {
  const [AdminName, setAdminName] = useState(''); // State to store the admin name
  const navigate = useNavigate(); // Hook for navigation
  const { logout } = useLogout(); // Custom hook for logout functionality

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'admins', user.uid));
          if (userDoc.exists()) {
            setAdminName(userDoc.data().AdminName); // Set admin name if found in Firestore
          }
        } catch (err) {
          console.error('Error fetching username:', err); // Log error if fetching fails
        }
      } else {
        setAdminName(''); // Clear admin name if not authenticated
      }
    });
  
    return () => unsubscribe(); // Cleanup subscription when component unmounts
  }, []);

  const handleSignOut = async () => {
    try {
      await logout(); // Perform logout
      navigate("/login"); // Redirect to login page after logout
      if (onLogout) {
        onLogout(); // Trigger additional logout callback if passed
      }
    } catch (err) {
      console.error('Error signing out:', err); // Log error if signout fails
      alert('Failed to sign out. Please try again.'); // Alert the user if logout fails
    }
  };

  return (
    <div className='container'>
      <header className='custom-header d-flex flex-wrap align-items-center justify-content-between'>
        <div className="d-flex flex-wrap align-items-center">
          <img src={photo_trumot} alt='logo' className='App-img'></img> 
          {/* Logo image */}
          
          <Link to="/admin-dashboard/edit-about" className='custom-link'>לערוך אודות</Link> 
          {/* Link to edit "About" section */}
          
          <span className="mx-2"> </span>
          
          <Link to="/admin-dashboard/manage-users" className='custom-link'>ערוך משתמשים</Link> 
          {/* Link to manage users */}
          
          <span className="mx-2"> </span>
          
          <Link to="/admin-dashboard/add-admin" className='custom-link'>הוספת מנהל</Link> 
          {/* Link to add a new admin */}
          
          <span className="mx-2"> </span>
          
          <Link to="/admin-dashboard/edit-contact" className='custom-link'>ערוך צור קשר</Link> 
          {/* Link to edit "Contact Us" section */}
        </div>

        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end align-items-center">
          {AdminName && <span className="mx-3">שלום, המנהל {AdminName}</span>} 
          {/* Display admin greeting if AdminName is available */}
          
          <button className="btn btn-primary mx-3" onClick={handleSignOut}>התנתק</button> 
          {/* Logout button */}
        </div>
      </header>
    </div>
  );
}
