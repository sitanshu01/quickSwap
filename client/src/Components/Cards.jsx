import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios';


const Cards = ({id,img,productName, price, category, isOwn, isWish}) => {
  const navigate = useNavigate();
  const click= ()=>{
    console.log(id);
    navigate(`/products/${id}`)
  }

  const addWishlist = async()=>{
    try {
      const res =  await axios.post(`/routes/addWishlist/${id}`);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }

  }

  const deleteWish = async()=>{
    try {
      const res = await axios.delete(`/routes/wishlist/${id}`);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  const deleteProduct = async()=>{
    try {
      const res = await axios.delete(`/routes/product/${id}`);
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }
  const chatOwner = async()=>{
    console.log("owner connected successfully");
  }

  return (
    <div  className='shadow-lg shadow-zinc-500/40 h-[20rem] w-[15rem] p-2 bg-neutral-300 rounded-md flex flex-col justify-start items-center text-black hover:scale-105 ease-in-out duration-200'>
      <div onClick={click} className='w-full h-2/3 bg-slate-700 rounded-md'>
        <img src={`${img}`} alt={`${productName} image`} className='object-cover w-full h-full rounded-md' />
      </div>
      <div className='w-full h-1/3 p-2'>
        <NavLink to={`/products/${id}`} className='text-xl font-medium'>{productName}</NavLink>
        <div className='flex w-full justify-between'>
          <h3 className='font-medium'>₹{price}</h3>
          <h3 className='font-light text-sm'>{category}</h3>
        </div>
        <div className='flex justify-between border-t-1 border-zinc-600'>
          <button onClick={(isWish) ? deleteWish :(isOwn)? deleteProduct: chatOwner } className='text-xl font-bold'>{isOwn || isWish? '🗑️': '💬'}</button>
          <button onClick={addWishlist} className={`${isOwn ? 'hidden' : 'block'} text-xl font-bold`}>♥️</button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Cards
