import React from 'react';
import { Carousel } from 'react-bootstrap'; // Importing Bootstrap Carousel for image display
import Card from 'react-bootstrap/Card'; // Importing Bootstrap Card component
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Import Firestore methods

export default function ItemDisplay({ imageUrls, donatingUser, city, phoneNum, itemDesc, itemNote, itemName, onEmailUser, donorEmail, category }) {
  const navigate = useNavigate();
  const db = getFirestore(); // Get a reference to the Firestore database

  const handleReport = async () => {
    const reportKey = `reported_${itemName}`; // Create a unique key for localStorage to track reported items
  
    // Check in Firebase if the item has already been reported
    const querySnapshot = await getDocs(query(collection(db, "reports"), where("itemName", "==", itemName)));
    if (!querySnapshot.empty) {
      alert('כבר דיווחת על פריט זה.');
      localStorage.setItem(reportKey, 'true'); // Mark as reported in localStorage
      return;
    }
  
    try {
      // Add report to Firebase
      const docRef = await addDoc(collection(db, 'reports'), {
        itemName, 
        donatingUser, 
        city, 
        phoneNum, 
        itemDesc,
        itemNote,
        category
      });
      console.log("Document written with ID: ", docRef.id);
  
      // Save the report status in localStorage
      localStorage.setItem(reportKey, 'true');
  
      alert('הדיווח נשלח בהצלחה'); // Report submitted successfully message
    } catch (e) {
      console.error("Error adding document: ", e);
      alert('אירעה שגיאה בעת שליחת הדיווח'); // Error handling message
    }
  };

  return (
    <Card className='h-100'>
      {/* Carousel to display images */}
      <Carousel>
        {imageUrls && imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img src={url} alt={itemName} className='d-block w-100 img-fluid' style={{ maxHeight: '200px', objectFit: 'contain' }} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{itemName}</Card.Title> {/* Item name */}
        <Card.Text>
          <strong>תורם:</strong> {donatingUser}<br /> {/* Donating user */}
          <strong>מיקום איסוף:</strong> {city}<br /> {/* Pickup location */}
          <strong>טלפון:</strong> {phoneNum}<br /> {/* Phone number */}
          <strong>תיאור פריט:</strong> {itemDesc}<br/> {/* Item description */}
          <strong>הערות: </strong> {itemNote} <br/>{/* Item notes */}
          <strong>קטגוריה: </strong>{category}
        </Card.Text>
        <div className="d-flex justify-content-between">
          {/* Button to contact donor via email */}
          <button className='btn btn-primary' onClick={() => onEmailUser(donorEmail)}>צור קשר באמצעות מייל</button>
          {/* Button to report the item */}
          <button className='btn btn-danger' onClick={handleReport}>דווח</button>
        </div>
      </Card.Body>
    </Card>
  );
}
