import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import About from './comp/About';
import Header from './comp/Header';
import Homepage from './comp/Homepage';
import Contact from './comp/Contact';
import Register from './comp/Register';
import Login from './comp/Login';
import MyForm from './comp/MyForm';
import Upload from './comp/Upload';


function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/Upload' element={<Upload/>}/>
          <Route path='/Contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyForm/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
