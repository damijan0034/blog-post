import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { URL } from '../url'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'


const Login = () => {
  const[email,setEmail]=useState("")
   const[password,setPassword]=useState("")

   const{setUser}=useContext(UserContext)

   const[error,setError]=useState(false)

   const navigate=useNavigate()

   const handleLogin=async()=>{
    try {
    const res=await axios.post(`${URL}/api/auth/login`,{email,password},{withCredentials:true})
    console.log(res)
    setUser(res.data)
    navigate("/")
    } catch (error) {
      setError(true)
      console.log(error)
    }
   }
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className="flex flex-col justify-center items-start w-[80%]
        space-y-4 md:w-[25%]">
            <h1 className="text-xl font-bold text-left">Login to your account</h1>
            <input onChange={(e)=>setEmail(e.target.value)}
             className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input  onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleLogin} 
          className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
         <div className="flex justify-center items-center space-x-3">
          <p>New Here?</p> 
            <p className="text-gray-500 hover:text-black">
                <Link to="/register">Register</Link>
            </p>
         
        
         </div>
        </div>
    </div>
  )
}

export default Login