import React from 'react'
import {assets} from "../assets/assets"
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate=useNavigate();

  return (
    <header className="text-center py-20 px-4">
    <h2 className="text-4xl font-bold text-gray-800">Stay Organized & Boost Productivity</h2>
    <p className="text-lg text-gray-600 mt-4">Manage your tasks efficiently with priorities and deadlines.</p>
    <a  className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:cursor-pointer" onClick={()=>navigate('/register')}>Get Started</a>
    </header>
      
  )
}
