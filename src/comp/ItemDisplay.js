import React from 'react';
import { Carousel } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default function ItemDisplay({ 
  imageUrls, 
  donatingUser, 
  city, 
  phoneNum, 
  itemDesc, 
  itemNote, 
  itemName, 
  onEmailUser, 
  donorEmail, 
  category
}) {
  const navigate = useNavigate();
  const db = getFirestore();

  const handleReport = async () => {
    const reportKey = `reported_${itemName}`;

    try {
        // Check if the item has already been reported
        const querySnapshot = await getDocs(query(collection(db, "report"), where("itemName", "==", itemName)));
        if (!querySnapshot.empty) {
            alert('כבר דיווחת על פריט זה.');
            localStorage.setItem(reportKey, 'true');
            return;
        }
    } catch (error) {
        console.error("Error checking report status: ", error);
        alert('אירעה שגיאה בבדיקת סטטוס הדיווח');
        return;
    }

    try {
        // Add the report to Firebase
        const docRef = await addDoc(collection(db, 'report'), {
            itemName, 
            donatingUser, 
            city, 
            phoneNum, 
            itemDesc,
            itemNote,
        });
        console.log("Report added with ID: ", docRef.id);
        localStorage.setItem(reportKey, 'true');
        alert('הדיווח נשלח בהצלחה');
    } catch (error) {
        console.error("Error adding report: ", error);
        alert(`אירעה שגיאה בעת שליחת הדיווח: ${error.message}`);
    }
};


  return (
    <Card className='h-100'>
      {/* Carousel to display images */}
      <Carousel>
        {imageUrls && imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img 
              src={url} 
              alt={itemName} 
              className='d-block w-100 img-fluid' 
              style={{ maxHeight: '200px', objectFit: 'contain' }} 
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{itemName}</Card.Title> {/* Item name */}
        <Card.Text>
          <strong>תורם:</strong> {donatingUser}<br /> {/* Donating user */}
          <strong>מיקום איסוף:</strong> {city}<br /> {/* Pickup location */}
          <strong>טלפון:</strong> {phoneNum}<br /> {/* Phone number */}
          <strong>תיאור פריט:</strong> {itemDesc}<br /> {/* Item description */}
          <strong>הערות:</strong> {itemNote}<br /> {/* Item notes */}
        </Card.Text>
        <div className="d-flex justify-content-between">
          {/* Button to contact donor via email */}
          <button className='btn btn-primary' onClick={() => onEmailUser(donorEmail)}>
            צור קשר באמצעות מייל
          </button>
          {/* Button to report the item */}
          <button className='btn btn-danger' onClick={handleReport}>
            דווח
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
