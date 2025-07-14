import React, {useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnim from '../Components/LoadingAnim';

const Item = () => {
    const [product, setProduct] = useState(null);
    const {id} = useParams();
    const fetchProduct = async()=>{
        try {
           const res =  await axios.get(`/routes/product/${id}`);
           setProduct(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const addWishlist = async()=>{
        const res = await axios.post(`/routes/addWishlist/${id}`);
        alert(res.data.message);
    }

    useEffect(()=>{
        fetchProduct();
    },[])
    
  return (
    <>
    <LoadingAnim/>
    <div className='h-screen w-full bg-slate-900 text-white p-5 '>
      <div className='h-9/10 w-full flex justify-between items-center px-5 py-4 rounded-xl bg-slate-800'>
        <div className='w-1/3 h-9/10 bg-neutral-600 rounded-lg'>
            <img className='object-cover h-full w-full rounded-lg' 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                
            />
        </div>
        <div className='w-2/3 h-9/10 flex flex-col justify-between items-start px-10 py-5'>
            
                {(!product) ? (
                    <h1>Oops Error</h1>
                ):(
                    <div>
                        <h1 className='font-boldonse text-3xl font-bold mb-5'>{product.name}</h1>
                        <h3 className='font-barlow text-xl font-medium mb-5'>Owned By: <span className='underline text-2xl'>{product.user.name}</span></h3>
                        <h1 className='font-boldonse text-2xl font-medium mb-5'>$ {product.price}</h1>
                    </div>
                )}
                <button onClick={()=>{console.log(product.user.name)}} className='bg-neutral-700 text-white font-poppins font-medium text-2xl px-3 py-2 rounded-xl'>Chat Owner</button>
                <div className='w-full flex justify-between border-t-5 border-zinc-400'>
                    <button className='text-5xl font-bold'>💬</button>
                    <button onClick={addWishlist} className='text-5xl font-bold'>♥️</button>
                </div>
                
        </div>
      </div>
    </div>
    </>
  )
}

export default Item
