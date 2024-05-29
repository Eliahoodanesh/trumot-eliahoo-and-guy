import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import About from './comp/About';
import Header from './comp/Header';
import Homepage from './comp/Homepage';
import Contact from './comp/Contact';
import Register from './comp/Register';
import Login from './comp/Login';
import MyForm from './comp/MyForm';
import Upload from './comp/Upload';
import Query from './comp/Query';
import Footer from './comp/Footer';
import Error from './comp/Error';

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    // List of paths where the Header should be hidden
    const noHeaderPaths = ['/MyForm', '/Login', '/Register'];
    setShowHeader(!noHeaderPaths.includes(location.pathname));
  }, [location]);

  return (
    <div className='container'>
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/About' element={<About />} />
        <Route path='/Upload' element={<Upload />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Query' element={<Query />} />
        <Route path='/MyForm' element={<MyForm />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/*' element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
