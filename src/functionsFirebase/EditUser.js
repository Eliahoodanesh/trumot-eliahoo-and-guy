import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

const EditUser = async(id, updateTitle) => {
    const ref = doc(db,"users",id)
    await updateDoc(ref, {
      title: updateTitle
    });
}