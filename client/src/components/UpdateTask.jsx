import React, { useEffect, useState } from 'react'
import { toast } from 'react-fox-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../context/UserContext';

export default function UpdateTask() {

    const navigate=useNavigate();

     const {setLoggedIn}=useContext( userContext );
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [priority,setPriority]=useState('');
    
    const [dueDate,setdueDate]=useState('');

    async function fetchSpecificTask(){

      axios.defaults.withCredentials=true;

        try {
           
          const {data}=await axios.get(`http://localhost:3000/tasks/${id}`)
           console.log(data);

        if(data.success){
          const value=data.task;
          setTitle(value.title);
          setDescription(value.description);
          setPriority(value.priority);
          setdueDate(value.dueDate.split('T')[0]);

          setLoggedIn(true);
        }else{
          navigate('/register');
        }

           
        } catch (error) {
            console.log(error.message);
            
        }
    }

    async function handleUpdate(e) {

        e.preventDefault()
        try {
            const {data}=await axios.put(`http://localhost:3000/tasks/${id}`,{title,description,priority,dueDate})

            if(data.success){
                toast.success(data.message,{
                    position:'top-center'
                })
            }else{
                toast.error(data.message,{
                    position:'top-center'
                })
            }
                navigate('/dashboard');
            
        } catch (error) {
            console.log(error.message);
            
        }
    }


    useEffect(()=>{
        fetchSpecificTask()
    },[])

    // console.log(title);
    // console.log(description);
    // console.log(priority);
    // console.log(dueDate);
    


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form 
      onSubmit={(e)=>handleUpdate(e)}
      className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-5"
    >
      <h2 className="text-3xl font-bold text-gray-900 text-center">Update Task</h2>

      {/* Title Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          
        value={title}
          required
          onChange={(e)=>{setTitle(e.target.value)}}  
         
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          value={description}
          required
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        value={priority}
        onChange={(e)=>setPriority(e.target.value)}
        >
          <option value="High" className="text-red-600">High</option>
          <option value="Medium" className="text-yellow-500">Medium</option>
          <option value="Low" className="text-green-600">Low</option>
        </select>
      </div>

      {/* Due Date Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input 
          type="date" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          value={dueDate}
          onChange={(e)=>setdueDate(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Update Task
      </button>

      {/* Cancel Button */}
      <button 
        type="button"
        className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        onClick={() => navigate("/dashboard")}
      >
        Cancel
      </button>
    </form>
  </div>

  )
}
