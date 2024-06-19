import React, { useEffect, useState } from 'react';
import { firestore, collection, getDocs } from '../config/Firebase';
import ItemDisplay from './ItemDisplay';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchItemsAndUsers = async () => {
      try {
        const itemsCollectionRef = collection(firestore, 'items');
        const usersCollectionRef = collection(firestore, 'users');

        const itemsSnapshot = await getDocs(itemsCollectionRef);
        const usersSnapshot = await getDocs(usersCollectionRef);

        const itemsData = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const usersData = {};
        usersSnapshot.forEach(doc => {
          usersData[doc.id] = doc.data();
        });

        setItems(itemsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching items and users:', error);
      }
    };

    fetchItemsAndUsers();
  }, []);

  const handleEmailUser = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className='container-fluid'>
      <div className='container'>
        <div className='row'>
          {items.map(item => (
            <div className='col-md-4' key={item.id}>
              <ItemDisplay
                imageUrl={item.imageUrls[0]} // Assuming imageUrls is an array and we take the first image
                donatingUser={item.donorName}
                city={item.city}
                phoneNum={item.phoneStatus === 'Your phone number' ? item.donorPhoneNumber : 'מספר לא לפרסום'}
                itemDesc={item.itemDescription}
                itemName={item.itemName}
                onEmailUser={() => handleEmailUser(item.donorEmail)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
