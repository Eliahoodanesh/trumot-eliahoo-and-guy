import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AboutEditor() {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAboutContent() {
      try {
        const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa');
        const aboutDoc = await getDoc(aboutRef);

        if (aboutDoc.exists()) {
          setAboutContent(aboutDoc.data().about || 'No content available.');
        } else {
          setAboutContent('No content available.');
        }
      } catch (err) {
        setError('Failed to fetch content.');
        console.error('Error fetching about content:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAboutContent();
  }, []);

  const handleSave = async () => {
    try {
      const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa');
      await setDoc(aboutRef, { about: aboutContent });
      console.log('Saving about content:', aboutContent);
      alert('Content saved successfully!');
    } catch (err) {
      console.error('Error saving about content:', err);
      alert('Failed to save content.');
    }
  };

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <div className="container">
      <h2>ערוך אודות</h2>
      <textarea
        className="form-control"
        rows="10"
        value={aboutContent}
        onChange={(e) => setAboutContent(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleSave}>שמור</button>
    </div>
  );
}
