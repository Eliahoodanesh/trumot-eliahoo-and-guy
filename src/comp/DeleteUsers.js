import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from '../config/Firebase'; // תיקון הייבוא של firestore

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

  const handleDelete = async (id) => {
    await deleteDoc(doc(firestore, "users", id));
    setUsers(users.filter(user => user.id !== id));
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
