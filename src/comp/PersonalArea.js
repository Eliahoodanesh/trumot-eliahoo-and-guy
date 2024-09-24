import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore, storage } from '../config/Firebase';
import { ref, deleteObject } from 'firebase/storage';

export default function PersonalArea() {
  const [items, setItems] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(firestore, 'items'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(userItems);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [auth]);

  const handleDelete = async (itemId, imageUrls) => {
    try {
      // Delete the item from Firestore
      await deleteDoc(doc(firestore, 'items', itemId));
      
      // Delete associated images from Firebase Storage
      for (let url of imageUrls) {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
      }

      // Remove the item from the UI
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center my-4">האזור האישי שלי</h2>
      {items.length === 0 ? (
        <p className="text-center">לא העלית עדיין פריטים</p>
      ) : (
        <div className="row">
          {items.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5>
                  <p className="card-text">{item.itemDescription}</p>
                  <div className="mb-3">
                    {item.imageUrls && item.imageUrls.map((url, index) => (
                      <img 
                        key={index} 
                        src={url} 
                        alt={item.itemName} 
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                  <button 
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDelete(item.id, item.imageUrls || [])}
                  >
                    מחק פריט
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
