import React from 'react';
import ItemDisplay from './ItemDisplay';
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
