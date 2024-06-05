import { db } from '../firebase/FirebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const AddUser = async() => {
    const ref = collection(db,'users')
    const data= await addDoc(ref, {
      email: "mr.orange@gmail.com",
      first_name: "mister",
      last_name: "orange",
      location: "kefar saba",
      password: "orange",
      telephone_num: "052-66666666",
      user_Name: "orangeMan"
    })
    console.log(data.id);
  }