import React, { useEffect, useState } from 'react';
import { firestore } from '../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import photo_trumot from '../img/photo_trumot.jpg';

export default function About() {
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

  if (loading) {
    return <div className='container'><p>Loading...</p></div>;
  }

  if (error) {
    return <div className='container'><p>{error}</p></div>;
  }

  return (
    <div className='container-fluid'>
      <h2>אודות האתר</h2>
      <p>{aboutContent}</p>
      <div className='container text-center'>
        <img src={photo_trumot} alt='logo' className='img-about' />
      </div>
    </div>
  );
}
