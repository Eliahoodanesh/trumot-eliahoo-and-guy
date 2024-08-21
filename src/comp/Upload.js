import React, { useState, useEffect } from 'react';
import '../App.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, imageDb } from '../config/Firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Upload() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cities, setCities] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [phoneApproved, setPhoneApproved] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhoneNumber, setDonorPhoneNumber] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const auth = getAuth(); // Initialize Firebase Auth

  const apiUrl =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1272';

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cityRecords = data.result.records.map(record => ({
          id: record._id,
          name: record['שם_ישוב'],
        }));
        setCities(cityRecords);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchCities();
  }, []);

  const handleFileChange = event => {
    const files = event.target.files;
    setSelectedFiles(files);
    const newImagePreviews = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews([...imagePreviews, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    try {
      const user = auth.currentUser; // Get the current authenticated user
      if (!user) {
        alert('You need to be logged in to upload items.');
        return;
      }

      const batch = writeBatch(firestore);
      const uploadedUrls = [];

      for (const file of selectedFiles) {
        try {
          console.log('Uploading file:', file.name);
          const imgRef = ref(imageDb, `uploadsImage/${uuidv4()}`);
          const snapshot = await uploadBytes(imgRef, file);
          const url = await getDownloadURL(snapshot.ref);
          uploadedUrls.push(url);
          console.log('File uploaded:', url);
        } catch (uploadError) {
          console.error('Error uploading file:', file.name, uploadError);
          throw new Error('File upload failed');
        }
      }

      const phoneStatus = phoneApproved ? 'Your phone number' : 'מספר לא לפרסום';

      const itemData = {
        userId: user.uid, // Store the user's UID
        itemName: itemName,
        itemDescription: itemDescription,
        city: selectedCity,
        imageUrls: uploadedUrls,
        phoneStatus: phoneStatus,
        donorName: donorName,
        donorPhoneNumber: phoneApproved ? donorPhoneNumber : 'מספר לא לפרסום',
        donorEmail: donorEmail,
        createdAt: serverTimestamp(),
      };

      const itemsCollection = collection(firestore, 'items');
      const newItemRef = doc(itemsCollection);
      batch.set(newItemRef, itemData);

      await batch.commit();
      setUploadedUrls(uploadedUrls);
      alert('All files uploaded successfully!');
    } catch (error) {
      console.error('Error during Firestore write operation:', error);
      alert('Failed to write item data. Please try again.');
    }
  };

  const handleCityChange = event => {
    setSelectedCity(event.target.value);
  };

  const handlePhoneApproval = event => {
    setPhoneApproved(event.target.checked);
  };

  return (
    <div className='container'>
      <div className='text-center'>
        <h1>העלה פריט</h1>
      </div>
      <div className='container-sm'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='upload-container'>
              <input
                id='file-upload'
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor='file-upload' className='btn btn-primary'>
                העלה תמונות
              </label>
              {imagePreviews.length > 0 &&
                imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Uploaded ${index}`}
                    className='uploaded-image'
                  />
                ))}
            </div>
          </div>
          <div className='col-md-9'>
            <div className='row'>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='שם פריט'
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='תיאור'
                  value={itemDescription}
                  onChange={e => setItemDescription(e.target.value)}
                />
              </div>
              <div className='col-md-4'>
                <select
                  className='form-control'
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value='' disabled defaultValue>
                    בחר עיר
                  </option>
                  {cities.map(city => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='donorName'
                placeholder='שם התורם'
                value={donorName}
                onChange={e => setDonorName(e.target.value)}
              />
            </div>
            <div className='form-check'>
              <label
                className='form-check-label'
                htmlFor='phone-approval'
              >
                האם להציג את מספר הטלפון שלך?
              </label>
              <input
                type='checkbox'
                className='form-check-input'
                id='phone-approval'
                checked={phoneApproved}
                onChange={handlePhoneApproval}
              />
            </div>
            {phoneApproved && (
             <div className='form-group'>
              אנא הכנס מספרים בלבד, ללא תווים נוספים.
             <input
               type='tel'
               className='form-control'
               id='donorPhoneNumber'
               placeholder='מספר הטלפון'
               value={donorPhoneNumber}
               maxLength='10' // הגבלת אורך הקלט
               onChange={e => {
                 // מניעת קלט של תווים לא רצויים
                 const inputVal = e.target.value.replace(/[^\d-]/g, '').slice(0, 10);
                 setDonorPhoneNumber(inputVal);
               }}
             />
           </div>
            )}
            {!phoneApproved && (
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='donorEmail'
                  placeholder='כתובת הדוא"ל שלך'
                  value={donorEmail}
                  onChange={e => setDonorEmail(e.target.value)}
                />
              </div>
            )}
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary' onClick={handleUpload}>
                העלה פריט
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
