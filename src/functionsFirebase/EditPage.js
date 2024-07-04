import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase'; // Ensure the correct path to your firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore';

const EditPage = ({ page }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!page) {
      console.error('Page prop is undefined');
      return;
    }

    const fetchContent = async () => {
      const docRef = doc(firestore, 'pages', page);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContent(docSnap.data().content);
      }
    };

    fetchContent();
  }, [page]);

  const saveContent = async () => {
    if (!page) {
      console.error('Page prop is undefined');
      return;
    }
    await setDoc(doc(firestore, 'pages', page), { content });
  };

  if (!page) {
    return <div>Error: Page prop is undefined</div>;
  }

  return (
    <div className='container'>
      <h2>Edit {page.charAt(0).toUpperCase() + page.slice(1)} Page</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={saveContent}>Save</button>
    </div>
  );
};

export default EditPage;
