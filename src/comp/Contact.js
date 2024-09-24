import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { firestore } from '../config/Firebase'; // Import Firebase config
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Contact = () => {
  const [contacts, setContacts] = useState([]); // State for contacts

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, "contacts")); // Fetch contacts from Firestore
      const contactsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // Spread contact data
      }));
      setContacts(contactsData); // Update state with fetched data
    };

    fetchData(); // Call function to fetch data
  }, []);

  return (
    <div className='container-fluid'>
      <h2 className='my-4 text-center'>צור קשר</h2>
      {contacts.length > 0 ? ( // Check if there are contacts
        contacts.map(contact => (
          <div key={contact.id} className='mb-4 border p-3 rounded'>
            <h5 className='text-primary'>{contact.name}</h5>
            <p><strong>מייל:</strong> {contact.email}</p>
            <p><strong>טלפון:</strong> {contact.phone}</p>
            <a href={`https://wa.me/${contact.phone}`} target="_blank" rel="noopener noreferrer"> {/* WhatsApp link */}
              <button className='btn btn-success'>
                וואטסאפ
              </button>
            </a>
          </div>
        ))
      ) : (
        <p className='text-center'>טוען...</p> // Loading message
      )}
    </div>
  );
};

export default Contact; // Export component
