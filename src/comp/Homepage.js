import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../functionsFirebase/UseAuth'; // Import custom authentication hook
import ItemList from './ItemList'; // Import ItemList component

function HomePage() {

  return (
    <div className='container-fluid'>
      <div className='container content-container'>
        <h2>דף בית</h2> 
        {/* Heading for the homepage */}
        
        <ItemList/> 
        {/* Display list of items */}
      </div>
    </div>
  );
}

export default HomePage;
