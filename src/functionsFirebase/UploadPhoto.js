import React, { useEffect, useState } from 'react'
import { imageDb } from '../config/Firebase'
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import {v4} from "uuid";

export default function UploadPhoto() {
    const[img,setImg] = useState('');
    const[imgUrl,setImgUrl] = useState([])

    const handleClick = () => {
        const imgRef = ref(imageDb,`uploadsImage/${v4()}`)
        uploadBytes(imgRef,img)
    }

    useEffect(()=>{
        listAll(ref(imageDb,"uploadsImage").then(imgs=>{
            console.log(imgs)
            imgs.items.foreach(val=>{
                getDownloadURL(val).then(url=>{
                    setImgUrl(data=>[...data,url])
                })
            })
        }))
    },[])

    console.log(imgUrl,"imgUrl");
  return (
    <div>
      <input type='file' onChange={(e)=>setImg(e.target.file[0])}/>
      <button onClick={handleClick}>Upload</button>
    </div>
  )
}
