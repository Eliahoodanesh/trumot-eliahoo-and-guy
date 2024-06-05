import { db } from '../config/Firebase'
import { doc, deleteDoc } from 'firebase/firestore'

const DeleteUser = async(id) => {
    const ref = doc(db,"toys",id);
    await deleteDoc(ref);
  }