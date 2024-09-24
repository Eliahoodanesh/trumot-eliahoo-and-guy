import React, { useEffect, useState } from 'react';
import { firestore } from '../config/Firebase'; // Import Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import photo_trumot from '../img/photo_trumot.jpg'; // Import the website image

export default function About() {
  const [aboutContent, setAboutContent] = useState(''); // State for "About" content
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa'); // Reference to "About" document
        const aboutDoc = await getDoc(aboutRef); // Fetch the document

        if (aboutDoc.exists()) {
          setAboutContent(aboutDoc.data().about || 'No content available.'); // Update content
        } else {
          setAboutContent('No content available.'); // Default message
        }
      } catch (err) {
        setError('Failed to fetch content.'); // Set error message
        console.error('Error fetching about content:', err); // Log error
      } finally {
        setLoading(false); // Update loading state
      }
    }

    fetchAboutContent(); // Call function to fetch content
  }, []); // Run once on mount

  if (loading) {
    return <div className='container'><p>טוען...</p></div>; // Loading message
  }

  if (error) {
    return <div className='container'><p>{error}</p></div>; // Error message
  }

  return (
    <div className='container-fluid'>
      <h2>אודות האתר</h2>
      <p>{aboutContent}</p>
      <div className='container text-center'>
        <img src={photo_trumot} alt='logo' className='img-about' /> {/* Display image */}
      </div>
    </div>
  );
}
