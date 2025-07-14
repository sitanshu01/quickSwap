import React, { useState } from 'react'
import LoadingAnim from '../Components/LoadingAnim'
import Button from '../Components/Button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^\d{2}[a-z]{3}\d{3}@nith\.ac\.in$/;
  const submit = async(e)=>{
      e.preventDefault();
      if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
        alert("All fields are required.");
        return;
      }
      //email type validation
      if(!emailPattern.test(email)){
        alert("Enter a valid NITH mail id..");
        return;
      }
      try {
        const res = await axios.post("/routes/register", {
          name,
          username,
          email,
          password
        }, {
          withCredentials: true
        });
        alert(res.data.message);
        navigate('/');
        
      } catch (error) {
        console.error(error);
      }
    }
  return (
    <>
    <LoadingAnim/>
      <div className='h-screen w-full bg-slate-900 text-white flex justify-center items-center p-5 '>
        <div className='bg-slate-800 h-max w-[35vw] p-5 flex flex-col justify-center items-center rounded-lg' >
          <h1 className='text-2xl font-boldonse font-bold m-2'>SignUp</h1>
          <form className='m-2 flex flex-col items-center gap-5 w-full p-3' onSubmit={submit} method='post'>
            <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md' required autoComplete='off' type="text" value={name} name='name' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
            <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md' required autoComplete='off' type="text" value={username} name='username' placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}}/>
            <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md' required autoComplete='off' type="email" value={email} name='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input className='w-full outline-none bg-slate-700 h-10 py-3 px-2 rounded-md' required type="password" value={password} name='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
            <button className='w-1/3 bg-slate-900 font-medium font-poppins text-xl px-2 py-3 rounded-md' type='submit'>SignUp</button>
          </form>
          
          <div className=' text-lg font-medium font-poppins'>Aleady have an account <Button type="normal" size="small" text="Login" /></div>
        </div>
      </div>
    </>
    
  )
}

export default SignUp
