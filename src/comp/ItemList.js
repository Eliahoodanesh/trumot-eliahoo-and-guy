import React, { useEffect, useState } from 'react';
import { firestore, collection, getDocs } from '../config/Firebase'; // Import Firestore functions
import ItemDisplay from './ItemDisplay'; // Import the ItemDisplay component for rendering individual items
import '../App.css';

export default function ItemList() {
  const [items, setItems] = useState([]); // State to store fetched items
  const [users, setUsers] = useState({}); // State to store users data

  useEffect(() => {
    // Function to fetch both items and users from Firestore
    const fetchItemsAndUsers = async () => {
      try {
        const itemsCollectionRef = collection(firestore, 'items'); // Reference to 'items' collection
        const usersCollectionRef = collection(firestore, 'users'); // Reference to 'users' collection

        const itemsSnapshot = await getDocs(itemsCollectionRef); // Fetch all documents from 'items'
        const usersSnapshot = await getDocs(usersCollectionRef); // Fetch all documents from 'users'

        const itemsData = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() // Spread document data into the item object
        }));

        // Convert user documents into a map with user IDs as keys
        const usersData = {};
        usersSnapshot.forEach(doc => {
          usersData[doc.id] = doc.data();
        });

        setItems(itemsData); // Set the fetched items data to state
        setUsers(usersData); // Set the fetched users data to state
      } catch (error) {
        console.error('Error fetching items and users:', error); // Handle errors
      }
    };

    fetchItemsAndUsers(); // Call the async function to fetch data
  }, []);

  // Function to handle email button click, opens user's default email app
  const handleEmailUser = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='row'>
          {/* Map over the fetched items and render each one using the ItemDisplay component */}
          {items.map(item => (
            <div className='col-md-4 mb-4' key={item.id}>
              <ItemDisplay
                imageUrl={item.imageUrl} // URL of the item's image
                donatingUser={item.donorName} // Name of the donating user
                city={item.city} // City of the item
                phoneNum={item.donorPhoneNumber} // Phone number of the donor
                itemDesc={item.itemDescription} // Description of the item
                itemNote={item.itemNote} // Additional notes about the item
                itemName={item.itemName} // Name of the item
                onEmailUser={handleEmailUser} // Function to handle email user action
                donorEmail={item.donorEmail} // Donor's email address
                imageUrls={item.imageUrls} // Array of image URLs for the item
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
