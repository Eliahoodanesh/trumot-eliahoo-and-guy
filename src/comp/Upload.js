import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your CSS file


export default function Upload() {
  const [imagePreview, setImagePreview] = useState(null);
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
    const file = event.target.files[0]; // Accessing the file from event.target.files
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
              <input id='file-upload' type='file' accept='image' onChange={handleFileChange} />
              {imagePreview && <img src={imagePreview} alt='Uploaded' className='uploaded-image' />}
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
        <br></br>
        <input type='checkbox' id='approvePhine'></input>
        <label>מאשר שימוש במספר הטלפון שלי</label>
        <br></br>
        <div className='text-center'>
        <button type='button' className="btn btn-primary">העלה פריט</button>
        </div>
      </div>
    </div>
  );
}
