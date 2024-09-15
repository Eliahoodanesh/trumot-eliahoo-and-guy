import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteUser } from 'firebase/auth';
import { firestore, auth } from '../config/Firebase'; // תיקון הייבוא של firestore

export default function DeleteUsers() {
  const [users, setUsers] = useState([]);

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

  const handleDelete = async (id, uid) => {
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
  };

  return (
    <div className="container">
    <h2>מחק משתמשים</h2>
    <ul className="list-group">
      {users.map(user => (
        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
          {user.username || "שם לא זמין"}
          <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>X</button>
        </li>
      ))}
    </ul>
  </div>
  );
}
