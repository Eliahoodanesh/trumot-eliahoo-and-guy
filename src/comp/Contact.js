import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../config/Firebase';

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "contacts"));
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setContacts(contactsData);
    };

    fetchData();
  }, []);

  return (
    <div className='container'>
      <h2>צור קשר</h2>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact.id}>
            <p>שם: {contact.name}</p>
            <p>אימייל: {contact.email}</p>
            <p>טלפון: {contact.phone}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>טוען נתונים...</p>
      )}
    </div>
  );
};

export default Contact;
