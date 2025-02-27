import React from 'react'
import { assets } from '../assets/assets.js';
import { userContext } from "../context/UserContext";
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-fox-toast';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {  
  const navigate=useNavigate();

   const {loggedIn,setLoggedIn}=useContext(userContext)

   async function handleLogout() {
    axios.defaults.withCredentials=true;

    try {
      const { data }=await axios.post("http://localhost:3000/users/logout")

      if(data.success){
        toast.success(data.message,{
          position:'top-center'
        })
        navigate('/');
        setLoggedIn(false);
      }else{
        toast.success(data.message,{
          position:'top-center'
        })
      }
    } catch(error) {
      console.log(error.message);
       }
   }

    return (

  
      <nav className="bg-slate-900 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Task Manager</h1>

        
        {!loggedIn ?         <div className="hidden md:flex space-x-6 text-white">

          <a  className=" hover:text-blue-600 transition">About</a>
          <a  className=" hover:text-blue-600 transition">Contact</a>
        </div> : <button  className="px-4 py-2 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition" onClick={handleLogout}>Logout</button> }




      </div>
    </nav>
    );
      
      
    
  }
  