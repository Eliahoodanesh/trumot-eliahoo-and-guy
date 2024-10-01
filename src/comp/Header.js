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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username); // Set the username if user data exists
          }
        } catch (err) {
          console.error('Error fetching username:', err); // Log error if fetching user data fails
        }
      } else {
        setUsername(''); // Clear username if user is logged out
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
    <div>
      <header className='custom-header d-flex flex-wrap align-items-center justify-content-between'>
        <div className="d-flex flex-wrap align-items-center">
          <img src={photo_trumot} alt='logo' className='App-img'></img> 
          {/* Display the logo image */}
          
          <Link to="/" className='custom-link'>בית</Link> 
          {/* Link to Home page */}
          
          <span className="mx-2"> </span>
          
          <Link to="/Upload" className='custom-link'>העלה פריט</Link> 
          {/* Link to Upload Item page */}
          
          <span className="mx-2"> </span>
          
          <Link to="/About" className='custom-link'>אודות</Link> 
          {/* Link to About page */}
          
          <span className="mx-2"> </span>
          
          <Link to="/Contact" className='custom-link'>צור קשר</Link> 
          {/* Link to Contact page */}
          
          <span className="mx-2"> </span>
          
          <Link to="/Query" className='custom-link'>חפש</Link> 
          {/* Link to Search page */}
          
          <span className="mx-2"> </span>
          
          <Link to="/PersonalArea" className='custom-link'>אזור אישי</Link> 
          {/* Link to Personal Area */}
          
          <span className="mx-2"> </span>
          
          <Link to="/Managers" className='custom-link'>כניסה למנהלים</Link> 
          {/* Link to Admin Login page */}
        </div>
        
        <div className="flex-grow-1 d-flex justify-content-center justify-content-md-end align-items-center">
          {username && <span className="mx-3">שלום, {username}</span>} 
          {/* Display greeting with username if user is logged in */}
          
          <button className="btn btn-primary mx-3" onClick={handleSignOut}>התנתק</button> 
          {/* Logout button */}
        </div>
      </header>
    </div>
  );
}
