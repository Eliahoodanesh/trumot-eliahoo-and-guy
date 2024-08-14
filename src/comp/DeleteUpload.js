import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase'; // הנחת הקובץ firebaseConfig כולל את ההגדרות של Firebase

export default function DeleteUpload() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, 'items');
      const itemSnapshot = await getDocs(itemsCollection);
      const itemList = itemSnapshot.docs.map(doc => ({
        id: doc.id, // לשמירת ה-ID של הפריט כדי שנוכל למחוק אותו
        ...doc.data()
      }));
      setItems(itemList);
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    await deleteDoc(doc(db, 'items', itemId)); // מחיקת הפריט מ-Firebase
    setItems(items.filter(item => item.id !== itemId)); // עדכון הרשימה
  };

  return (
    <div className='container'>
      <h1>מחק פריט</h1>
      {items.length > 0 ? (
        <ul className="list-group">
          {items.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p><strong>פריט:</strong> {item.itemName}</p>
                <p><strong>תורם:</strong> {item.donorName}</p>
                <p><strong>מיקום איסוף:</strong> {item.city}</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>מחק</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין פריטים זמינים למחיקה.</p>
      )}
    </div>
  );
}