import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LoadingAnim from '../Components/LoadingAnim';
import Cards from '../Components/Cards';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    const fetchProduct = async()=>{
        const res = await axios.get('/routes/wishlist');
        console.log(res.data.wishlist)
        setWishlist(res.data.wishlist);
    }

    useEffect(()=>{
        fetchProduct();
    },[])

  return (
    <>
    <LoadingAnim/>
    <div className='h-max min-h-screen w-full py-5 px-3 bg-zinc-900 text-white flex justify-center items-start flex-wrap gap-4'>
      {(!wishlist)?(
        <h1>Loading Products...</h1>
      ): wishlist.length===0 ? (
        <h1>No product available</h1>
      ): (
        wishlist.map((product)=>(
          <Cards
            key={product._id}
            id={product._id}
            productName={product.name}
            price={product.price}
            category={product.category}
            isOwn= {true}
            isWish = {true}
            img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=873&auto=format&fit=crop"
          />
        ))
      )}
    </div>
    </>
  )
}

export default Wishlist
