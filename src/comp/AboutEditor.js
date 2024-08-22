import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function AboutEditor() {
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

  const handleSave = async () => {
    const aboutRef = doc(firestore, 'content', 'hUv0Qdo9FQQom5TcoUMa');
    await setDoc(aboutRef, { content: aboutContent });
    console.log('Saving about content:', aboutContent);
  };

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
