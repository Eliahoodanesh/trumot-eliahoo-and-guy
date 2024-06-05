import { db } from '../firebase/FirebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

const DeleteUser = async(id) => {
    const ref = doc(db,"toys",id);
    await deleteDoc(ref);
  }