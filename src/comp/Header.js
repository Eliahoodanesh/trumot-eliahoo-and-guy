import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import photo_trumot from '../img/photo_trumot.jpg';
import '../App.css';
import { useLogout } from '../functionsFirebase/AuthUser';
import { auth, firestore } from '../config/Firebase'; // Ensure correct import of auth and firestore
import { doc, getDoc } from 'firebase/firestore';

export default function Header({ onLogout }) {
  const [username, setUsername] = useState(''); // State to store the username
  const navigate = useNavigate(); // useNavigate hook for navigation
  const { logout } = useLogout(); // Custom hook to handle logout
  const [profileImage, setProfileImage] = useState(''); // State to store the profile image URL

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUsername(data.username); // Set the username
            setProfileImage(data.profileImage || ''); // Set the profile image URL, if exists
          }
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      } else {
        setUsername(''); // Clear username if user is logged out
        setProfileImage(''); // Clear profile image if user is logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription when component unmounts
  }, []);

  const handleSignOut = async () => {
    try {
      await logout(); // Call the logout function
      navigate("/MyForm"); // Redirect to MyForm page after logout
      if (onLogout) {
        onLogout(); // Call the onLogout callback if provided
      }
    } catch (err) {
      console.error('Error signing out:', err); // Log error if logout fails
      alert('Failed to sign out. Please try again.'); // Show alert on logout failure
    }
  };

  return (
    <header className='custom-header d-flex flex-wrap align-items-center justify-content-between p-3'>
      <div className="d-flex align-items-center">
        <img src={photo_trumot} alt='logo' className='App-img me-2' style={{ width: '50px', height: '50px' }} />
        <nav className="d-flex flex-wrap">
          <Link to="/" className='custom-link mx-2'>בית</Link>
          <Link to="/Upload" className='custom-link mx-2'>העלה פריט</Link>
          <Link to="/About" className='custom-link mx-2'>אודות</Link>
          <Link to="/Contact" className='custom-link mx-2'>צור קשר</Link>
          <Link to="/Query" className='custom-link mx-2'>חפש</Link>
          <Link to="/PersonalArea" className='custom-link mx-2'>אזור אישי</Link>
          <Link to="/Feedback" className='custom-link mx-2'>משוב</Link>
          <Link to="/Managers" className='custom-link mx-2'>כניסה למנהלים</Link>
        </nav>
      </div>
      <div className="d-flex align-items-center">
        {profileImage && (
          <img src={profileImage} alt="Profile" className="rounded-circle" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
        )}
        {username && (
          <Link to="/profile" className="mx-3 custom-link">שלום, {username}</Link>
        )}
        <button className="btn btn-primary mx-3" onClick={handleSignOut}>התנתק</button>
      </div>
    </header>
  );
}
