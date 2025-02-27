import React, { useContext, useState } from "react";
import { userContext } from "../context/UserContext";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import {toast} from "react-fox-toast";

export default function Register() {
  const [state, setState] = useState("Sign Up");

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const {setLoggedIn}=useContext( userContext );

  const navigate=useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();

    if(state==='Sign Up'){
      try {
        const {data}=await axios.post("http://localhost:3000/users/register",{name,email,password})

        // console.log(data);

        if(data.success){
          toast.success(data.message,{
            position: 'top-center'
          });
          navigate('/dashboard');
          setLoggedIn(true);
        }
        else{
          toast.error(data.message);
        }

        
       

      } catch (error) {
        console.log(error.message);
        
      }
    }else{
      try {
        const {data}=await axios.post("http://localhost:3000/users/login",{email,password})

        

        if(data.success){
          toast.success(data.message,{
            position: 'top-center'
          });
          setLoggedIn(true);
          navigate('/dashboard');
          
        }else{
        toast.error(data.message,{
           position: 'top-center'
        });
        }
        
        
        
      } catch (error) {
        console.log(error.message);
        
      }
    }

 
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {state === "Sign Up" ? (
          <>
            {" "}
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Register
            </h2>{" "}
            <p className="text-center text-gray-600 mt-2">
              Create an account to get started.
            </p>{" "}
          </>
        ) : (
          <>
            {" "}
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Login
            </h2>{" "}
            <p className="text-center text-gray-600 mt-2">
              Login to your account
            </p>{" "}
          </>
        )}

        <form className="mt-6" onSubmit={handleSubmit} >
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          {state === "Sign Up" ? (
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          ) : (
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </form>

        {state === "Sign Up" ? (
          <p className="mt-4 text-center text-gray-600">
            Already have an account?
            <a
              className="text-blue-600 font-semibold hover:cursor-pointer"
              onClick={() => setState("login")}
            >
              {" "}
              Login
            </a>
          </p>
        ) : (
          <p className="mt-4 text-center text-gray-600">
            Don't have an Account!
            <a
              className="text-blue-600 font-semibold hover:cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              {" "}
              Register
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
