import React,{ useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import LoadingAnim from '../Components/LoadingAnim';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import Dialog from '../Components/Dialogue';

const Profile = () => {
  const [userData, setUserData] = useState("");
  const [price, setPrice] = useState(0);
  const [itemName, setItemName] = useState("");
  // const [edit,setEdit] = useState(false);
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

  const handleDelete= async()=>{
    try {
      const res = await axios.get(`routes/delete/${userData._id}`);
      alert(res.data.message);
      navigate('/');
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async()=>{
    try {
      const res = await axios.get('routes/logout');
      alert(res.data.message);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <LoadingAnim/>
    <div className='h-max min-h-screen w-full bg-slate-900 text-white'>
      <div className='h-max w-full flex flex-col gap-2 justify-center items-center'>
        <div className='h-[30vh] w-full bg-slate-800 rounded-b-2xl relative mb-3'></div>
        <div className='h-[8vw] w-[8vw] rounded-full bg-rose-400 absolute top-[25vh] left-[45.5vw]'></div>
        <div className='text-2xl font-boldonse'>{userData.username}</div>
        <div className='flex w-full justify-between items-center px-4'>
          {/* details */}
          <div className='flex flex-col w-1/2 p-3 h-[60vh] justify-between rounded-xl bg-slate-800'> 
            <h1 className='text-xl font-poppins font-medium'>Your Details</h1>
            <div className='text-xl'>
              <h1>Username: {userData.username}</h1>
              <h1>Name: {userData.name}</h1>
              <h1>Email: {userData.email}</h1>
            </div>
            <div className='w-full flex justify-between'>
              <button onClick={logout} className= "text-2xl px-3 rounded-md font-barlow bg-blue-600 text-white">Logout</button>
              <button  className= "text-2xl px-3 rounded-md font-barlow bg-green-600 text-white">Edit</button>
              <Dialog text="Delete" messageTitle="Delete the account?" message="Do you really want to delete your account" function1={handleDelete} />
            </div>
          </div>
          <div className='flex flex-col w-1/3 p-3 h-[60vh] '>
            <form className='m-2 flex flex-col gap-2 justify-between w-full p-3 h-9/10 bg-slate-500 rounded-lg' onSubmit={addProduct} method='post'>
              <h1 className='text-2xl font-poppins font-bold px-2'>Add Your Products</h1>
              <input className='w-full outline-none bg-slate-700 py-3 px-2 rounded-md ' autoComplete='off' type="text" value={itemName} name='itemName' placeholder='Product Name' onChange={(e)=>{setItemName(e.target.value)}}/>
              <input className='w-full outline-none bg-slate-700 py-3 px-2 rounded-md ' autoComplete='off' type="number" value={price} name='price' placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}} />
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
          </form></div>
          
        </div>
        <h1 className='text-2xl font-poppins font-bold'>Your Products</h1>
        <div className='h-max min-h-[50vh] w-full flex justify-start flex-wrap gap-2 items-center px-5 py-2 bg-slate-800 rounded-xl'>
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
                isOwn= "true"
                img="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            ))
          )}
        </div>

      </div>
      <div className='flex flex-col justify-start items-start h-full w-full'>
        
        
        
      </div>
      
    </div>
    </>
  )
}

export default Profile
