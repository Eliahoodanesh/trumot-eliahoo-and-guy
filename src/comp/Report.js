import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Report() {
  const [reports, setReports] = useState([]); // State for storing reports

  useEffect(() => {
    const fetchReports = async () => {
      const db = getFirestore(); // Get a reference to the Firestore database
      const reportsCollection = collection(db, 'report'); // Reference the 'reports' collection
      const reportSnapshot = await getDocs(reportsCollection); // Fetch the documents
      const reportList = reportSnapshot.docs.map(doc => ({
        id: doc.id, // Store the report ID
        ...doc.data() // Spread the document data
      }));
      setReports(reportList); // Update state with the fetched reports
    };

    fetchReports(); // Call the fetch function
  }, []);

  const handleDelete = async (reportId) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'report', reportId)); // Delete the document from Firestore
    setReports(reports.filter(report => report.id !== reportId)); // Update the report list
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">דיווחים</h1>
      {reports.length > 0 ? (
        <ul className="list-group">
          {reports.map((report) => (
            <li 
              key={report.id} // Use report ID as the key for better uniqueness
              className="list-group-item report-item mb-3 p-4 shadow-sm d-flex justify-content-between align-items-center"
            >
              <div>
                <p><strong>פריט:</strong> {report.itemName}</p>
                <p><strong>תורם:</strong> {report.donatingUser}</p>
                <p><strong>מיקום איסוף:</strong> {report.city}</p>
                <p><strong>טלפון:</strong> {report.phoneNum}</p>
                <p><strong>תיאור פריט:</strong> {report.itemDesc}</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(report.id)}>
                מחק
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">אין דיווחים זמינים.</p> // Message when no reports are available
      )}
    </div>
  );
}
