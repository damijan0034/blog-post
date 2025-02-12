import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import {FaBars} from "react-icons/fa"
import Menu from './Menu.jsx';
import { UserContext } from '../context/UserContext.jsx';


const Navbar = () => {
    const {user}=useContext(UserContext)
    
   

   const navigate=useNavigate()
   const path=useLocation().pathname
   

    const[menu,setMenu]=useState(false)
    const[prompt,setPrompt]=useState("")

    const showMenu=()=>{
        setMenu(!menu)
    }

    const handleSearch=()=>{
      prompt ? navigate("?search=" + prompt) : navigate("/")
    }
  return (
    <div className='flex items-center justify-between px-6
        md:px-[200px] py-4
    '>
       <h1 className='text-xl font-extrabold'>
            <Link to="/" >Blog Market</Link>
       </h1>
       {
        path==="/" && 
        <div className='flex items-center justify-center space-x-0'>
            <p onClick={handleSearch} className="cursor-pointer"    ><IoSearchOutline  /></p>
            <input onChange={(e)=>setPrompt(e.target.value)}
                className='outline-none px-3'
            placeholder='Search a post' type="text" />
       </div>
       }
       
       <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {
            user ? <h3><Link to="/write">Write Blog</Link></h3> :
            <h1><Link to="/login">Login</Link></h1>
        }
          {user? <div onClick={showMenu}>
        <p className="cursor-pointer relative"><FaBars/></p>
        {menu && <Menu/>}
      </div>:<h3><Link to="/register">Register</Link></h3>}
               
       </div>
       <div onClick={showMenu} className='md:hidden'>
        
          <p className='cursor-pointer relative'><FaBars /></p>  
          {menu && <Menu /> }
       </div>
        </div>
  )
}

export default Navbar