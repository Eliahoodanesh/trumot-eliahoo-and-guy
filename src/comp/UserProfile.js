import React, { useState, useEffect } from 'react';
import { auth, firestore, storage } from '../config/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap is imported

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setFormData(userDoc.data());
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      }
      setLoading(false);
    };

    const fetchLocations = async () => {
      try {
        const response = await fetch(
          'https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1272'
        );
        const data = await response.json();
        const locationRecords = data.result.records.map(record => ({
          id: record._id,
          name: record['שם_ישוב'],
        }));
        setLocations(locationRecords);
      } catch (err) {
        console.error('Error fetching locations:', err);
      }
      setLoadingLocations(false);
    };

    fetchUserData();
    fetchLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      let imageUrl = userData.profileImage;
      if (profileImage) {
        const storageRef = ref(storage, `USERS/${user.uid}/profileImage`);
        await uploadBytes(storageRef, profileImage);
        imageUrl = await getDownloadURL(storageRef);
      }
      const updatedData = { ...formData, profileImage: imageUrl };
      try {
        await updateDoc(doc(firestore, 'users', user.uid), updatedData);
        setUserData(updatedData);
        setIsEditing(false);
      } catch (err) {
        console.error('Error updating user profile:', err);
      }
    }
  };

  if (loading || loadingLocations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-container container-fluid">
      <h1>פרופיל משתמש</h1>
      {userData ? (
        <div className="profile-info">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
              <div className="form-group">
                <label>שם משתמש</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="שם משתמש"
                />
              </div>
              <div className="form-group">
                <label>שם פרטי</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="שם פרטי"
                />
              </div>
              <div className="form-group">
                <label>שם משפחה</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="שם משפחה"
                />
              </div>
              <div className="form-group">
                <label>אימייל</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="אימייל"
                />
              </div>
              <div className="form-group">
                <label>טלפון</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="טלפון"
                />
              </div>
              <div className="form-group">
                <label>מיקום</label>
                <select name="location" onChange={handleChange} value={formData.location} className="form-control">
                  {locations.map(location => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>בחר תמונת פרופיל</label>
                <input type="file" onChange={handleImageChange} className="form-control-file" />
              </div>
              <button type="submit" className="btn btn-primary">שמור שינויים</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary ml-2">ביטול</button>
            </form>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p>שם משתמש: {userData.username}</p>
                <p>שם פרטי: {userData.firstName}</p>
                <p>שם משפחה: {userData.lastName}</p>
                <p>אימייל: {userData.email}</p>
                <p>טלפון: {userData.phoneNumber}</p>
                <p>מיקום: {userData.location}</p>
                <p>
                  תאריך יצירה:{' '}
                  {userData.createdAt
                    ? new Date(userData.createdAt.seconds * 1000).toLocaleString()
                    : 'תאריך לא זמין'}
                </p>
                <button onClick={() => setIsEditing(true)} className="btn btn-warning">ערוך פרופיל</button>
              </div>
              <div>
                {userData.profileImage && (
                  <img src={userData.profileImage} alt="Profile" className="profile-image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>לא נמצא פרופיל משתמש</p>
      )}
    </div>
  );
}
