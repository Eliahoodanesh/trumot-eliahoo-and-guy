import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import About from './comp/About';
import Header from './comp/Header';
import Homepage from './comp/Homepage';
import Register from './comp/Register';
import Login from './comp/Login';
import MyForm from './comp/MyForm';


function App() {
  return (
    <div className='container'>
      {/* <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/Homepage' element={<Homepage/>}/>
          <Route path='/About' element={<About/>}/>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyForm/>}></Route>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
