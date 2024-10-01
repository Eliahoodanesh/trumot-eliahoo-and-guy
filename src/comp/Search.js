import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Search() {
  return (
    <div className="d-flex justify-content-center"> {/* Center the form horizontally */}
      <form className="d-flex flex-grow-1">
        {/* Link to the search query page */}
        <Link className='custom-link' to="query">
          חפש {/* Search text in Hebrew */}
        </Link>
      </form>
    </div>
  );
}
