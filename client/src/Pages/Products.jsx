import React, { useState, useEffect } from 'react'
import Cards from '../Components/Cards.jsx'
import LoadingAnim from '../Components/LoadingAnim.jsx'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async()=>{
    const res = await axios.get('/routes/products');
    setProducts(res.data);
  }

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <>
    <LoadingAnim/>
    <div className='h-max min-h-screen w-full py-5 px-3 bg-zinc-900 text-white flex justify-center items-start flex-wrap gap-4'>
      {(!products)?(
        <h1>Loading Products...</h1>
      ): products.length===0 ? (
        <h1>No product available</h1>
      ): (
        products.map((product)=>(
          <Cards
            key={product._id}
            id={product._id}
            productName={product.name}
            price={product.price}
            category={product.category}
            img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=873&auto=format&fit=crop"
          />
        ))
      )}
    </div>
    </>
  )
}

export default Products
