import { useState, useEffect } from "react";
import { db } from "../Firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";


export const UserCollection = (c) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const ref = collection(db, c);
    
    // Listen for real-time updates
    const unSub = onSnapshot(ref, (snapshot) => {
      let fire_ar = [];
      snapshot.docs.forEach(item => {
        fire_ar.push({ id: item.id, ...item.data() });
      });
      setDocs(fire_ar);
    });

    return () => unSub();
  }, [c]);

  return docs;
};