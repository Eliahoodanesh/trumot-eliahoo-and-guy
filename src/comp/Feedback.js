import React, { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState(''); // State to hold the feedback text
  const [submitted, setSubmitted] = useState(false); // State to track if feedback is submitted

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Here, you can handle the feedback submission (e.g., send to your server or Firestore)
    console.log('Feedback submitted:', feedback);
    setFeedback(''); // Clear the feedback input
    setSubmitted(true); // Update submitted state
  };

  return (
    <div className='container content-container'>
      <h1>משוב</h1>
      {submitted ? ( // Conditional rendering based on submission status
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
