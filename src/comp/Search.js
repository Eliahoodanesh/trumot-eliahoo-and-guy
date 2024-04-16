import React from 'react';
import { Link } from 'react-router-dom';

export default function Search() {
  return (
    <div className="d-flex justify-content-center"> {/* Center the form horizontally */}
      <form className="d-flex flex-grow-1">
        <input className="form-control me-2 flex-grow-1" type="search" placeholder="מה תרצה לחפש?" aria-label="Search" />
        <Link to="query"><button className="btn btn-primary" type="submit">חפש</button></Link>
      </form>
    </div>
  );
}
