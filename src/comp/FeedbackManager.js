import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../config/Firebase';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal and Button

export default function FeedbackManager() {
  const [feedbackList, setFeedbackList] = useState([]); // State to hold feedback from Firestore
  const [showModal, setShowModal] = useState(false); // State to show/hide the delete confirmation modal
  const [selectedFeedback, setSelectedFeedback] = useState(null); // State to track the selected feedback for deletion

  // Fetch feedback from Firestore
  useEffect(() => {
    const fetchFeedback = async () => {
      const feedbackCollection = collection(firestore, 'feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackData = feedbackSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort the feedback data by timestamp from newest to oldest
      const sortedFeedback = feedbackData.sort((a, b) => {
        return b.timestamp?.seconds - a.timestamp?.seconds;
      });

      setFeedbackList(sortedFeedback);
    };

    fetchFeedback();
  }, []);

  // Function to handle the deletion of feedback
  const handleDelete = async () => {
    if (selectedFeedback) {
      await deleteDoc(doc(firestore, 'feedback', selectedFeedback.id)); // Delete feedback from Firestore
      setFeedbackList(feedbackList.filter((fb) => fb.id !== selectedFeedback.id)); // Update the local state
      setShowModal(false); // Close the modal
    }
  };

  // Function to open the confirmation modal for deletion
  const confirmDelete = (feedback) => {
    setSelectedFeedback(feedback); // Store the selected feedback to delete
    setShowModal(true); // Show the modal
  };

  return (
    <div className='container'>
      <h1>משוב שהתקבל</h1>
      {feedbackList.length > 0 ? (
        <ul className='list-group'>
          {feedbackList.map((feedback) => (
            <li key={feedback.id} className='list-group-item d-flex justify-content-between align-items-center'>
              <div>
                {feedback.text} <br />
                {feedback.timestamp ? (
                  <small>{new Date(feedback.timestamp.seconds * 1000).toLocaleString()}</small>
                ) : (
                  <small>תאריך לא זמין</small>
                )}
              </div>
              <button className='btn btn-danger' onClick={() => confirmDelete(feedback)}>
                מחק משוב
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין משוב זמין.</p>
      )}

      {/* Modal for delete confirmation */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>אישור מחיקה</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          האם אתה בטוח שאתה רוצה למחוק את המשוב?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            לא
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            כן
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
