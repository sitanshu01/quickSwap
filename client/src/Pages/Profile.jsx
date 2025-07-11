import React,{ useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import LoadingAnim from '../Components/LoadingAnim';


const Profile = () => {
  const [userData, setUserData] = useState("");
  
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

  return (
    <>
    <LoadingAnim/>
    <Navbar/>
    <div className='h-screen w-full bg-slate-900 text-white'>
      <div className='text-3xl font-boldonse'>{userData.username}</div>
    </div>
    </>
  )
}

export default Profile
