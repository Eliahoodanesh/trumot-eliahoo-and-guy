import React from 'react';
import { Carousel } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Import Firestore methods

export default function ItemDisplay({ imageUrls, donatingUser, city, phoneNum, itemDesc, itemNote, itemName, onEmailUser, donorEmail }) {
  const navigate = useNavigate();
  const db = getFirestore(); // Get a reference to the Firestore database

  const handleReport = async () => {
    const reportKey = `reported_${itemName}`;
  
    // בדיקה בפיירבייס אם יש כבר דיווח
    const querySnapshot = await getDocs(query(collection(db, "reports"), where("itemName", "==", itemName)));
    if (!querySnapshot.empty) {
      alert('כבר דיווחת על פריט זה.');
      localStorage.setItem(reportKey, 'true'); // סמן גם ב-localStorage
      return;
    }
  
    try {
      // הוסף את הדיווח לפיירבייס
      const docRef = await addDoc(collection(db, 'reports'), {
        itemName, 
        donatingUser, 
        city, 
        phoneNum, 
        itemDesc,
        itemNote
      });
      console.log("Document written with ID: ", docRef.id);
  
      // שמור את המידע ב-localStorage
      localStorage.setItem(reportKey, 'true');
  
      alert('הדיווח נשלח בהצלחה');
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('אירעה שגיאה בעת שליחת הדיווח');
    }
  };
  

  return (
    <Card className='h-100'>
      <Carousel>
        {imageUrls && imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img src={url} alt={itemName} className='d-block w-100 img-fluid' style={{ maxHeight: '200px', objectFit: 'contain' }} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text>
          <strong>תורם:</strong> {donatingUser}<br />
          <strong>מיקום איסוף:</strong> {city}<br />
          <strong>טלפון:</strong> {phoneNum}<br />
          <strong>תיאור פריט:</strong> {itemDesc}<br/>
          <strong>הערות:</strong>{itemNote}
        </Card.Text>
        <div className="d-flex justify-content-between">
          <button className='btn btn-primary' onClick={() => onEmailUser(donorEmail)}>צור קשר באמצעות מייל</button>
          <button className='btn btn-danger' onClick={handleReport}>דווח</button>
        </div>
      </Card.Body>
    </Card>
  );
}
