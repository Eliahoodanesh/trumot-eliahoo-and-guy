import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const db = getFirestore(); // קבלת הפניה למסד הנתונים
      const reportsCollection = collection(db, 'reports'); // פניה לאוסף 'reports'
      const reportSnapshot = await getDocs(reportsCollection); // שליפת המסמכים
      const reportList = reportSnapshot.docs.map(doc => ({
        id: doc.id, // שמירת ה-ID של הדיווח
        ...doc.data()
      }));
      setReports(reportList); // עדכון ה-state
    };

    fetchReports();
  }, []);

  const handleDelete = async (reportId) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'reports', reportId)); // מחיקת המסמך מ-Firebase
    setReports(reports.filter(report => report.id !== reportId)); // עדכון הרשימה
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">דיווחים</h1>
      {reports.length > 0 ? (
        <ul className="list-group">
          {reports.map((report, index) => (
            <li key={index} className="list-group-item report-item mb-3 p-4 shadow-sm d-flex justify-content-between align-items-center">
              <div>
                <p><strong>פריט:</strong> {report.itemName}</p>
                <p><strong>תורם:</strong> {report.donatingUser}</p>
                <p><strong>מיקום איסוף:</strong> {report.city}</p>
                <p><strong>טלפון:</strong> {report.phoneNum}</p>
                <p><strong>תיאור פריט:</strong> {report.itemDesc}</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(report.id)}>מחק</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">אין דיווחים זמינים.</p>
      )}
    </div>
  );
}