import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function ContactEditor() {
  const [contact1, setContact1] = useState({ name: '', phone: '', email: '' });
  const [contact2, setContact2] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    async function fetchContacts() {
      const contact1Ref = doc(firestore, 'contacts', 'hceD7mx4vyCg2vn1iCSf');
      const contact2Ref = doc(firestore, 'contacts', 'J1TrM6CfE7s8T74jmpQm');
      const contact1Doc = await getDoc(contact1Ref);
      const contact2Doc = await getDoc(contact2Ref);

      if (contact1Doc.exists()) setContact1(contact1Doc.data());
      if (contact2Doc.exists()) setContact2(contact2Doc.data());
    }

    fetchContacts();
  }, []);

  const handleSave = async () => {
    const contact1Ref = doc(firestore, 'contacts', 'hceD7mx4vyCg2vn1iCSf');
    const contact2Ref = doc(firestore, 'contacts', 'J1TrM6CfE7s8T74jmpQm');

    await setDoc(contact1Ref, contact1);
    await setDoc(contact2Ref, contact2);

    console.log('Saving contact details:', contact1, contact2);
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
            onChange={(e) => setContact1({ ...contact1, name: e.target.value })}
          />
          <label>טלפון:</label>
          <input
            type="text"
            className="form-control"
            value={contact1.phone}
            onChange={(e) => setContact1({ ...contact1, phone: e.target.value })}
          />
          <label>אימייל:</label>
          <input
            type="text"
            className="form-control"
            value={contact1.email}
            onChange={(e) => setContact1({ ...contact1, email: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label>שם:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.name}
            onChange={(e) => setContact2({ ...contact2, name: e.target.value })}
          />
          <label>טלפון:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.phone}
            onChange={(e) => setContact2({ ...contact2, phone: e.target.value })}
          />
          <label>אימייל:</label>
          <input
            type="text"
            className="form-control"
            value={contact2.email}
            onChange={(e) => setContact2({ ...contact2, email: e.target.value })}
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSave}>שמור</button>
    </div>
  );
}
