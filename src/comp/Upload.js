import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your CSS file
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, imageDb } from '../config/Firebase'; // Import firestore and imageDb from Firebase config
import { v4 as uuidv4 } from 'uuid';

export default function Upload() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [cities, setCities] = useState([]);
  const [itemName, setItemName] = useState(''); // State for item name input
  const [itemDescription, setItemDescription] = useState(''); // State for item description input
  const [selectedCity, setSelectedCity] = useState(''); // State for selected city ID
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [phoneApproved, setPhoneApproved] = useState(false); // State for phone approval

  const apiUrl = "https://data.gov.il/api/3/action/datastore_search?resource_id=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1272";

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const cityRecords = data.result.records.map(record => ({ id: record.id, name: record['שם_ישוב'] }));
        setCities(cityRecords);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    }

    fetchCities();
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files; // Accessing the files from event.target.files
    setSelectedFiles(files); // Store the selected files in state
    const newImagePreviews = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImagePreviews.push(reader.result);
        // Setting state after reading all files
        if (newImagePreviews.length === files.length) {
          setImagePreviews([...imagePreviews, ...newImagePreviews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    try {
      const batch = firestore.batch(); // Initialize a batch write
      const uploadedUrls = [];

      // Upload each file and store data in Firestore
      for (const file of selectedFiles) {
        const imgRef = ref(imageDb, `uploadsImage/${uuidv4()}`);
        await uploadBytes(imgRef, file);
        const url = await getDownloadURL(imgRef);
        uploadedUrls.push(url);
      }

      // Determine phone status based on checkbox
      const phoneStatus = phoneApproved ? 'Your phone number' : 'מספר לא לפרסום';

      // Store item data in Firestore
      const itemData = {
        itemName: itemName,
        itemDescription: itemDescription,
        cityId: selectedCity,
        imageUrls: uploadedUrls,
        phoneStatus: phoneStatus,
        createdAt: firestore.FieldValue.serverTimestamp() // Timestamp of when the item was uploaded
      };

      const itemsCollection = firestore.collection('items');
      const newItemRef = itemsCollection.doc(); // Automatically generate a new document ID
      await batch.set(newItemRef, itemData);

      await batch.commit(); // Commit the batch write to Firestore
      setUploadedUrls(uploadedUrls);
      alert('All files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Failed to upload files. Please try again.');
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handlePhoneApproval = (event) => {
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
                style={{ display: 'none' }} // Hide the default file input
              />
              <label htmlFor='file-upload' className='btn btn-primary'>העלה תמונות</label>
              {imagePreviews.length > 0 && imagePreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`Uploaded ${index}`} className='uploaded-image' />
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
                  onChange={(e) => setItemName(e.target.value)} 
                />
              </div>
              <div className='col-md-4'>
                <input 
                  type='text' 
                  className='form-control' 
                  placeholder='תיאור' 
                  value={itemDescription} 
                  onChange={(e) => setItemDescription(e.target.value)} 
                />
              </div>
              <div className='col-md-4'>
                <select 
                  className='form-control' 
                  value={selectedCity} 
                  onChange={handleCityChange}
                >
                  <option value='' disabled defaultValue>בחר אזור בארץ</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
        <input 
          type='checkbox' 
          id='approvePhone' 
          checked={phoneApproved} 
          onChange={handlePhoneApproval} 
        />
        <label htmlFor='approvePhone'>מאשר שימוש במספר הטלפון שלי</label>
        <br />
        <div className='text-center'>
          <button type='button' className='btn btn-primary' onClick={handleUpload}>העלה פריט</button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
