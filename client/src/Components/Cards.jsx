import React from 'react'

const Cards = ({img,productName, price, category}) => {
  return (
    <div className='shadow-lg shadow-zinc-500/40 h-[20rem] w-[15rem] p-2 bg-neutral-300 rounded-md flex flex-col justify-start items-center text-black hover:scale-105 ease-in-out duration-200'>
      <div className='w-full h-2/3 bg-slate-700 rounded-md'>
        <img src={`${img}`} alt={`${productName} image`} className='object-cover w-full h-full rounded-md' />
      </div>
      <div className='w-full h-1/3 p-2'>
        <h1 className='text-xl font-medium'>{productName}</h1>
        <div className='flex w-full justify-between'>
          <h3 className='font-medium'>${price}</h3>
          <h3 className='font-light text-sm'>{category}</h3>
        </div>
        <div className='flex justify-between border-t-1 border-zinc-600'>
          <button className='text-xl font-bold'>🛒</button>
          <button className='text-xl font-bold'>♥️</button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Cards
