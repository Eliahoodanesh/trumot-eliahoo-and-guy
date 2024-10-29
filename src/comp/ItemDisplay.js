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
    console.log("Starting report submission...");
    const reportKey = `reported_${itemName}_${donatingUser}`;

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "reports"), where("itemName", "==", itemName))
      );
      if (!querySnapshot.empty) {
        alert('כבר דיווחת על פריט זה.'); // Already reported
        localStorage.setItem(reportKey, 'true');
        return;
      }
    } catch (error) {
      console.error("Error checking report status: ", error);
      alert('אירעה שגיאה בבדיקת סטטוס הדיווח'); // Error checking report status
      return;
    }

    try {
      await addDoc(collection(db, 'reports'), {
        itemName, 
        donatingUser, 
        city, 
        phoneNum, 
        itemDesc,
        itemNote,
        category
      });
      console.log("Report submitted successfully");
      localStorage.setItem(reportKey, 'true');
      alert('הדיווח נשלח בהצלחה'); // Report submitted successfully
    } catch (error) {
      console.error("Error adding report: ", error);
      alert('אירעה שגיאה בעת שליחת הדיווח'); // Error submitting report
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
