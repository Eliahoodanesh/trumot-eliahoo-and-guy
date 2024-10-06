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
import Managers from './comp/Managers';
import PersonalArea from './comp/PersonalArea';
import Feedback from './comp/Feedback';
import UserProfile from './comp/UserProfile';

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const noHeaderPaths = ['/MyForm', '/Login', '/Register'].map(path => path.toLowerCase());
    setShowHeader(!noHeaderPaths.includes(location.pathname.toLowerCase()));
  }, [location.pathname]);

  return (
    <div className="wrapper">
      {showHeader && <Header />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Query" element={<Query />} />
          <Route path="/MyForm" element={<MyForm />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Managers" element={<Managers />} />
          <Route path="/PersonalArea" element={<PersonalArea/>}/>
          <Route path="/Feedback" element={<Feedback/>}/>
          <Route path="/*" element={<Error />} />
          <Route path="/Profile" element={<UserProfile/>}/>
        </Routes>
      </div>
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
