import React from 'react';
import "../App.css";

export default function Footer() {
  return (
    <footer className="text-center text-lg-start footer">
      <div className='container text-center'>
        כל הזכויות שמורות &copy; לאליהו דאנש ולגיא ברכה
        {/* Copyright notice in Hebrew for Eliyahu Danesh and Guy Bracha */}
        
        <hr />
        פותח בשנת 2024
        {/* Developed in 2024 message in Hebrew */}
      </div>
    </footer>
  );
}
