import React from 'react'

const Error = () => {
  return (
    <div className='h-screen w-full bg-slate-900 text-white flex justify-center items-center'>
      <div>
        <h1 className='text-4xl font-boldonse font-bold'>404</h1>
        <p className='text-xl font-barlow font-medium'>Seems like the you have hit the incorrect router!</p>
      </div>
    </div>
  )
}

export default Error
