import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-10 w-full px-8 md:px-[300px]  bg-black
    flex justify-between py-8 text-sm md:text-md
    '>
       <div className='flex flex-col text-white'>
        <p>Featured Blogs</p>
        <p>Most viewed</p>
        <p>Readers choice</p>
       </div>
       <div className='flex flex-col text-white'>
        <p>Forum</p>
        <p>Reports</p>
        <p>Recent Posts</p>
       </div>
       <div className="flex flex-col text-white">
         <p>Privacy Policy</p>
         <p>About Us</p>
         <p>Terms & Conditions</p>
         <p>Terms of Service</p>
       </div>
      
        </div>
         <p className="py-2 pb-6 text-center text-white bg-black text-sm">All rights reserved @Blog Market 2023</p>
         </>
  )
}

export default Footer