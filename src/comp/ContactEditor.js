import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase'; // Import Firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore functions

export default function ContactEditor() {
  const [contact1, setContact1] = useState({ name: '', phone: '', email: '' }); // State for contact 1
  const [contact2, setContact2] = useState({ name: '', phone: '', email: '' }); // State for contact 2

  useEffect(() => {
    async function fetchContacts() {
      const contact1Ref = doc(firestore, 'contacts', 'hceD7mx4vyCg2vn1iCSf'); // Reference for contact 1
      const contact2Ref = doc(firestore, 'contacts', 'J1TrM6CfE7s8T74jmpQm'); // Reference for contact 2
      const contact1Doc = await getDoc(contact1Ref); // Fetch contact 1
      const contact2Doc = await getDoc(contact2Ref); // Fetch contact 2

      if (contact1Doc.exists()) setContact1(contact1Doc.data()); // Set contact 1 data
      if (contact2Doc.exists()) setContact2(contact2Doc.data()); // Set contact 2 data
    }

    fetchContacts(); // Call function to fetch contacts
  }, []);

  const handleSave = async () => {
    const contact1Ref = doc(firestore, 'contacts', 'hceD7mx4vyCg2vn1iCSf'); // Reference for contact 1
    const contact2Ref = doc(firestore, 'contacts', 'J1TrM6CfE7s8T74jmpQm'); // Reference for contact 2

    await setDoc(contact1Ref, contact1); // Save contact 1
    await setDoc(contact2Ref, contact2); // Save contact 2

    console.log('Saving contact details:', contact1, contact2); // Log saved contacts
  };

  return (
    <div className="container">
      <h2>ערוך צור קשר</h2>
      <div className="row">
        <div className="col-md-6">
          <label>שם:</label>
          <input
            type="text"
            className="form-control"
            value={contact1.name}
            onChange={(e) => setContact1({ ...contact1, name: e.target.value })} // Update name for contact 1
          />
          <label>טלפון:</label>
          <input
            type="text"
            className="form-control"
            value={contact1.phone}
            onChange={(e) => setContact1({ ...contact1, phone: e.target.value })} // Update phone for contact 1
          />
          <label>מייל:</label>
          <input
            type="text"
            className="form-control"
            value={contact1.email}
            onChange={(e) => setContact1({ ...contact1, email: e.target.value })} // Update email for contact 1
          />
        </div>
        <div className="col-md-6">
          <label>שם:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.name}
            onChange={(e) => setContact2({ ...contact2, name: e.target.value })} // Update name for contact 2
          />
          <label>טלפון:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.phone}
            onChange={(e) => setContact2({ ...contact2, phone: e.target.value })} // Update phone for contact 2
          />
          <label>מייל:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.email}
            onChange={(e) => setContact2({ ...contact2, email: e.target.value })} // Update email for contact 2
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSave}>Save</button> {/* Save button */}
    </div>
  );
}
