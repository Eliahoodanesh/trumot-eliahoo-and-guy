import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from 'firebase/auth';
import { firestore, auth } from '../config/Firebase';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from Bootstrap

export default function DeleteUsers() {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [showModal, setShowModal] = useState(false); // State to manage Modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // Holds the user selected for deletion

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const usersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Extract user data from Firestore document
      }));
      setUsers(usersList); // Set the list of users in state
    };

    fetchUsers(); // Fetch users when component mounts
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) return; // Exit if no user is selected
    
    const { id, uid } = selectedUser; // Extract selected user's ID and UID

    try {
      await deleteDoc(doc(firestore, "users", id)); // Delete user document from Firestore

      const userAuth = auth.currentUser;
      if (userAuth) {
        await deleteUser(userAuth); // Delete user from Firebase Authentication
      }

      setUsers(users.filter(user => user.id !== id)); // Update users state to remove the deleted user
      console.log("המשתמש נמחק לחלוטין"); // Log success message in Hebrew
    } catch (error) {
      console.error("שגיאה במחיקת המשתמש:", error); // Log error message in Hebrew
    }

    setShowModal(false); // Close the modal after deletion
  };

  const confirmDelete = (user) => {
    setSelectedUser(user); // Set the selected user for deletion
    setShowModal(true); // Open the modal for confirmation
  };

  const handleClose = () => setShowModal(false); // Close the modal

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

      <Modal show={showModal} onHide={handleClose}> {/* Modal for delete confirmation */}
        <Modal.Header closeButton>
          <Modal.Title>אישור מחיקת משתמש</Modal.Title> {/* Modal title in Hebrew */}
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
