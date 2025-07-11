import React,{ useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import LoadingAnim from '../Components/LoadingAnim';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';


const Profile = () => {
  const [userData, setUserData] = useState("");
  const [price, setPrice] = useState(0);
  const [itemName, setItemName] = useState("");
  const categoryRef = useRef();
  const navigate = useNavigate();
  
  const user = async()=>{
    try {
      const res = await axios.get("/routes/profile")
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    user();
  },[])

  const addProduct = async(e)=>{
    e.preventDefault();
    const category = categoryRef.current.value;
    try {
      const res = await axios.post('/routes/addProduct', {
        name: itemName,
        price,
        category
      },{withCredentials: true});
      alert(res.data.message);
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <LoadingAnim/>
    <Navbar/>
    <div className='h-max min-h-screen w-full bg-slate-900 text-white p-4'>
      <div className='flex flex-col justify-start items-start h-full w-full'>
        <div className='text-3xl font-boldonse p-3 flex gap-3'>
          <div className='h-10 w-10 rounded-[50%] bg-red-400 '></div>
          <div>{userData.username}</div>
        </div>
        <form className='m-2 flex flex-col gap-2 w-1/3 h-1/2 p-3 bg-slate-500 rounded-lg' onSubmit={addProduct} method='post'>
          <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md ' autoComplete='off' type="text" value={itemName} name='itemName' placeholder='Product Name' onChange={(e)=>{setItemName(e.target.value)}}/>
          <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md ' autoComplete='off' type="number" value={price} name='price' placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}} />
          <div className='flex w-full justify-between'>
            <label htmlFor="Category">Category: </label>
            <select ref={categoryRef} className='outline-none' name="category" id="category">
              <option className='text-black' value="Electronics">Electronics</option>
              <option className='text-black' value="Stationary">Stationary</option>
              <option className='text-black' value="Notes">Notes</option>
              <option className='text-black' value="Food">Food</option>
            </select>
          </div>
          <button className=' bg-slate-900 font-medium font-poppins text-xl px-2 py-3 rounded-md' type='submit'>Add Product</button>
        </form>
        <div className='h-max w-full flex justify-start flex-wrap gap-2 items-center '>
          {!userData ? (
            <p>Loading...</p>
          ) : !userData.products || userData.products.length === 0 ? (
            <h1>You haven't added any products yet</h1>
          ) : (
            userData.products.map((product) => (
              <Cards
                key={product._id}
                id={product._id}
                productName={product.name}
                price={product.price}
                category={product.category}
                img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            ))
          )}
      </div>
      </div>
    </div>
    </>
  )
}

export default Profile
