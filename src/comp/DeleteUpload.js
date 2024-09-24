import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../config/Firebase'; // Assuming the Firebase config file contains the settings for Firebase
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from Bootstrap

export default function DeleteUpload() {
  const [items, setItems] = useState([]); // State to store items
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [selectedItem, setSelectedItem] = useState(null); // State to store the selected item for deletion

  useEffect(() => {
    const fetchItems = async () => {
      const itemsCollection = collection(db, 'items'); // Reference to the 'items' collection in Firestore
      const itemSnapshot = await getDocs(itemsCollection); // Fetch documents from the collection
      const itemList = itemSnapshot.docs.map(doc => ({
        id: doc.id, // Store the document ID for deletion
        ...doc.data() // Spread the document data into an object
      }));
      setItems(itemList); // Update state with the fetched items
    };

    fetchItems(); // Call the function to fetch items on component mount
  }, []);

  const handleDelete = async () => {
    if (!selectedItem) return; // If no item is selected, exit the function

    await deleteDoc(doc(db, 'items', selectedItem.id)); // Delete the selected item from Firebase
    setItems(items.filter(item => item.id !== selectedItem.id)); // Update the list to remove the deleted item
    setShowModal(false); // Close the modal after deletion
  };

  const confirmDelete = (item) => {
    setSelectedItem(item); // Store the selected item for deletion
    setShowModal(true); // Show the modal for confirmation
  };

  const handleClose = () => setShowModal(false); // Close the modal

  return (
    <div className='container'>
      <h1>מחק פריט</h1>
      {items.length > 0 ? ( // Check if there are items to display
        <ul className="list-group">
          {items.map(item => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p><strong>פריט:</strong> {item.itemName}</p> {/* Display the item name */}
                <p><strong>תורם:</strong> {item.donorName}</p> {/* Display the donor's name */}
                <p><strong>מיקום איסוף:</strong> {item.city}</p> {/* Display the pickup location */}
              </div>
              <button className="btn btn-danger" onClick={() => confirmDelete(item)}>מחק</button> {/* Delete button */}
            </li>
          ))}
        </ul>
      ) : (
        <p>אין פריטים זמינים למחיקה.</p> // Message when there are no items available for deletion
      )}

      {/* Modal for deletion confirmation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>אישור מחיקת פריט</Modal.Title> {/* Modal title for deletion confirmation */}
        </Modal.Header>
        <Modal.Body>
          האם אתה בטוח שאתה רוצה למחוק את הפריט הזה? {/* Confirmation message */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            לא {/* Button to cancel deletion */}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            כן, מחק פריט {/* Button to confirm deletion */}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
