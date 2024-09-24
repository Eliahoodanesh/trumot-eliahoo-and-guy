import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase'; // Import Firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

export default function AboutEditor() {
  const [aboutContent, setAboutContent] = useState(''); // State for "About" content
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa'); // Reference to document
        const aboutDoc = await getDoc(aboutRef); // Fetch the document

        if (aboutDoc.exists()) {
          setAboutContent(aboutDoc.data().about || 'No content available.'); // Update state
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
  }, []);

  const handleSave = async () => {
    try {
      const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa'); // Reference for saving
      await setDoc(aboutRef, { about: aboutContent }); // Save updated content
      console.log('Saving about content:', aboutContent); // Log save action
      alert('Content saved successfully!'); // Success message
    } catch (err) {
      console.error('Error saving about content:', err); // Log error
      alert('Failed to save content.'); // Error message
    }
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>; // Loading message
  }

  if (error) {
    return <div className="container"><p>{error}</p></div>; // Error message
  }

  return (
    <div className="container">
      <h2>ערוך אודות</h2>
      <textarea
        className="form-control"
        rows="10"
        value={aboutContent}
        onChange={(e) => setAboutContent(e.target.value)} // Update content on change
      />
      <button className="btn btn-primary mt-3" onClick={handleSave}>Save</button> {/* Save button */}
    </div>
  );
}
