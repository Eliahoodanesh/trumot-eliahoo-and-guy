import React, { useEffect } from 'react'
import { userCollection } from '../hooks/UserCollection';


export default function UserList() {
  const {docs: users} = UserCollection("users")


  return (
    <div className='container'>
      <ul>
        {users.map(item => {
          return(
            <li key={item.id}>{item.title}</li>
          )
        })}
      </ul>
    </div>
  )
}