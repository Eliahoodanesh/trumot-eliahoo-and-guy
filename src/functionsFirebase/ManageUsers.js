import React, { useState, useEffect } from 'react';
import { firestore, db } from '../config/Firebase'; // ייבא את firestore מהקובץ firebase.js
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = await getDocs(collection(firestore, 'users'));
      setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const removeUser = async (userId) => {
    await deleteDoc(doc(firestore, 'users', userId));
  };

  const promoteToAdmin = async (userId) => {
    await updateDoc(doc(firestore, 'users', userId), { isAdmin: true });
  };

  return (
    <div className='container'>
      <h2>Manage Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button class="btn btn-danger" onClick={() => removeUser(user.id)}>Remove</button>
            <button class="btn btn-success" onClick={() => promoteToAdmin(user.id)}>Promote to Admin</button>
            <p>{user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
