import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your CSS file

export default function Upload() {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [cities, setCities] = useState([]);

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
                <input type='text' className='form-control' placeholder='שם פריט' />
              </div>
              <div className='col-md-4'>
                <input type='text' className='form-control' placeholder='תיאור' />
              </div>
              <div className='col-md-4'>
                <select className='form-control'>
                  <option value='' disabled selected>בחר אזור בארץ</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
        <input type='checkbox' id='approvePhone' />
        <label htmlFor='approvePhone'>מאשר שימוש במספר הטלפון שלי</label>
        <br />
        <div className='text-center'>
          <button type='button' className='btn btn-primary'>העלה פריט</button>
        </div>
        <br />
      </div>
    </div>
  );
}
