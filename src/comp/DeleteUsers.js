import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from 'firebase/auth';
import { firestore, auth } from '../config/Firebase';
import { Modal, Button } from 'react-bootstrap'; // הוספת הייבוא של Modal ו-Button מ-Bootstrap

export default function DeleteUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // state לניהול ה-Modal
  const [selectedUser, setSelectedUser] = useState(null); // שמירת המשתמש שנבחר למחיקה

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    const { id, uid } = selectedUser;

    try {
      // מחיקת המסמך מה-Firestore
      await deleteDoc(doc(firestore, "users", id));

      // מציאת המשתמש ב-Authentication ומחיקתו
      const userAuth = auth.currentUser;
      if (userAuth) {
        await deleteUser(userAuth);
      }

      // עדכון ה-state לאחר מחיקה
      setUsers(users.filter(user => user.id !== id));
      console.log("המשתמש נמחק לחלוטין");
    } catch (error) {
      console.error("שגיאה במחיקת המשתמש:", error);
    }

    // סגירת ה-Modal לאחר מחיקה
    setShowModal(false);
  };

  const confirmDelete = (user) => {
    setSelectedUser(user); // שמירת המשתמש שנבחר למחיקה
    setShowModal(true); // הצגת ה-Modal
  };

  const handleClose = () => setShowModal(false); // סגירת ה-Modal

  return (
    <div className="container">
      <h2>מחק משתמשים</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            {user.username || "שם לא זמין"}
            <button className="btn btn-danger" onClick={() => confirmDelete(user)}>X</button>
          </li>
        ))}
      </ul>

      {/* Modal לאישור מחיקה */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>אישור מחיקת משתמש</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          האם אתה בטוח שאתה רוצה למחוק את המשתמש הזה?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            לא
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            כן, מחק משתמש
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
