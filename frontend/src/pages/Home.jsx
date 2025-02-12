import React, { useContext, useEffect, useState } from 'react'
import HomePosts from '../components/HomePosts.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { URL } from '../url.js'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import { UserContext } from '../context/UserContext.jsx'

const Home = () => {
  const {search}=useLocation()
  console.log(search)
  const[posts,setPosts]=useState([])
  const[noResult,setNoResult]=useState(false)
  const[loader,setLoader]=useState(false)

  const{user}=useContext(UserContext)
console.log(user)
  const fetchAllPosts=async()=>{
   setLoader(true)
    try {
      const res=await axios.get(`${URL}/api/post${search}`)
      setPosts(res.data)
     if(res.data.length ===0){
       setNoResult(true)
     }else{
      setNoResult(false)
     }
      setLoader(false)
    } catch (error) {
      console.log(error)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchAllPosts()
  },[search])
  return (
    <>
    <Navbar />
    <div className='min-h-[80%] px-8 md:px-[200px]'>
      {
        loader? <div className='h-[40vh] flex justify-center items-center'  ><Loader /></div> :
        !noResult ? (
          posts.map(post=>(
            <>
            <Link to={user ? `/posts/post/${post._id}` : "/login"}>
            <HomePosts key={post._id} post={post} />
            </Link>
            </>
          ))
        ) : 
          <h1 className='text-center text-3xl text-red-500 '>No result</h1>
        
       
      }
        
       
        </div>
    <Footer />    
        </>
  )
}

export default Home