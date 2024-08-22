import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../config/Firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <h2 className='my-4 text-center'>צור קשר</h2>
      {contacts.length > 0 ? (
        contacts.map(contact => (
          <div key={contact.id} className='mb-4 border p-3 rounded'>
            <h5 className='text-primary'>{contact.name}</h5>
            <p><strong>אימייל:</strong> {contact.email}</p>
            <p><strong>טלפון:</strong> {contact.phone}</p>
          </div>
        ))
      ) : (
        <p className='text-center'>טוען נתונים...</p>
      )}
    </div>
  );
};

export default Contact;
