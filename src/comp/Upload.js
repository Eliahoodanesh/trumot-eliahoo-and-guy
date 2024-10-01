import React, { useState, useEffect } from 'react';
import '../App.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, imageDb } from '../config/Firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Upload() {
  // State variables to manage image previews, selected files, and form inputs
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cities, setCities] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemNote, setItemNote] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [phoneApproved, setPhoneApproved] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorPhoneNumber, setDonorPhoneNumber] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const auth = getAuth(); // Initialize Firebase Auth

  // API URL for fetching city data
  const apiUrl =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1272';

  // Fetch cities on component mount
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Map the city records to an array of objects with id and name
        const cityRecords = data.result.records.map(record => ({
          id: record._id,
          name: record['שם_ישוב'],
        }));
        setCities(cityRecords); // Update state with city records
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchCities(); // Call the fetchCities function
  }, []);

  // Handle file input change
  const handleFileChange = event => {
    const files = event.target.files;
    setSelectedFiles(files); // Store selected files in state
    const newImagePreviews = [];

    // Generate image previews for selected files
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        if (newImagePreviews.length === files.length) {
          setImagePreviews([...imagePreviews, ...newImagePreviews]); // Update previews state
        }
      };
      reader.readAsDataURL(file); // Read file as data URL for preview
    });
  };

  // Handle upload of selected files and item data
  const handleUpload = async () => {
    try {
      // Validate required fields before proceeding
      if (!itemName || !itemDescription || !donorName || (!donorPhoneNumber && !donorEmail)) {
        alert('Please fill in all required fields: Item Name, Description, Donor Name, and either Phone or Email.');
        return;
      }

      const user = auth.currentUser; // Get the current authenticated user
      if (!user) {
        alert('You need to be logged in to upload items.');
        return;
      }

      const batch = writeBatch(firestore); // Start a Firestore batch write
      const uploadedUrls = [];

      // Loop through selected files and upload each to Firebase Storage
      for (const file of selectedFiles) {
        try {
          console.log('Uploading file:', file.name);
          const imgRef = ref(imageDb, `uploadsImage/${uuidv4()}`); // Create a reference with a unique ID
          const snapshot = await uploadBytes(imgRef, file); // Upload the file
          const url = await getDownloadURL(snapshot.ref); // Get the download URL
          uploadedUrls.push(url); // Store the URL
          console.log('File uploaded:', url);
        } catch (uploadError) {
          console.error('Error uploading file:', file.name, uploadError);
          throw new Error('File upload failed'); // Handle upload errors
        }
      }

      // Set phone number status based on user approval
      const phoneStatus = phoneApproved ? 'Your phone number' : 'מספר לא לפרסום';

      // Create item data to be stored in Firestore
      const itemData = {
        userId: user.uid, // Store the user's UID
        itemName: itemName,
        itemDescription: itemDescription,
        itemNote: itemNote,
        city: selectedCity,
        imageUrls: uploadedUrls,
        phoneStatus: phoneStatus,
        donorName: donorName,
        donorPhoneNumber: phoneApproved ? donorPhoneNumber : 'מספר לא לפרסום',
        donorEmail: donorEmail,
        createdAt: serverTimestamp(), // Timestamp for item creation
      };

      const itemsCollection = collection(firestore, 'items');
      const newItemRef = doc(itemsCollection); // Create a new document reference
      batch.set(newItemRef, itemData); // Add item data to batch

      await batch.commit(); // Commit the batch write to Firestore
      setUploadedUrls(uploadedUrls); // Update state with uploaded URLs
      alert('All files uploaded successfully!'); // Success message
    } catch (error) {
      console.error('Error during Firestore write operation:', error);
      alert('Failed to write item data. Please try again.'); // Error handling
    }
  };

  // Handle city selection change
  const handleCityChange = event => {
    setSelectedCity(event.target.value);
  };

  // Handle phone number visibility approval
  const handlePhoneApproval = event => {
    setPhoneApproved(event.target.checked);
  };

  return (
    <div className='container-fluid'>
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
                style={{ display: 'none' }} // Hide the file input
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
                  onChange={e => setItemName(e.target.value)} // Update item name state
                />
              </div>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='תיאור'
                  value={itemDescription}
                  onChange={e => setItemDescription(e.target.value)} // Update item description state
                />
              </div>
              <div className='col-md-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='הערות'
                  value={itemNote}
                  onChange={e => setItemNote(e.target.value)} // Update item note state
                />
              </div>
              <div className='col-md-4'>
                <select
                  className='form-control'
                  value={selectedCity}
                  onChange={handleCityChange} // Update selected city state
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
                onChange={e => setDonorName(e.target.value)} // Update donor name state
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
                onChange={handlePhoneApproval} // Handle phone approval checkbox change
              />
            </div>
            {phoneApproved && (
              <div className='form-group'>
                אנא הכנס מספרים בלבד
                <input
                  type='tel'
                  className='form-control'
                  id='donorPhoneNumber'
                  placeholder='טלפון'
                  value={donorPhoneNumber}
                  onChange={e => setDonorPhoneNumber(e.target.value)} // Update donor phone number state
                />
              </div>
            )}
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='donorEmail'
                placeholder='אימייל (לא חובה)'
                value={donorEmail}
                onChange={e => setDonorEmail(e.target.value)} // Update donor email state
              />
            </div>
            <div className='text-center'>
              <button
                type='button'
                className='btn btn-success'
                onClick={handleUpload} // Trigger upload on button click
              >
                העלה פריט
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
