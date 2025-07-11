import React from 'react';
import Button from './Button';

const Navbar = () => {
  return (
    <div className='w-full h-max py-1 px-3 flex justify-between items-center backdrop-blur-xl fixed z-10 top-0'>
      <div className='h-10 w-10 text-white font-light text-2xl flex-2/3'>
        {/* <img className='fit h-full ' src="" alt="" /> */}
          <div className='w-'><Button type="normal" size="small" text="Home"/></div>
      </div>
      <div className='flex justify-between gap-5 flex-1/3 text-white text-2xl font-light mr-5'>
        <div className='w-20'><Button type="normal" size="small" text="Products"/></div>
        <div className='w-20'><Button type="normal" size="small" text="Profile"/></div>
        <div className='w-20'><Button type="register" size="small" text="Login"/></div>
        <div className='w-20'><Button type="register" size="small" text="SignUp"/></div>
        <div className='h-10 w-10 text-white font-light text-2xl'>
        <img className='fit h-full w-full' src="" alt="" />
      </div>
      </div>
    </div>
  )
}

export default Navbar
