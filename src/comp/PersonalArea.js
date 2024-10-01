import React, { useState, useEffect } from 'react'; // Import necessary hooks and libraries
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { getAuth } from 'firebase/auth'; // Import authentication methods
import { firestore, storage } from '../config/Firebase'; // Import Firestore and Storage configuration
import { ref, deleteObject } from 'firebase/storage'; // Import Storage methods for deleting files

export default function PersonalArea() {
  const [items, setItems] = useState([]); // State to store user items
  const auth = getAuth(); // Get the current authentication state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const user = auth.currentUser; // Get the currently logged-in user
        if (user) {
          // Create a query to fetch items for the current user
          const q = query(collection(firestore, 'items'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q); // Execute the query
          const userItems = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(), // Get the item data
          }));
          setItems(userItems); // Update state with user items
        }
      } catch (error) {
        console.error('Error fetching items:', error); // Log any errors
      }
    };

    fetchItems(); // Fetch items on component mount
  }, [auth]);

  const handleDelete = async (itemId, imageUrls) => {
    try {
      // Delete the item from Firestore
      await deleteDoc(doc(firestore, 'items', itemId));
      
      // Delete associated images from Firebase Storage
      for (let url of imageUrls) {
        const imageRef = ref(storage, url); // Create a reference to the image
        await deleteObject(imageRef); // Delete the image from storage
      }

      // Remove the item from the UI
      setItems(prevItems => prevItems.filter(item => item.id !== itemId)); // Update state to remove the deleted item
    } catch (error) {
      console.error('Error deleting item:', error); // Log any errors
      alert('Failed to delete item. Please try again.'); // Alert user on failure
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center my-4">האזור האישי שלי</h2> {/* Personal area title */}
      {items.length === 0 ? ( // Check if the user has any items
        <p className="text-center">לא העלית עדיין פריטים</p> // Message if no items are present
      ) : (
        <div className="row"> {/* Render user items */}
          {items.map(item => (
            <div key={item.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{item.itemName}</h5> {/* Item name */}
                  <p className="card-text">{item.itemDescription}</p> {/* Item description */}
                  <div className="mb-3">
                    {item.imageUrls && item.imageUrls.map((url, index) => ( // Render item images
                      <img 
                        key={index} 
                        src={url} 
                        alt={item.itemName} 
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: '150px', objectFit: 'cover' }} // Image styling
                      />
                    ))}
                  </div>
                  <button 
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDelete(item.id, item.imageUrls || [])} // Delete item on button click
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
