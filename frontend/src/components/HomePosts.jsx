import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext.jsx'
import { URL } from '../url.js'

const HomePosts = ({post}) => {
    
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
                <p>{post.username}</p>
                <div className="flex space-x-2">
                    <p>{new Date(post.updatedAt).toString().slice(0,21)}</p>
                    
                </div>
            </div>
            <p className='text-sm md:text-lg'>
                {post.desc}
               </p>
        </div>
    </div>
  )
}

export default HomePosts