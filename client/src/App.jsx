import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import { ToastContainer } from "react-fox-toast"
import AddTask from './components/AddTask'

import UpdateTask from './components/updateTask'


function App() {
  return (
    <>
    <ToastContainer/>
    <BrowserRouter>
      <NavBar/>
      <Routes>
        
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/update/:id' element={<UpdateTask/>}/>
          <Route path='/addTask' element={<AddTask/>}/>
        
      </Routes>
    
    
    </BrowserRouter>
    
    </>
  )
}

export default App
