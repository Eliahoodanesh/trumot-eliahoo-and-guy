import React, { useState, useEffect } from 'react';

export default function ContactEditor() {
  const [contact1, setContact1] = useState({ name: '', phone: '', email: '' });
  const [contact2, setContact2] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    // Load the contact details from localStorage or backend
    const storedContact1 = JSON.parse(localStorage.getItem('contact1')) || { name: 'אליהו דאנש', phone: '052-5721369', email: 'danesheliahoo@gmail.com' };
    const storedContact2 = JSON.parse(localStorage.getItem('contact2')) || { name: 'גיא ברכה', phone: '052-5914445', email: 'guy.bracha@gmail.com' };
    setContact1(storedContact1);
    setContact2(storedContact2);
  }, []);

  const handleSave = () => {
    // Save the contact details to localStorage or backend
    localStorage.setItem('contact1', JSON.stringify(contact1));
    localStorage.setItem('contact2', JSON.stringify(contact2));
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
