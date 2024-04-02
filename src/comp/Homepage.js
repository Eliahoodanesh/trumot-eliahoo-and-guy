import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">הבית שלי</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">אודות</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/upload">העלאת פריט</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">צור קשר</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="חיפוש" aria-label="חיפוש"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">חפש</button>
            </form>
          </div>
        </div>
      </nav>
      <div className='container'>
        <h1>ברוכים הבאים להבית שלי!</h1>
        <p>תוכן העמוד הבית</p>
      </div>
      <footer className="footer">
        <div className="container">
          <span className="text-muted">יצירת קשר: כתובת, טלפון, דוא"ל</span>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
