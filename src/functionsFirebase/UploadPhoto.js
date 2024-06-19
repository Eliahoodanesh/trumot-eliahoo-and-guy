import React, { useEffect, useState } from 'react';
import { imageDb } from '../config/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export default function UploadPhoto() {
  const [img, setImg] = useState(null); // Updated to handle file
  const [imgUrl, setImgUrl] = useState([]);

  const handleClick = () => {
    if (!img) return; // Check if an image is selected
    const imgRef = ref(imageDb, `uploadsImage/${uuidv4()}`);
    uploadBytes(imgRef, img).then(() => {
      getDownloadURL(imgRef).then((url) => {
        setImgUrl((prevUrls) => [...prevUrls, url]);
      });
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  };

  useEffect(() => {
    listAll(ref(imageDb, "uploadsImage")).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }).catch((error) => {
      console.error('Error listing files:', error);
    });
  }, []);

  return (
    <div>
      <input type='file' onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
      {imgUrl.map((url, index) => (
        <img key={index} src={url} alt={`uploaded ${index}`} />
      ))}
    </div>
  );
}
