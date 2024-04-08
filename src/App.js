import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MyForm from './comp/MyForm';
import Login from './comp/Login';
import Register from './comp/Register';
import './App.css';
import photo_trumot from './img/photo_trumot.jpg';
import About from './comp/About';

function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <img src={photo_trumot} className='App-img'></img>
      </header>
      <MyForm/>
      </Router>
    </div>
  );
}

export default App;
