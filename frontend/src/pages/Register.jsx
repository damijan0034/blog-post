import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"
import { URL } from '../url.js'

const Register = () => {
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[error,setError]=useState(false)

  const navigate=useNavigate()

  const handleRegister=async()=>{
    try {
     const res= await axios.post(`${URL}/api/auth/register`,{username,email,password})
     console.log(res.data)
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
     navigate("/login")
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  

  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
        <div className="flex flex-col justify-center items-start w-[80%]
        space-y-4 md:w-[25%]">
            <h1 className="text-xl font-bold text-left">Register your account</h1>
            <input onChange={(e)=>setUsername(e.target.value)}
             className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
            <input onChange={(e)=>setEmail(e.target.value)}
             className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
         <input  onChange={(e)=>setPassword(e.target.value)}
         className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
         {error && <h3 className='text-red-500'>Something went wrong</h3> }
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p> 
            <p className="text-gray-500 hover:text-black">
                <Link to="/login">Login</Link>
            </p>
         
        
         </div>
        </div>
    </div>
  )
}

export default Register