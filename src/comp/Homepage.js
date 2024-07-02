import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../functionsFirebase/UseAuth'; // הוספת import
import ItemList from './ItemList';

function HomePage() {

  return (
    <div className='container-fluid'>
        <div className='container content-container'>
        <h2>דף בית</h2>
          <ItemList/>
        </div>
    </div>
  );
}

export default HomePage;
