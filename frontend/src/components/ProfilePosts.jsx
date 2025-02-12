import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { URL } from '../url'

const ProfilePosts = ({post}) => {
   const {user}=useContext(UserContext)
    console.log(user)
    

   
    
  return (
    <div className='w-full flex mt-8 space-x-6'>
        {/* LEFT */}
        <div className='w-[35%] h-[200px] flex items-center justify-center'>
            <img src={`${URL}/images/${post.photo} `} alt="photo"
                className='w-full h-full object-cover'
            />
        </div>

        {/* RIGHT */}
        <div className='flex flex-col w-[65%]'>
            <h1 className='text-xl font-bold mb-1
                md:text-2xl md:mb-2
            '>
                {post.title}
            </h1>
            <div className="flex text-sm font-semibold text-gray-400
                items-center justify-between md:mb-2
            ">
                <p>{user.username}</p>
                <div className="flex space-x-2">
                    <p>25.01.25</p>
                    <p>08.04</p>
                </div>
            </div>
            <p className='text-sm md:text-lg'>
                {post.desc}</p>
        </div>
    </div>
  )
}

export default ProfilePosts