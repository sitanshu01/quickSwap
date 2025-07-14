import React from 'react';
import Button from './Button';
import useAuth from '../hooks/auth.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  return (
    <div className='w-full h-max py-1 px-3 flex justify-between items-center bg-zinc-800 sticky z-10 top-0 '>
      <div className='h-10 w-10 text-white font-light text-2xl flex-2/3'>
        {/* <img className='fit h-full ' src="" alt="" /> */}
          <div className=''><Button type="normal" size="small" text="Home"/></div>
      </div>
      <div className='flex justify-between flex-1/5 text-white text-2xl font-light mr-5'>
        <div className='w-5'><Button type="normal" size="small" text="Products"/></div>
        <div className='w-5'><Button type="normal" size="small" text="Profile"/></div>
        {isLoggedIn? (
          <div className='w-3' onClick={()=>navigate('/wishlist')}>❤️</div>
        ): (
          <>
          <div className='w-20'><Button type="register" size="small" text="Login"/></div>
          <div className='w-20'><Button type="register" size="small" text="SignUp"/></div>
          </>
        )}
        
      
      </div>
    </div>
  )
}

export default Navbar
