import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import MyForm from './comp/MyForm';
import Login from './comp/Login';
import Register from './comp/Register';
import './App.css';
import photo_trumot from './img/photo_trumot.jpg';
import About from './comp/About';
import Header from './comp/Header';
import Homepage from './comp/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
