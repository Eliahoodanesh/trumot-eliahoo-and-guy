import React, { useEffect } from 'react'; // Importing React and useEffect hook
import { userCollection } from '../hooks/UserCollection'; // Importing userCollection hook

export default function UserList() {
  // Destructure the docs property from the userCollection hook, renaming it to users
  const { docs: users } = userCollection("users"); 

  return (
    <div className='container'>
      <ul>
        {/* Map through the users array and render a list item for each user */}
        {users.map(item => {
          return (
            <li key={item.id}>{item.title}</li> // Each list item displays the user's title and has a unique key
          );
        })}
      </ul>
    </div>
  );
}
