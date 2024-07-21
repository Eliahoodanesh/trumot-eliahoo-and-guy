import React, { useEffect, useState } from 'react';

export default function Contact() {
  const [contact1, setContact1] = useState({ name: '', phone: '', email: '' });
  const [contact2, setContact2] = useState({ name: '', phone: '', email: '' });

  useEffect(() => {
    // Load the contact details from localStorage or backend
    const storedContact1 = JSON.parse(localStorage.getItem('contact1')) || { name: 'אליהו דאנש', phone: '052-5721369', email: 'danesheliahoo@gmail.com' };
    const storedContact2 = JSON.parse(localStorage.getItem('contact2')) || { name: 'גיא ברכה', phone: '052-5914445', email: 'guy.bracha@gmail.com' };
    setContact1(storedContact1);
    setContact2(storedContact2);
  }, []);

  return (
    <div className="container">
      <h1 className="mt-5">צור קשר</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3>{contact1.name} - {contact1.phone}</h3>
              <h3>{contact1.email}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3>{contact2.name} - {contact2.phone}</h3>
              <h3>{contact2.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
