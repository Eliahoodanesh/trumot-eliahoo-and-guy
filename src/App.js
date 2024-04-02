import React, { useState } from 'react';
import photo_trumot from './img/photo_trumot.jpg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyForm from './comp/MyForm';
import Login from './comp/Login';
import Register from './comp/Register';
import HomePage from './comp/Homepage';



function App() {
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={photo_trumot} className="App-img" alt="Trump photo" />
       
        <HomePage/>
     
      </header>
    </div>
  );
}

export default App;
