import React, { useEffect, useState } from 'react';
import { firestore } from '../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import photo_trumot from '../img/photo_trumot.jpg';

export default function About() {
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    async function fetchAboutContent() {
      const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa');
      const aboutDoc = await getDoc(aboutRef);

      if (aboutDoc.exists()) {
        setAboutContent(aboutDoc.data().content);
      }
    }

    fetchAboutContent();
  }, []);

  return (
    <div className='container'>
      <h2>אודות האתר</h2>
      <p>{aboutContent}</p>
      <div className='container text-center'>
        <img src={photo_trumot} alt='logo' className='img-about'></img>
      </div>
    </div>
  );
}
