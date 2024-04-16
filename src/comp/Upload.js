import React, { useState } from 'react';
import '../App.css'; // Import your CSS file

export default function Upload() {
  const [imagePreview, setImagePreview] = useState(null);

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
                <input type='text' className='form-control' placeholder='אזור בארץ' />
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className='text-center'>
        <button type='button' class="btn btn-primary">העלה פריט</button>
        </div>
      </div>
    </div>
  );
}
