import './bootstrap.min.css'
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Add from './components/Add'
import Edit from './components/Edit'
import React from 'react';
import Detail from './components/Detail'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import Register from './components/Register'

import Profile from './components/Profile'

function App() {


  return (
    <>
    
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/reg" element={<Register />} />

      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/detail/:id" element={<Detail/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/profile" element={<Profile />} />


      
      




    </Routes>
    <ToastContainer />
      
    </>
  )
}

export default App