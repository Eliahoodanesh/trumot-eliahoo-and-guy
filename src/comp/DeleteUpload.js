import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase'; // הנחת הקובץ firebaseConfig כולל את ההגדרות של Firebase
import { Modal, Button } from 'react-bootstrap'; // הוספת הייבוא של Modal ו-Button מ-Bootstrap

export default function DeleteUpload() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // state לניהול ה-Modal
  const [selectedItem, setSelectedItem] = useState(null); // שמירת הפריט שנבחר למחיקה

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

  const handleDelete = async () => {
    if (!selectedItem) return;

    await deleteDoc(doc(db, 'items', selectedItem.id)); // מחיקת הפריט מ-Firebase
    setItems(items.filter(item => item.id !== selectedItem.id)); // עדכון הרשימה
    setShowModal(false); // סגירת ה-Modal לאחר המחיקה
  };

  const confirmDelete = (item) => {
    setSelectedItem(item); // שמירת הפריט שנבחר למחיקה
    setShowModal(true); // הצגת ה-Modal
  };

  const handleClose = () => setShowModal(false); // סגירת ה-Modal

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
              <button className="btn btn-danger" onClick={() => confirmDelete(item)}>מחק</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין פריטים זמינים למחיקה.</p>
      )}

      {/* Modal לאישור מחיקה */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>אישור מחיקת פריט</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          האם אתה בטוח שאתה רוצה למחוק את הפריט הזה?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            לא
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            כן, מחק פריט
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
