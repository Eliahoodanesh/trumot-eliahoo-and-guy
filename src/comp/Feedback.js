import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../config/Firebase'; // Import Firestore from your Firebase.js

export default function Feedback() {
  const [feedback, setFeedback] = useState(''); // State to hold the feedback text
  const [submitted, setSubmitted] = useState(false); // State to track if feedback is submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Add a new feedback document to the 'feedback' collection in Firestore
      await addDoc(collection(firestore, 'feedback'), {
        text: feedback,
        timestamp: serverTimestamp(), // Use Firestore's serverTimestamp function
      });
  
      console.log('Feedback submitted:', feedback);
      setFeedback(''); // Clear the feedback input
      setSubmitted(true); // Update submitted state
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className='container-fluid content-container'>
      <h1>משוב</h1>
      {submitted ? (
        <div className='alert alert-success'>
          תודה על הפידבק שלך!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='feedbackInput' className='form-label'>כתוב את הפידבק שלך כאן:</label>
            <textarea
              id='feedbackInput'
              className='form-control'
              rows='5'
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)} // Update feedback state on input change
              required // Mark as required
            />
          </div>
          <button type='submit' className='btn btn-primary'>שלח פידבק</button>
        </form>
      )}
    </div>
  );
}
