import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // וודא שאתה מייבא נכון את db מהקובץ firebase.js

const EditUser = async(id, updateTitle) => {
    const ref = doc(db, "users", id);
    await updateDoc(ref, {
      title: updateTitle
    });
}

export default EditUser;
